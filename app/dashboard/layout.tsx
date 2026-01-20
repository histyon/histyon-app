import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { signout } from '@/app/auth/actions'
import { Activity, LogOut, UserCircle } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*') // Prendi tutto per sicurezza
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 h-16 flex items-center justify-between shadow-sm">
        
        <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
           <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-md">
             <Activity className="text-white w-4 h-4" />
           </div>
           <div className="flex flex-col">
             <span className="font-bold text-lg leading-none tracking-tight">Histyon</span>
             <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Console</span>
           </div>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-3 text-right">
            <div>
              <p className="text-sm font-bold text-gray-900">
                Dr. {profile?.first_name} {profile?.last_name}
              </p>
              <p className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full inline-block truncate max-w-[200px]">
                {profile?.hospital_name || 'Struttura non assegnata'}
              </p>
            </div>
            {/* Avatar Placeholder con le iniziali */}
            <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
               {profile?.first_name?.[0]}{profile?.last_name?.[0]}
            </div>
          </div>

          <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

          <form action={signout}>
            <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-all group">
              <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Esci</span>
            </button>
          </form>
        </div>
      </nav>
      
      {children}
    </div>
  )
}