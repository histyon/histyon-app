'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js' 
import { PasswordSchema } from '@/lib/schemas'
import { dictionary } from '@/lib/dictionary' 
import { headers } from 'next/headers'

export type SignupState = {
  status: 'idle' | 'success' | 'error';
  errors?: { [key: string]: string };
  message?: string;
  inputs?: any;
}

export async function login(formData: FormData) {
  const supabase = await createClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  
  const { error } = await supabase.auth.signInWithPassword(data)
  
  if (error) redirect(`/auth/login?error=${encodeURIComponent(dictionary.validation.credentialsInvalid)}`)

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(prevState: SignupState, formData: FormData): Promise<SignupState> {
  const supabase = await createClient()
  const rawData = Object.fromEntries(formData)
  const password = formData.get('password') as string
  const origin = (await headers()).get('origin')


  const passCheck = PasswordSchema.safeParse(password)
  if (!passCheck.success) {
     return { status: 'error', errors: { password: passCheck.error.issues[0].message }, inputs: rawData }
  }

  let fullDob = formData.get('dob') as string;
  
  if (!fullDob || fullDob.length < 10) {
      const day = formData.get('dob_day')
      const month = formData.get('dob_month')
      const year = formData.get('dob_year')
      
      if (!year || !month || !day) {
          return { status: 'error', message: "Data di nascita incompleta.", inputs: rawData }
      }
      fullDob = `${year}-${month}-${day}`
  }

  const phoneFull = formData.get('phone') 
    ? `${formData.get('phonePrefix')} ${formData.get('phone')}`
    : null;

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

const { data: authData, error: authError } = await supabase.auth.signUp({
  email: userData.email,
  password: userData.password,
  options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        first_name: userData.firstName,
        last_name: userData.lastName,
        fiscal_code: userData.fiscalCode,
        medical_license: userData.medicalLicense,
        hospital_name: userData.hospitalName,
        dob: userData.dob,
        place_of_birth: userData.placeOfBirth,
        gender: userData.gender,
        address_street: userData.addressStreet,
        address_civic: userData.addressCivic,
        city: userData.city,
        country: userData.country,
        region: userData.region,
        postal_code: userData.postalCode,
        phone: userData.phone
      }
  }
})

  if (authError) {
    let fieldErrors: any = {}
    if (authError.message.includes('already registered') || authError.status === 422) {
        fieldErrors.email = "Email già registrata." 
    }
    return { status: 'error', message: authError.message, errors: fieldErrors, inputs: rawData }
  }

  if (authData.user) {
    const supabaseAdmin = createSupabaseAdmin(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!, 
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

const { error: profileError } = await supabaseAdmin
  .from('profiles')
  .update({
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
  .eq('id', authData.user.id)
    
    if (profileError) {
        console.error("Errore creazione profilo:", profileError)

        await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
        
        return { status: 'error', message: "Errore dati profilo: " + profileError.message, inputs: rawData }
    }
  }

  await supabase.auth.signOut()

  redirect('/auth/register/success')
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/auth/login')
}

export async function resetPassword(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string
    const origin = (await headers()).get('origin')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/update-password`,
    })

    if (error) {
        redirect(`/auth/forgot-password?error=${encodeURIComponent("Si è verificato un errore.")}`)
    }

    redirect('/auth/forgot-password?success=true')
}

export async function updatePassword(formData: FormData) {
    const supabase = await createClient()
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
        redirect(`/auth/update-password?error=${encodeURIComponent("Le password non coincidono.")}`)
    }

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
        redirect(`/auth/update-password?error=${encodeURIComponent(error.message)}`)
    }

    redirect('/dashboard')
}