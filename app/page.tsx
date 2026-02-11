import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { 
  ArrowRight, 
  Database, 
  Activity, 
  ShieldCheck, 
  Zap,
  MoveRight
} from 'lucide-react'

export default async function LandingPage() {

  return (
    <div className="bg-white text-gray-950 font-sans selection:bg-orange-100 selection:text-orange-900 flex flex-col min-h-screen">
      
      <Header variant="public" />

      <main className="flex-1 flex flex-col">
        
        {/* HERO SECTION - EDITORIAL STYLE */}
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6">
          <div className="max-w-7xl mx-auto border-l border-gray-950/10 pl-6 md:pl-12">
            
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-gray-950 mb-10 leading-[0.9] tracking-tight">
              Clinical <br/>
              Intelligence.
            </h1>

            <div className="flex flex-col md:flex-row gap-12 md:items-end justify-between max-w-5xl">
              <p className="text-lg md:text-xl text-gray-600 max-w-md leading-relaxed font-light">
                Un sistema operativo per la sanità moderna. 
                Progettato per rimuovere il rumore di fondo e lasciare spazio solo alla cura del paziente.
              </p>

              <div className="flex gap-6">
                 <Link 
                  href="/auth/register" 
                  className="group flex items-center gap-3 text-base font-medium text-gray-950 hover:text-orange-700 transition-colors"
                >
                  <span className="border-b border-gray-950 group-hover:border-orange-700 pb-0.5">Inizia ora</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <Link 
                  href="/documentation" 
                  className="text-base font-medium text-gray-400 hover:text-gray-950 transition-colors"
                >
                  Documentazione
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES - WIREFRAME AESTHETIC */}
        <section className="py-24 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-gray-100 border border-gray-100">
              
              {/* Feature 1: Main */}
              <div className="md:col-span-8 bg-white p-8 md:p-12 min-h-[400px] flex flex-col justify-between group hover:bg-gray-50/50 transition-colors">
                 <div className="flex justify-between items-start">
                    <Database className="w-6 h-6 text-gray-400 group-hover:text-orange-600 transition-colors" />
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-400">01 — Core</span>
                 </div>
                 
                 <div className="max-w-lg mt-12">
                    <h3 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">Sincronizzazione Assoluta</h3>
                    <p className="text-gray-500 font-light leading-relaxed">
                      Non esiste "versione precedente". Ogni dato, dalla cartella clinica all'imaging, è aggiornato in tempo reale su tutti i dispositivi della struttura. Senza conflitti.
                    </p>
                 </div>
              </div>

              {/* Feature 2: Side */}
              <div className="md:col-span-4 bg-white p-8 md:p-12 flex flex-col justify-between group hover:bg-gray-50/50 transition-colors">
                 <div className="flex justify-between items-start">
                    <Activity className="w-6 h-6 text-gray-400 group-hover:text-orange-600 transition-colors" />
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-400">02 — AI</span>
                 </div>
                 
                 <div className="mt-12">
                    <h3 className="font-serif text-2xl text-gray-900 mb-3">Analisi Predittiva</h3>
                    <p className="text-gray-500 font-light text-sm leading-relaxed">
                      Algoritmi proprietari scansionano i trend vitali per anticipare le criticità prima che accadano.
                    </p>
                 </div>
                 
                 {/* Minimal Abstract Graph */}
                 <div className="mt-8 flex items-end gap-1 h-16 opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="w-full bg-orange-600 h-[20%]"></div>
                    <div className="w-full bg-orange-600 h-[40%]"></div>
                    <div className="w-full bg-orange-600 h-[35%]"></div>
                    <div className="w-full bg-orange-600 h-[60%]"></div>
                    <div className="w-full bg-orange-600 h-[80%]"></div>
                 </div>
              </div>

              {/* Feature 3: Bottom Left */}
              <div className="md:col-span-4 bg-white p-8 md:p-12 flex flex-col justify-between group hover:bg-gray-50/50 transition-colors">
                 <div className="flex justify-between items-start">
                    <ShieldCheck className="w-6 h-6 text-gray-400 group-hover:text-orange-600 transition-colors" />
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-400">03 — Security</span>
                 </div>
                 <div className="mt-8">
                    <h3 className="font-serif text-2xl text-gray-900 mb-3">Compliance Nativa</h3>
                    <p className="text-gray-500 font-light text-sm">GDPR e HIPAA ready. Crittografia end-to-end standard.</p>
                 </div>
              </div>

              {/* Feature 4: Bottom Right */}
              <div className="md:col-span-8 bg-white p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-8 group hover:bg-gray-50/50 transition-colors">
                 <div className="max-w-md">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-6 h-6 text-gray-400 group-hover:text-orange-600 transition-colors" />
                      <span className="text-xs font-mono uppercase tracking-widest text-gray-400">04 — Speed</span>
                    </div>
                    <h3 className="font-serif text-3xl text-gray-900 mb-4">Workflow senza attrito</h3>
                    <p className="text-gray-500 font-light leading-relaxed">
                      Ogni click risparmiato è tempo guadagnato per il paziente. Interfaccia disegnata per l'efficienza motoria.
                    </p>
                 </div>
                 
                 <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-orange-600 transition-colors">
                    <MoveRight className="w-4 h-4 text-gray-900" />
                 </div>
              </div>

            </div>
          </div>
        </section>

        {/* MINIMAL CTA - TYPOGRAPHIC */}
        <section className="py-32 bg-white">
           <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="font-serif text-5xl md:text-7xl text-gray-950 mb-12 tracking-tight">
                Pronto per il futuro?
              </h2>
              
              <Link 
                href="/auth/register" 
                className="inline-block px-10 py-4 bg-gray-950 text-white text-lg font-medium hover:bg-orange-700 transition-colors duration-300"
              >
                Crea il tuo account
              </Link>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}