import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { getDictionary } from '@/lib/dictionary'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  const dict = await getDictionary()

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      return NextResponse.redirect(`${origin}/auth/login?success=${encodeURIComponent(dict.auth.login.emailConfirmed)}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=${encodeURIComponent(dict.auth.login.linkInvalid)}`)
}