import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-gray-100 bg-white py-10 mt-auto">
      {/* Usiamo la classe globale per l'allineamento perfetto */}
      <div className="layout-container flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* LATO SINISTRO: Logo e Copyright */}
        <div className="flex flex-col items-center md:items-start gap-3">
          {/* Scalo leggermente il logo per il footer */}
          <div className="origin-center md:origin-left scale-90">
             <Logo color="black" />
          </div>
          <p className="text-xs text-gray-400 font-medium">
            &copy; {currentYear} Histyon. Tutti i diritti riservati.
          </p>
        </div>

        {/* LATO DESTRO: Navigazione Minimal */}
        <nav className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium text-gray-500">
           
           <Link href="/legal" className="hover:text-black transition-colors">
             Info Legali
           </Link>
           
           <Link href="/documentation" className="hover:text-black transition-colors">
             Documentazione
           </Link>
           
           <Link href="mailto:support@histyon.com" className="hover:text-black transition-colors">
             Contattaci
           </Link>

           {/* Piccolo separatore verticale */}
           <div className="hidden sm:block w-px h-4 bg-gray-200 mx-2"></div>

           <Link href="/auth/login" className="hover:text-black transition-colors">
             Login
           </Link>
           
           <Link href="/auth/register" className="hover:text-black transition-colors">
             Registrati
           </Link>

        </nav>
      </div>
    </footer>
  )
}