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
      return NextResponse.redirect(`${origin}/auth/verified`)
    }
  }
  return NextResponse.redirect(`${origin}/auth/verified`)
}