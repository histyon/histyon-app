import Link from 'next/link'
import { AuthSidebar } from '@/components/auth/AuthSidebar'
import { RegisterForm } from '@/components/auth/RegisterForm' 
import { LogIn, ArrowRight } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Registrati',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex w-full bg-white font-sans text-gray-900">
      
      <AuthSidebar />

      <div className="flex-1 flex flex-col items-center p-6 h-screen overflow-hidden">
        
        <div className="w-full max-w-xl flex flex-col h-full py-6">
            
            <div className="mb-5">
               <h1 className="text-3xl font-bold mb-1">Nuovo Profilo</h1>
               <p className="text-gray-500">Configurazione guidata utente.</p>
            </div>

            <div className="flex-1 mb-4 overflow-hidden flex flex-col">
                 <RegisterForm />
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
                <Link href="/auth/login" className="group flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-black hover:bg-gray-50 transition-all cursor-pointer shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-white transition-colors">
                            <LogIn className="w-5 h-5 text-gray-700" />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-gray-900 text-sm">Possiedi già un account?</p>
                            <p className="text-xs text-gray-500">Accedi alla Console</p>
                        </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                </Link>
            </div>
        </div>
      </div>
    </div>
  )
}