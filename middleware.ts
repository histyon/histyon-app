import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const LOCALES = ['it', 'en', 'es', 'fr', 'de', 'zh', 'hi', 'ar', 'pt', 'ru']
const DEFAULT_LOCALE = 'it'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  let locale = DEFAULT_LOCALE
  
  const cookieLocale = request.cookies.get('histyon-lang')?.value
  if (cookieLocale && LOCALES.includes(cookieLocale)) {
    locale = cookieLocale
  } else {
    const acceptLang = request.headers.get('accept-language')
    if (acceptLang) {
      const preferred = acceptLang.split(',')[0].substring(0, 2)
      if (LOCALES.includes(preferred)) {
        locale = preferred
      }
    }
  }

  if (request.cookies.get('histyon-lang')?.value !== locale) {
    response.cookies.set('histyon-lang', locale)
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  if (user && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}