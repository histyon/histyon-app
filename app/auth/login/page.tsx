import { login } from '../actions'
import Link from 'next/link'
import { AuthSidebar } from '@/components/auth/AuthSidebar'
import { AlertCircle, CheckCircle2, UserPlus, ArrowRight } from 'lucide-react'
import { ValidatedInput } from '@/components/ui/FormElements'

export default async function LoginPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const error = typeof searchParams.error === 'string' ? searchParams.error : null
  const success = typeof searchParams.success === 'string' ? searchParams.success : null

  return (
    <div className="min-h-screen flex bg-white font-sans text-gray-900">
      <AuthSidebar />

      <div className="w-full lg:w-[55%] flex flex-col items-center justify-center p-8 relative">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Accesso Console</h1>
            <p className="text-gray-500">Inserisci le credenziali istituzionali.</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-3 shadow-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex items-center gap-3 shadow-sm">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <p>{success}</p>
            </div>
          )}

          <form className="space-y-5" noValidate>
            <ValidatedInput 
                name="email" 
                type="email" 
                label="Email" 
                required 
            />
            <ValidatedInput 
                name="password" 
                type="password" 
                label="Password" 
                required 
            />
            
            <button formAction={login} className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg mt-4">
              Accedi
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-4">Non hai le credenziali?</p>
            <Link href="/auth/register" className="group flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-black hover:bg-gray-50 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-white transition-colors">
                        <UserPlus className="w-5 h-5 text-gray-700" />
                    </div>
                    <div className="text-left">
                        <p className="font-bold text-gray-900 text-sm">Richiedi Accesso</p>
                        <p className="text-xs text-gray-500">Profilo medico SSN</p>
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