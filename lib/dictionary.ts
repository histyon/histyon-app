import 'server-only'
import { cookies, headers } from 'next/headers'
import { it } from './dictionaries/it'
import { en } from './dictionaries/en'

const dictionaries = {
  it,
  en,
}

export type Locale = keyof typeof dictionaries
export const defaultLocale: Locale = 'it'

// Helper intelligente per capire la lingua
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const langCookie = cookieStore.get('histyon-lang')?.value as Locale

  // 1. Priorità Massima: Se l'utente ha già scelto (c'è il cookie), rispettiamo la sua scelta
  if (langCookie && dictionaries[langCookie]) {
    return langCookie
  }

  // 2. Rilevamento Browser: Se non c'è cookie, guardiamo le impostazioni del browser
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') || ''

  // Se la lingua preferita del browser inizia con 'en' (es. en-US, en-GB), serviamo Inglese
  if (acceptLanguage.toLowerCase().startsWith('en')) {
    return 'en'
  }

  // 3. Fallback: Se il browser è italiano o altra lingua non supportata, diamo il Default (IT)
  return defaultLocale
}

export async function getDictionary() {
  const locale = await getLocale()
  return dictionaries[locale]
}

// Export statico per retro-compatibilità con file non-async (es. schemas.ts)
export const dictionary = it;