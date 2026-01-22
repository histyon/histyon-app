'use server'

import { createClient } from '@/lib/supabase/server'
import { r2Client } from '@/lib/storage/r2'
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { v4 as uuidv4 } from 'uuid'
import { revalidatePath } from 'next/cache'

// questa funzione genera l'url per l'upload e crea il ticket iniziale
export async function getPresignedUploadUrl(
  originalName: string, 
  fileType: string, 
  fileSize: number, 
  patientId: string,
  notes: string = '' 
) {
  const supabase = await createClient()
  
  // se non sei loggato non carichi nulla
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorizzato' }

  // genero l'id subito così lo posso usare sia nel db che nel nome file
  const ticketId = uuidv4()

  try {
    // creo un nome file univoco con la data per evitare sovrascritture
    const date = new Date()
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '')
    const fileExt = originalName.split('.').pop()
    const customFileName = `scan-${ticketId.slice(0, 8)}-${dateStr}.${fileExt}`
    
    // percorso nel bucket: id_dottore/id_paziente/nome_file
    const filePath = `${user.id}/${patientId}/${customFileName}`

    // creo il ticket nel db con stato 'uploading', così intanto esiste
    const { error: dbError } = await supabase
      .from('tickets')
      .insert({
        id: ticketId,
        doctor_id: user.id,
        patient_id: patientId,
        input_file_url: filePath, 
        file_name: customFileName,
        file_size: fileSize,
        status: 'UPLOADING',
        notes: notes 
      })

    if (dbError) throw new Error(`DB Error: ${dbError.message}`)

    // chiedo a cloudflare un url temporaneo per permettere al frontend di caricare il file
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: filePath,
      ContentType: fileType,
      Metadata: { originalName }
    })

    const signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 })

    return { success: true, url: signedUrl, ticketId }

  } catch (error: any) {
    console.error('Upload Error:', error)

    // se qualcosa va storto, segno subito il ticket come fallito nel db
    await supabase
        .from('tickets')
        .update({ 
            status: 'ERROR',
            ai_metadata: { error: error.message || 'Errore di configurazione sistema' }
        })
        .eq('id', ticketId)

    return { error: error.message }
  }
}

// conferma che il file è su r2 e mette il ticket in coda per l'ai
export async function confirmUpload(ticketId: string) {
    const supabase = await createClient()
    
    const { error } = await supabase
        .from('tickets')
        .update({ status: 'QUEUED' })
        .eq('id', ticketId)

    if (error) return { error: error.message }
    
    revalidatePath('/dashboard')
    return { success: true }
}

// genera un url temporaneo per scaricare i file, sia input che output
export async function getPresignedDownloadUrl(filePath: string, bucketType: 'input' | 'output' = 'input') {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorizzato' }

  // scelgo il bucket giusto in base a cosa mi hai chiesto
  const bucket = bucketType === 'output' 
    ? process.env.R2_OUTPUT_BUCKET_NAME 
    : process.env.R2_INPUT_BUCKET_NAME

  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: filePath,
    })

    // l'url scade dopo 15 minuti per sicurezza
    const signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 900 }) 

    return { success: true, url: signedUrl }

  } catch (error: any) {
    console.error('Download URL Error:', error)
    return { error: 'Impossibile recuperare il file' }
  }
}