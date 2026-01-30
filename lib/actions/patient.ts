'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { dictionary } from '@/lib/dictionary'
import { REGEX_VALIDATORS } from '@/lib/constants'

// Note: spostiamo lo schema qui dentro o lo importiamo da lib/schemas.ts
// Per coerenza con gli altri file, se usi PatientSchema di lib/schemas, assicurati che usi il dizionario.
// Se invece è definito localmente come nel file originale:

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
  email: z.string().email(dictionary.validation.emailInvalid),
  phoneNumber: z.string().min(5, dictionary.validation.phoneShort),
})

export async function addPatient(prevState: any, formData: FormData) {
  const supabase = await createClient()
  
  // controllo di sicurezza: chi sta facendo questa richiesta?
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: dictionary.validation.unauthorized }

  // assemblo la data di nascita dai campi separati
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
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
  }

  // valido tutto con zod per essere sicuro che i dati siano ok
  const validated = PatientSchema.safeParse(rawData)
  if (!validated.success) return { error: validated.error.issues[0].message }

  // controllo se ho già questo paziente nel db per evitare duplicati inutili
  const { data: existing } = await supabase
    .from('patients')
    .select('id')
    .eq('doctor_id', user.id)
    .eq('fiscal_code', validated.data.fiscalCode)
    .single()

  if (existing) return { error: dictionary.validation.patientExists }

  // inserisco finalmente il paziente collegandolo al dottore loggato
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

  // ricarico la dashboard così il nuovo paziente appare subito nella lista
  revalidatePath('/dashboard')
  return { success: true }
}