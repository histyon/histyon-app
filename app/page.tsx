import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { 
  ArrowRight, 
  Database, 
  Activity, 
  ShieldCheck, 
  Zap,
  BarChart3,
  Users,
  Layers
} from 'lucide-react'

export default async function LandingPage() {

  return (
    <div className="bg-white text-gray-950 font-sans selection:bg-orange-100 selection:text-orange-900 flex flex-col min-h-screen">
      
      <Header variant="public" />

      <main className="flex-1 flex flex-col">
        
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="layout-container relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-[11px] font-bold tracking-widest text-orange-700 uppercase mb-8">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                Histyon Platform v2.0
              </div>

              <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-gray-950 mb-8 leading-[0.95]">
                Gestione clinica <br />
                <span className="text-gray-300">senza compromessi.</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mb-10 leading-relaxed text-balance font-medium">
                La piattaforma operativa per strutture sanitarie che unisce automazione dei flussi, sicurezza dei dati e analisi predittiva in un'unica interfaccia.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Link 
                  href="/auth/register" 
                  className="inline-flex items-center justify-center h-14 px-8 bg-gray-950 text-white rounded-lg font-medium text-lg transition-transform hover:-translate-y-0.5 shadow-xl shadow-gray-200"
                >
                  Inizia ora
                </Link>
                
                <Link 
                  href="/documentation" 
                  className="inline-flex items-center justify-center h-14 px-8 bg-white text-gray-950 border border-gray-200 rounded-lg font-medium text-lg hover:bg-gray-50 transition-colors"
                >
                  Documentazione
                </Link>
              </div>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50/50 via-white to-white opacity-60"></div>
        </section>

        <section className="py-24 border-t border-gray-100 bg-gray-50/50">
          <div className="layout-container">
            <div className="mb-16 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
                Costruito per la scala.
              </h2>
              <p className="text-gray-500 text-lg">
                Ogni strumento necessario per gestire la tua struttura, ottimizzato per velocità e precisione.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
              
              <div className="md:col-span-2 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group">
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 mb-6 border border-orange-100">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Centralizzazione dei Dati</h3>
                  <p className="text-gray-500 max-w-md">Accesso immediato a cartelle cliniche, storico pazienti e reportistica. Tutto sincronizzato in tempo reale.</p>
                </div>
                <div className="mt-8 relative h-48 -mr-8 -mb-8 bg-gray-50 rounded-tl-2xl border-t border-l border-gray-100 overflow-hidden">
                   <div className="absolute top-6 left-6 right-0 bottom-0 bg-white rounded-tl-xl border border-gray-100 shadow-sm p-4">
                      <div className="flex gap-2 mb-4">
                        <div className="w-20 h-2 bg-gray-100 rounded-full"></div>
                        <div className="w-8 h-2 bg-orange-100 rounded-full"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="w-full h-8 bg-gray-50 rounded border border-gray-100"></div>
                        <div className="w-full h-8 bg-gray-50 rounded border border-gray-100"></div>
                        <div className="w-full h-8 bg-gray-50 rounded border border-gray-100"></div>
                      </div>
                   </div>
                </div>
              </div>

              <div className="md:col-span-1 md:row-span-2 bg-gray-950 text-white rounded-2xl p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white mb-6 border border-white/10">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Analisi Predittiva</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    I nostri algoritmi monitorano costantemente i parametri vitali per identificare anomalie prima che diventino critiche.
                  </p>
                </div>

                <div className="mt-12 relative">
                   <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-2">
                      <span>MONITORING</span>
                      <span className="text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> ACTIVE</span>
                   </div>
                   <div className="h-32 w-full bg-gradient-to-t from-orange-500/20 to-transparent rounded border border-white/10 flex items-end p-2 gap-1">
                      {[40, 60, 45, 70, 50, 80, 65, 55, 75, 90, 60, 85].map((h, i) => (
                        <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-white/20 hover:bg-orange-500 transition-colors rounded-sm"></div>
                      ))}
                   </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-900 mb-6 border border-gray-200">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Compliance GDPR</h3>
                <p className="text-gray-500 text-sm">Crittografia end-to-end e log di accesso immutabili per la massima sicurezza legale.</p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-900 mb-6 border border-gray-200">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Workflow Rapidi</h3>
                <p className="text-gray-500 text-sm">Automazione delle attività ripetitive per permettere al personale di concentrarsi sulla cura.</p>
              </div>

            </div>
          </div>
        </section>

        <section className="py-24 bg-white border-t border-gray-100">
          <div className="layout-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-gray-950 mb-2 tracking-tighter">99.9%</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Uptime</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-gray-950 mb-2 tracking-tighter">&lt;0.2s</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Latenza</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-gray-950 mb-2 tracking-tighter">10k+</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Pazienti</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-gray-950 mb-2 tracking-tighter">ISO</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Certificato</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
           <div className="layout-container flex flex-col items-start">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-950 mb-8 max-w-3xl">
                Pronto a modernizzare la tua struttura?
              </h2>
              <div className="flex gap-4">
                <Link 
                  href="/auth/register" 
                  className="group inline-flex items-center justify-center gap-2 h-14 px-8 bg-orange-600 text-white rounded-lg font-medium text-lg hover:bg-orange-700 transition-colors"
                >
                  Crea account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}