'use server'

import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { LogOut } from 'lucide-react'
import { signout } from '@/lib/actions/auth'

interface HeaderProps {
  variant: 'public' | 'app'
  userProfile?: any 
}

export async function Header({ variant, userProfile }: HeaderProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 w-full">
    <div className="layout-container h-20 flex items-center justify-between">        
        <div className="flex items-center gap-3">
            <Link href={variant === 'app' ? '/dashboard' : '/'} className="hover:opacity-80 transition-opacity flex items-center gap-3">
                <Logo color="black" />
                {variant === 'app' && (
                    <span className="hidden sm:block text-[10px] text-gray-400 font-medium uppercase tracking-widest border-l border-gray-200 pl-3 pt-0.5">
                        Console
                    </span>
                )}
            </Link>
        </div>

        {/* Lato Destro */}
        <div className="flex items-center gap-6">
            {variant === 'app' && userProfile && (
                <>
                    <div className="hidden md:flex items-center gap-3 text-right">
                        <div>
                            <p className="text-sm font-bold text-gray-900">
                                Dr. {userProfile.first_name} {userProfile.last_name}
                            </p>
                            <p className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full inline-block truncate max-w-[200px]">
                                {userProfile.hospital_name || 'Non assegnato'}
                            </p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold border border-gray-200 shadow-sm">
                            {userProfile.first_name?.[0]}{userProfile.last_name?.[0]}
                        </div>
                    </div>
                    
                    <form action={signout}>
                        {/* TASTO ESCI: Stile "hover" attivo di default (bg-red-50) */}
                        <button className="flex items-center gap-2 text-sm font-bold text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 hover:border-red-200 px-4 py-2 rounded-xl transition-all shadow-sm">
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Esci</span>
                        </button>
                    </form>
                </>
            )}

            {variant === 'public' && (
                <div className="flex items-center gap-4">
                    <Link href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                        Accedi
                    </Link>
                    <Link href="/auth/register" className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all">
                        Richiedi accesso
                    </Link>
                </div>
            )}
        </div>
      </div>
    </nav>
  )
}