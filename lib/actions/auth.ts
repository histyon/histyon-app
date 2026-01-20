'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PasswordSchema } from '@/lib/schemas'

// stabilisce lo stato di una registrazione, iniziale, con successo o errore, in caso di errore, ad esempio, 
// restituisce i dati ricevuti cosi come sono, così che l'utente non debba riscriverli
export type SignupState = {
  status: 'idle' | 'success' | 'error';
  errors?: { [key: string]: string };
  message?: string;
  inputs?: any;
}

// funzione di login
export async function login(formData: FormData) {
  // connessione al db
  const supabase = await createClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  // tenta il sign in con le credenziali ricevute
  const { error } = await supabase.auth.signInWithPassword(data)
  // in caso di errore ti riporta al login con url di errore
  if (error) redirect(`/auth/login?error=${encodeURIComponent('Credenziali non valide')}`)

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

// funzione di registrazione
export async function signup(prevState: SignupState, formData: FormData): Promise<SignupState> {
  // connessione al db
  const supabase = await createClient()
  // prende i dati inseriti nel form
  const rawData = Object.fromEntries(formData)
  const password = formData.get('password') as string

  // controllo se la pass rispetta le regole, senno restituisco errore e i dati inseriti inizialmente
  const passCheck = PasswordSchema.safeParse(password)
  if (!passCheck.success) {
     return { status: 'error', errors: { password: passCheck.error.issues[0].message }, inputs: rawData }
  }

  // ricostruzione data di nascita
  const day = formData.get('dob_day')
  const month = formData.get('dob_month')
  const year = formData.get('dob_year')
  const fullDob = `${year}-${month}-${day}` 
  
  const phoneFull = formData.get('phone') 
    ? `${formData.get('phonePrefix')} ${formData.get('phone')}`
    : null;

  // inserisco nell'oggetto userdata i dati del form per poi passarlo al db
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
    addressStreet: formData.get('addressStreet') as string,
    addressCivic: formData.get('addressCivic') as string,
    city: formData.get('city') as string,
    country: formData.get('country') as string, 
    region: formData.get('region') as string,   
    postalCode: formData.get('postalCode') as string,
    phone: phoneFull
  }

  // tento la registrazione delle credenziali dell'utente
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
  })

  // se restituisce errore, lo mostro (mail già registrata come errore previsto/conosciuto)
  if (authError) {
    let fieldErrors: any = {}
    if (authError.message.includes('already registered') || authError.status === 422) {
        fieldErrors.email = "Questa email è già registrata."
    }
    return { status: 'error', message: authError.message, errors: fieldErrors, inputs: rawData }
  }

  // verificate le condizioni precedenti, inserisco i dati del dottore nel db
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
      address_street: userData.addressStreet,
      address_civic: userData.addressCivic,
      city: userData.city,
      country: userData.country,
      province: userData.region,
      region: userData.region,
      postal_code: userData.postalCode,
      phone_number: userData.phone
    })
    
    // in caso contrario, ritorniamo errore
    if (profileError) {
        return { status: 'error', message: "Errore salvataggio profilo: " + profileError.message, inputs: rawData }
    }
  }

  // logout per reindirizzarti prima alla pagina di success
  await supabase.auth.signOut()

  redirect('/auth/register/success')
}

// funzione di logout
export async function signout() {
  // connessione al db
  const supabase = await createClient()
  // logout
  await supabase.auth.signOut()
  // redirect al login
  revalidatePath('/', 'layout')
  redirect('/auth/login')
}