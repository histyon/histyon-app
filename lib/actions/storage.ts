'use server'

import { createClient } from '@/lib/supabase/server'
import { r2Client } from '@/lib/storage/r2'
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { v4 as uuidv4 } from 'uuid'
import { revalidatePath } from 'next/cache'
import { dictionary } from '@/lib/dictionary'

export async function getPresignedUploadUrl(
  originalName: string, 
  fileType: string, 
  fileSize: number, 
  patientId: string,
  notes: string = '' 
) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: dictionary.validation.unauthorized }

  const ticketId = uuidv4()

  try {
    const fileExt = originalName.split('.').pop()
    const customFileName = `scaninput-${ticketId}.${fileExt}`
    
    const filePath = `${user.id}/${patientId}/${customFileName}`

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

    if (dbError) throw new Error(`${dictionary.validation.dbError}${dbError.message}`)

    const command = new PutObjectCommand({
      Bucket: process.env.R2_INPUT_BUCKET_NAME,
      Key: filePath,
      ContentType: fileType,
      Metadata: { originalName }
    })

    const signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 })

    return { success: true, url: signedUrl, ticketId }

  } catch (error: any) {
    console.error('Upload Error:', error)
    await supabase.from('tickets').update({ status: 'ERROR', ai_metadata: { error: error.message } }).eq('id', ticketId)
    return { error: error.message }
  }
}

export async function confirmUpload(ticketId: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('tickets').update({ status: 'QUEUED' }).eq('id', ticketId)
    if (error) return { error: error.message }
    revalidatePath('/dashboard')
    return { success: true }
}

export async function getPresignedDownloadUrl(filePath: string, bucketType: 'input' | 'output' = 'input') {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: dictionary.validation.unauthorized }

  const bucket = bucketType === 'output' ? process.env.R2_OUTPUT_BUCKET_NAME : process.env.R2_INPUT_BUCKET_NAME 

  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: filePath,
      ResponseContentDisposition: 'attachment',
    })

    const signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 900 }) 

    return { success: true, url: signedUrl }

  } catch (error: any) {
    return { error: dictionary.validation.fileRetrievalError }
  }
}