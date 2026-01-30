import 'server-only'
import { cookies, headers } from 'next/headers'
import { it } from './dictionaries/it'
import { en } from './dictionaries/en'
import { es } from './dictionaries/es'
import { fr } from './dictionaries/fr'
import { de } from './dictionaries/de'
import { zh } from './dictionaries/zh'
import { hi } from './dictionaries/hi'
import { ar } from './dictionaries/ar'
import { pt } from './dictionaries/pt'
import { ru } from './dictionaries/ru'

const dictionaries = {
  it,
  en,
  es,
  fr,
  de,
  zh,
  hi,
  ar,
  pt,
  ru
}

export type Dictionary = typeof it;

export type Locale = keyof typeof dictionaries
export const defaultLocale: Locale = 'it'

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const langCookie = cookieStore.get('histyon-lang')?.value as Locale

  if (langCookie && dictionaries[langCookie]) {
    return langCookie
  }

  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') || ''

  const preferredLang = acceptLanguage.split(',')[0].substring(0, 2) as Locale
  if (dictionaries[preferredLang]) {
    return preferredLang
  }

  return defaultLocale
}

export async function getDictionary() {
  const locale = await getLocale()
  return dictionaries[locale]
}

export const dictionary = en;