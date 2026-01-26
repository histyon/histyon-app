import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { LanguageSwitcher } from './LanguageSwitcher'
import { UserDropdown } from './UserDropdown'
import { createClient } from '@/lib/supabase/server'
import { getDictionary } from '@/lib/dictionary'
import { cookies } from 'next/headers'

interface HeaderProps {
  variant?: 'public' | 'dashboard'
  userProfile?: any
}

export async function Header({ variant = 'public', userProfile }: HeaderProps) {
  const supabase = await createClient()
  const dict = await getDictionary()
  const { data: { user } } = await supabase.auth.getUser()
  const cookieStore = await cookies()
  const currentLang = cookieStore.get('histyon-lang')?.value || 'it'

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 w-full transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <Link href={user ? "/dashboard" : "/"} className="hover:opacity-80 transition-opacity flex items-center gap-3">
            <Logo color="black" />
            {variant === 'dashboard' && (
                <span className="hidden sm:block text-[10px] text-gray-400 font-medium uppercase tracking-widest border-l border-gray-200 pl-3 pt-0.5">
                    Console
                </span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-6">
          
          <LanguageSwitcher currentLang={currentLang} />

          <div className="h-5 w-px bg-gray-200 hidden md:block"></div>

          {user ? (
            <UserDropdown user={user} profile={userProfile} dict={dict as any} />
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                href="/auth/login" 
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                {dict.auth.login.btn}
              </Link>
              <Link 
                href="/auth/register" 
                className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 hover:shadow-xl"
              >
                {dict.auth.login.requestAccess}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}