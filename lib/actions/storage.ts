'use server'

import { createClient } from '@/lib/supabase/server'
import { r2Client } from '@/lib/storage/r2'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { v4 as uuidv4 } from 'uuid'
import { revalidatePath } from 'next/cache'

export async function getPresignedUploadUrl(
  originalName: string, 
  fileType: string, 
  fileSize: number, 
  patientId: string,
  notes: string = '' 
) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorizzato' }

  try {
    const ticketId = uuidv4()
    
    // Generazione nome file (YYYYMMDD)
    const date = new Date()
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '')
    const fileExt = originalName.split('.').pop()
    const customFileName = `scan-${ticketId.slice(0, 8)}-${dateStr}.${fileExt}`
    const filePath = `${user.id}/${patientId}/${customFileName}`

    // Inserimento DB (CORRETTO: usa 'notes')
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
        notes: notes // <--- CORRETTO QUI (era description)
      })

    if (dbError) throw new Error(`DB Error: ${dbError.message}`)

    // Generazione URL Cloudflare
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
    return { error: error.message }
  }
}

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