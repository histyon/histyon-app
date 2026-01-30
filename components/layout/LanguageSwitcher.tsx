'use client'

import { useState, useTransition } from 'react'
import { Globe, Check, Loader2 } from 'lucide-react'
import { setLanguage } from '@/lib/actions/language'
import { useRouter } from 'next/navigation'
import { LOCALES } from '@/lib/constants'

interface LanguageSwitcherProps {
  currentLang: string
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSwitch = (code: string) => {
    if (code === currentLang) {
        setIsOpen(false)
        return
    }

    startTransition(async () => {
      await setLanguage(code)
      setIsOpen(false)
      router.refresh()
    })
  }

  const currentFlag = LOCALES.find(l => l.code === currentLang)?.flag

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`
            flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
            ${isOpen ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-600'}
        `}
      >
        {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
            currentFlag ? <span className="text-base leading-none">{currentFlag}</span> : <Globe className="w-4 h-4" />
        )}
        <span className="uppercase">{currentLang}</span>
      </button>

      {isOpen && (
        <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
            
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[300px] overflow-y-auto">
                <div className="text-xs font-bold text-gray-400 px-3 py-2 uppercase tracking-wider border-b border-gray-50 mb-1 sticky top-0 bg-white z-10">
                    Select Language
                </div>
                {LOCALES.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => handleSwitch(lang.code)}
                        className={`
                            w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors
                            ${currentLang === lang.code ? 'bg-gray-50 font-bold text-black' : 'hover:bg-gray-50 text-gray-600'}
                        `}
                    >
                        <span className="flex items-center gap-3">
                            <span className="text-xl leading-none">{lang.flag}</span>
                            {lang.name}
                        </span>
                        {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-black" />}
                    </button>
                ))}
            </div>
        </>
      )}
    </div>
  )
}