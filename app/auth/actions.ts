'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const PasswordSchema = z.string()
  .min(8, "La password deve essere di almeno 8 caratteri")
  .regex(/[A-Z]/, "Deve contenere almeno una lettera Maiuscola")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Deve contenere almeno un carattere speciale");

// Definiamo il tipo di stato che ritorna l'azione
export type SignupState = {
  status: 'idle' | 'success' | 'error';
  errors?: { [key: string]: string }; // Mappa errori campo -> messaggio
  message?: string; // Errore generico
  inputs?: any; // Dati inseriti per ripopolare il form
}

// Modifichiamo la firma per accettare prevState (richiesto da useFormState)
export async function signup(prevState: SignupState, formData: FormData): Promise<SignupState> {
  const supabase = await createClient()

  // Raccogliamo i dati grezzi subito per poterli restituire in caso di errore
  const rawData = Object.fromEntries(formData)
  const password = formData.get('password') as string

  // 1. Validazione Password
  const passCheck = PasswordSchema.safeParse(password)
  if (!passCheck.success) {
     return {
       status: 'error',
       errors: { password: passCheck.error.issues[0].message },
       inputs: rawData // Restituiamo i dati così il form non si svuota
     }
  }

  // Costruzione Data
  const day = formData.get('dob_day')
  const month = formData.get('dob_month')
  const year = formData.get('dob_year')
  const fullDob = `${year}-${month}-${day}` 

  const userData = {
    email: formData.get('email') as string,
    password: password,
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    fiscalCode: (formData.get('fiscalCode') as string).toUpperCase(),
    medicalLicense: formData.get('medicalLicense') as string,
    hospitalName: formData.get('hospitalName') as string,
    dob: fullDob, 
    placeOfBirth: formData.get('placeOfBirth') as string,
    gender: formData.get('gender') as string,
    address: formData.get('address') as string,
    city: formData.get('city') as string,
    country: formData.get('country') as string, 
    region: formData.get('region') as string,   
    postalCode: formData.get('postalCode') as string,
  }

  // 2. Signup Supabase
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
  })

  if (authError) {
    // Mappiamo l'errore comune "User already registered" sul campo email
    let fieldErrors: any = {}
    if (authError.message.includes('already registered') || authError.status === 422) {
        fieldErrors.email = "Questa email è già registrata."
    }

    return {
        status: 'error',
        message: authError.message,
        errors: fieldErrors,
        inputs: rawData
    }
  }

  // 3. Creazione Profilo
  if (authData.user) {
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      email: userData.email,
      first_name: userData.firstName,
      last_name: userData.lastName,
      fiscal_code: userData.fiscalCode,
      hospital_name: userData.hospitalName,
      medical_license_number: userData.medicalLicense,
      date_of_birth: userData.dob,
      place_of_birth: userData.placeOfBirth,
      gender: userData.gender,
      address: userData.address,
      city: userData.city,
      country: userData.country,
      province: userData.region,
      region: userData.region,
      postal_code: userData.postalCode
    })
    
    if (profileError) {
        // Se fallisce il profilo, non possiamo lasciare l'utente a metà.
        // In produzione dovresti cancellare l'utente auth, qui diamo errore.
        return {
            status: 'error',
            message: "Errore salvataggio profilo: " + profileError.message,
            inputs: rawData
        }
    }
  }

  // Se tutto ok, redirect.
  // NON returniamo state qui perché il redirect interrompe l'esecuzione.
  redirect('/auth/register/success')
}