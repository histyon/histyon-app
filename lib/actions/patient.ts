'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const PatientSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  fiscalCode: z.string().length(16),
  dob: z.string(),
  gender: z.enum(['M', 'F', 'OTHER']),
  country: z.string().optional(),
  placeOfBirth: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  postalCode: z.string().optional(),
  // NUOVI CAMPI OBBLIGATORI
  email: z.string().email("Email non valida"),
  phoneNumber: z.string().min(5, "Numero troppo corto"),
})

export async function addPatient(prevState: any, formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorizzato' }

  // COSTRUZIONE DATA
  const day = formData.get('dob_day')
  const month = formData.get('dob_month')
  const year = formData.get('dob_year')
  const fullDob = `${year}-${month}-${day}`

  const rawData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    fiscalCode: (formData.get('fiscalCode') as string).toUpperCase(),
    dob: fullDob,
    gender: formData.get('gender'),
    country: formData.get('country'),
    placeOfBirth: formData.get('placeOfBirth'),
    address: formData.get('address'),
    city: formData.get('city'),
    province: formData.get('province'),
    postalCode: formData.get('postalCode'),
    // NUOVI
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
  }

  const validated = PatientSchema.safeParse(rawData)
  if (!validated.success) return { error: validated.error.issues[0].message }

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
    place_of_birth: validated.data.placeOfBirth,
    address: validated.data.address,
    city: validated.data.city,
    region: validated.data.province,
    postal_code: validated.data.postalCode,
    email: validated.data.email,
    phone_number: validated.data.phoneNumber
  })

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true }
}