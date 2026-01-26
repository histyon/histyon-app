'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { dictionary } from '@/lib/dictionary'

export default function RegisterSuccessPage() {
  const router = useRouter()
  const t = dictionary.auth.register.success;
  const loginSuccessMsg = dictionary.auth.login.successRedirect;

  useEffect(() => {
    // mostra la pagina per 3 secondi, poi ti porta alla pagina di login
    const timer = setTimeout(() => {
      router.push(`/auth/login?success=${encodeURIComponent(loginSuccessMsg)}`)
    }, 3000)
    return () => clearTimeout(timer)
  }, [router, loginSuccessMsg])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
      <p className="text-gray-500 max-w-md mb-8">
        {t.desc}
      </p>
      
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Loader2 className="w-4 h-4 animate-spin" />
        {t.redirect}
      </div>
    </div>
  )
}