'use server'

import { cookies } from 'next/headers'

export async function setLanguage(lang: string) {
  const cookieStore = await cookies()
  
  cookieStore.set('histyon-lang', lang, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })
}