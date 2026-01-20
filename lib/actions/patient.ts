'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { PatientSchema } from '@/lib/schemas'

// funzione di aggiunta pazienti al db
export async function addPatient(prevState: any, formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Sessione scaduta. Ricarica la pagina.' }

  const day = formData.get('dob_day')
  const month = formData.get('dob_month')
  const year = formData.get('dob_year')
  const fullDob = `${year}-${month}-${day}`
  
  const phoneFull = formData.get('phone') 
    ? `${formData.get('phonePrefix')} ${formData.get('phone')}`
    : null;

  const rawData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    fiscalCode: (formData.get('fiscalCode') as string).toUpperCase(),
    email: formData.get('email'),
    dob: fullDob,
    gender: formData.get('gender'),
    country: formData.get('country'),
    placeOfBirth: formData.get('placeOfBirth'),
    addressStreet: formData.get('addressStreet'),
    addressCivic: formData.get('addressCivic'),
    city: formData.get('city'),
    province: formData.get('region'), 
    postalCode: formData.get('postalCode'),
    phone: phoneFull
  }

  // uso lo schema importato
  const validated = PatientSchema.safeParse(rawData)
  if (!validated.success) return { error: 'Dati incompleti o formato errato.' }

  const { data: existing } = await supabase
    .from('patients')
    .select('id')
    .eq('doctor_id', user.id)
    .eq('fiscal_code', validated.data.fiscalCode)
    .single()

  if (existing) return { error: 'Paziente già presente in archivio.' }

  try {
      const { error } = await supabase.from('patients').insert({
        doctor_id: user.id,
        first_name: validated.data.firstName,
        last_name: validated.data.lastName,
        fiscal_code: validated.data.fiscalCode,
        email: validated.data.email || null,
        date_of_birth: validated.data.dob,
        gender: validated.data.gender,
        country: validated.data.country,
        place_of_birth: validated.data.placeOfBirth, 
        address_street: validated.data.addressStreet,
        address_civic: validated.data.addressCivic,
        city: validated.data.city,
        province: validated.data.province,
        region: validated.data.province,
        postal_code: validated.data.postalCode,
        phone_number: validated.data.phone
      })

      if (error) {
        console.error("Errore DB:", error)
        if (error.code === '23503') return { error: 'Errore Critico: Profilo Dottore non trovato. Contatta assistenza.' }
        return { error: error.message }
      }

      revalidatePath('/dashboard')
      return { success: true }
      
  } catch (e) {
      return { error: 'Errore di connessione al database.' }
  }
}