import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { 
  ArrowRight, 
  Files, 
  ShieldAlert, 
  Clock,
  CheckCircle2
} from 'lucide-react'

export default async function LandingPage() {

  return (
    <div className="bg-white text-gray-950 font-sans selection:bg-orange-100 selection:text-orange-900 flex flex-col">
      
      <Header variant="public" />

      <main className="w-full">
        
        <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="flex flex-col gap-8">
               <div className="inline-flex items-center gap-2 self-start px-3 py-1 bg-gray-50 border border-gray-200 rounded-md text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  Nuova versione 2.0
               </div>

               <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-gray-950 leading-[1] tracking-tight">
                 Meno burocrazia, <br/>
                 <span className="text-gray-400">più medicina.</span>
               </h1>

               <p className="text-xl text-gray-600 leading-relaxed font-light max-w-lg">
                 Il gestionale creato per liberare i medici dal lavoro amministrativo. 
                 Agenda, cartelle e fatturazione in un unico flusso continuo.
               </p>

               <div className="flex flex-col sm:flex-row gap-4 mt-4">
                 <Link 
                  href="/auth/register" 
                  className="inline-flex items-center justify-center h-14 px-8 bg-gray-950 text-white rounded-lg font-medium text-lg transition-all hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-900/20"
                >
                  Prova gratuitamente
                </Link>
                
                <Link 
                  href="/documentation" 
                  className="inline-flex items-center justify-center h-14 px-8 bg-white text-gray-950 border border-gray-200 rounded-lg font-medium text-lg hover:bg-gray-50 transition-colors"
                >
                  Come funziona
                </Link>
               </div>

               <div className="flex items-center gap-6 mt-8 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-300" /> Setup istantaneo</span>
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-300" /> Cancellabile in ogni momento</span>
               </div>
            </div>

            <div className="relative hidden lg:flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-tr from-orange-50/50 to-white rounded-full blur-3xl opacity-50"></div>
               <div className="relative w-full aspect-square border border-gray-100 rounded-2xl bg-white shadow-2xl shadow-gray-200/50 p-8 flex flex-col gap-4 rotate-[-2deg] hover:rotate-0 transition-transform duration-700">
                  <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100"></div>
                        <div>
                           <div className="w-32 h-3 bg-gray-900 rounded-sm mb-2"></div>
                           <div className="w-20 h-2 bg-gray-200 rounded-sm"></div>
                        </div>
                     </div>
                     <div className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-md">Paziente Attivo</div>
                  </div>
                  <div className="space-y-3 pt-2">
                     <div className="w-full h-24 bg-gray-50 rounded-lg border border-gray-50"></div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="h-16 bg-gray-50 rounded-lg"></div>
                        <div className="h-16 bg-gray-50 rounded-lg"></div>
                     </div>
                  </div>
                  <div className="absolute -right-6 top-1/2 bg-gray-900 text-white p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce duration-[3000ms]">
                     <CheckCircle2 className="w-5 h-5 text-orange-500" />
                     <span className="text-sm font-bold">Referto salvato</span>
                  </div>
               </div>
            </div>

          </div>
        </section>

        <section className="min-h-screen bg-gray-50 flex items-center py-20 px-6">
          <div className="max-w-7xl mx-auto w-full">
             <div className="mb-20">
                <h2 className="font-serif text-4xl md:text-6xl text-gray-900 mb-6">
                  Il tuo tempo è per i pazienti,<br />non per i file Excel.
                </h2>
                <p className="text-xl text-gray-500 max-w-2xl font-light">
                  La maggior parte dei software medici sono vecchi, lenti e complessi. 
                  Noi abbiamo rimosso il superfluo.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start gap-6 group hover:-translate-y-2 transition-transform duration-500">
                   <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                      <Files className="w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Tutto in un posto</h3>
                      <p className="text-gray-500 leading-relaxed">
                         Basta cercare tra email, whatsapp e cartaceo. Cronologia, esami e note sono nella scheda paziente. Clicchi e trovi.
                      </p>
                   </div>
                </div>

                <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start gap-6 group hover:-translate-y-2 transition-transform duration-500">
                   <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                      <Clock className="w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Velocità d'uso</h3>
                      <p className="text-gray-500 leading-relaxed">
                         Interfaccia disegnata per chi lavora. Scorciatoie da tastiera, caricamenti istantanei, zero tempi di attesa.
                      </p>
                   </div>
                </div>

                <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start gap-6 group hover:-translate-y-2 transition-transform duration-500">
                   <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                      <ShieldAlert className="w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">A prova di legge</h3>
                      <p className="text-gray-500 leading-relaxed">
                         GDPR integrato. Non devi preoccuparti della sicurezza dei dati o dei backup. Ci pensiamo noi, automaticamente.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </section>

        <section className="min-h-[80vh] flex items-center justify-center px-6 bg-white border-t border-gray-100">
           <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-5xl md:text-7xl text-gray-950 mb-8 tracking-tight">
                Modernizza il tuo studio oggi.
              </h2>
              <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-light">
                Unisciti ai medici che hanno scelto di lavorare meglio, non di più.
                Nessuna carta di credito richiesta per iniziare.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <Link 
                  href="/auth/register" 
                  className="inline-flex items-center justify-center h-16 px-10 bg-gray-950 text-white rounded-lg font-medium text-lg hover:bg-orange-600 transition-colors duration-300 shadow-xl"
                >
                  Crea account gratuito
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}