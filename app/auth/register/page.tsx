import Link from 'next/link'
import { AuthSidebar } from '@/components/auth/AuthSidebar'
import { RegisterForm } from '@/components/auth/RegisterForm' // Ora funzionerà!
import { LogIn, ArrowRight } from 'lucide-react'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex bg-white font-sans text-gray-900">
      <AuthSidebar />

      <div className="w-full lg:w-[55%] flex flex-col items-center p-8 lg:p-12 overflow-y-auto h-screen">
        <div className="w-full max-w-xl">
            <div className="mb-8 mt-4">
               <h1 className="text-3xl font-bold mb-2">Nuovo Profilo</h1>
               <p className="text-gray-500">Compila la scheda anagrafica completa.</p>
            </div>

            {/* Inseriamo qui il componente Form che abbiamo appena creato */}
            <RegisterForm />

            <div className="mt-6 pt-10 border-t border-gray-100 pb-10">
                <Link href="/auth/login" className="group flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-black hover:bg-gray-50 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-white transition-colors">
                            <LogIn className="w-5 h-5 text-gray-700" />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-gray-900 text-sm">Accedi alla Console</p>
                            <p className="text-xs text-gray-500">Credenziali esistenti</p>
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