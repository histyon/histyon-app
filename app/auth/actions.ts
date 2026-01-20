'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

// --- SCHEMA VALIDAZIONE PASSWORD ---
const PasswordSchema = z.string()
  .min(8, "La password deve essere di almeno 8 caratteri")
  .regex(/[A-Z]/, "Deve contenere almeno una lettera Maiuscola")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Deve contenere almeno un carattere speciale");

// --- TIPO DI STATO PER LA REGISTRAZIONE ---
export type SignupState = {
  status: 'idle' | 'success' | 'error';
  errors?: { [key: string]: string };
  message?: string;
  inputs?: any;
}

export async function login(formData: FormData) {
  // ... (codice login invariato) ...
  const supabase = await createClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) redirect(`/auth/login?error=${encodeURIComponent('Credenziali non valide')}`)

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(prevState: SignupState, formData: FormData): Promise<SignupState> {
  const supabase = await createClient()

  // ... (Tutta la parte di validazione e raccolta dati rawData, userData ecc. RESTA UGUALE) ...
  const rawData = Object.fromEntries(formData)
  const password = formData.get('password') as string
  
  const passCheck = PasswordSchema.safeParse(password)
  if (!passCheck.success) {
     return { status: 'error', errors: { password: passCheck.error.issues[0].message }, inputs: rawData }
  }

  // Ricostruzione data...
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

  // 1. Signup
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
  })

  if (authError) {
    let fieldErrors: any = {}
    if (authError.message.includes('already registered') || authError.status === 422) {
        fieldErrors.email = "Questa email è già registrata."
    }
    return { status: 'error', message: authError.message, errors: fieldErrors, inputs: rawData }
  }

  // 2. Profilo
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
        // Se il profilo fallisce, proviamo a cancellare l'utente auth (cleanup) o ritorniamo errore
        return { status: 'error', message: "Errore salvataggio profilo: " + profileError.message, inputs: rawData }
    }
  }

  // --- FIX IMPORTANTE: LOGOUT IMMEDIATO ---
  // Siccome "Confirm Email" è disabilitato, Supabase ti logga subito.
  // Noi invece vogliamo che l'utente vada alla pagina di successo (pubblica) e poi faccia il login manuale.
  // Quindi forziamo il logout qui, così il middleware non ti spara in dashboard.
  await supabase.auth.signOut()

  redirect('/auth/register/success')
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/auth/login')
}