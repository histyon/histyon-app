import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { getDictionary } from '@/lib/dictionary'

export async function Footer() {
  const dict = await getDictionary()
  const currentYear = new Date().getFullYear()
  const t = dict.landing.footer;

  return (
    <footer className="w-full border-t border-gray-100 bg-white pt-16 pb-8 mt-auto">
      <div className="layout-container flex flex-col md:flex-row justify-between items-start gap-12">
        
        <div className="flex flex-col items-start gap-6 max-w-sm">
          <div className="origin-left scale-90">
             <Logo color="black" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500 font-medium">
              &copy; {currentYear} Histyon Inc. {t.copyright}
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Web Design & Development: <a href="mailto:paratoilario@icloud.com" className="hover:text-orange-600 transition-colors border-b border-gray-200 hover:border-orange-200 pb-0.5">Ilario Parato</a>, Leonardo Muschietti
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-gray-600">
           <Link href="/legal" className="hover:text-black transition-colors">
             {t.legal}
           </Link>
           <Link href="/documentation" className="hover:text-black transition-colors">
             {t.docs}
           </Link>
           <Link href="mailto:support@histyon.com" className="hover:text-black transition-colors">
             {t.contact}
           </Link>
           <Link href="/auth/login" className="hover:text-black transition-colors">
             {t.login}
           </Link>
        </nav>
      </div>
    </footer>
  )
}