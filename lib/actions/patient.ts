'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const PatientSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  fiscalCode: z.string().length(16),
  dob: z.string(), // Si aspetta YYYY-MM-DD
  gender: z.enum(['M', 'F', 'OTHER']),
  country: z.string().optional(),
  placeOfBirth: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  postalCode: z.string().optional(),
})

export async function addPatient(prevState: any, formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorizzato' }

  // COSTRUZIONE DATA MANUALE DAI 3 INPUT
  const day = formData.get('dob_day')
  const month = formData.get('dob_month')
  const year = formData.get('dob_year')
  const fullDob = `${year}-${month}-${day}` // Formato ISO per Database

  const rawData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    fiscalCode: (formData.get('fiscalCode') as string).toUpperCase(),
    dob: fullDob,
    gender: formData.get('gender'),
    country: formData.get('country'),
    placeOfBirth: formData.get('placeOfBirth'), // Città nascita
    address: formData.get('address'),
    city: formData.get('city'), // Città residenza
    province: formData.get('province'),
    postalCode: formData.get('postalCode'),
  }

  const validated = PatientSchema.safeParse(rawData)
  if (!validated.success) return { error: 'Dati incompleti. Controlla i campi obbligatori.' }

  // Check duplicati
  const { data: existing } = await supabase
    .from('patients')
    .select('id')
    .eq('doctor_id', user.id)
    .eq('fiscal_code', validated.data.fiscalCode)
    .single()

  if (existing) return { error: 'Paziente già presente in archivio.' }

  const { error } = await supabase.from('patients').insert({
    doctor_id: user.id,
    first_name: validated.data.firstName,
    last_name: validated.data.lastName,
    fiscal_code: validated.data.fiscalCode,
    date_of_birth: validated.data.dob,
    gender: validated.data.gender,
    country: validated.data.country,
    place_of_birth: validated.data.placeOfBirth, // Usa il nuovo campo 'place_of_birth' su DB? Assicurati esista
    // Se non esiste 'place_of_birth' ma solo 'city', mappa correttamente.
    // Assumo che nel DB schema abbiamo aggiunto 'region', 'city', 'country' e rimosso nationality.
    address: validated.data.address,
    city: validated.data.city,
    region: validated.data.province, // Mappiamo provincia su region o crea campo province
    // Nota: Se nel DB hai 'region', usalo per la provincia o rinominalo
  })

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true }
}