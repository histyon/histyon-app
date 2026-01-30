import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { getDictionary } from '@/lib/dictionary'

export async function Footer() {
  const dict = await getDictionary()
  const currentYear = new Date().getFullYear()
  const t = dict.landing.footer;

  return (
    <footer className="w-full border-t border-gray-100 bg-white py-10 mt-auto">
      <div className="layout-container flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="origin-center md:origin-left scale-90">
             <Logo color="black" />
          </div>
          <p className="text-xs text-gray-400 font-medium">
            &copy; {currentYear} {t.copyright}
          </p>
        </div>

        <nav className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium text-gray-500">
           
           <Link href="/legal" className="hover:text-black transition-colors">
             {t.legal}
           </Link>
           
           <Link href="/documentation" className="hover:text-black transition-colors">
             {t.docs}
           </Link>
           
           <Link href="mailto:support@histyon.com" className="hover:text-black transition-colors">
             {t.contact}
           </Link>

           <div className="hidden sm:block w-px h-4 bg-gray-200 mx-2"></div>

           <Link href="/auth/login" className="hover:text-black transition-colors">
             {t.login}
           </Link>
           
           <Link href="/auth/register" className="hover:text-black transition-colors">
             {t.register}
           </Link>

        </nav>
      </div>
    </footer>
  )
}