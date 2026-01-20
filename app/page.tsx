import Link from 'next/link'
import { Activity, ArrowRight, Lock, Database, Microscope } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white flex flex-col">
      
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Activity className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Histyon</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
              Accedi
            </Link>
            <Link 
              href="/auth/register" 
              className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all hover:shadow-lg"
            >
              Richiedi accesso
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-32 pb-20 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start h-full">
          
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col justify-center h-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 w-fit">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Sistema Operativo v1.0</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              Diagnostica <br />
              <span className="text-gray-400">Next-Gen.</span>
            </h1>
            
            <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
              La piattaforma definitiva per l'archiviazione sicura e l'analisi istologica assistita da AI. 
              Progettata per l'eccellenza clinica.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/auth/login" 
                className="flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-gray-800 transition-all hover:translate-y-[-2px] shadow-xl shadow-black/10"
              >
                Accedi alla Console <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/auth/register" 
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-lg text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Richiedi accesso
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-100 mt-4">
               <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <Lock className="w-5 h-5 text-black mb-2" />
                  <h3 className="font-bold text-sm">Sicurezza HIPAA</h3>
                  <p className="text-xs text-gray-500 mt-1">Crittografia End-to-End.</p>
               </div>
               <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <Database className="w-5 h-5 text-black mb-2" />
                  <h3 className="font-bold text-sm">Cloud Storage</h3>
                  <p className="text-xs text-gray-500 mt-1">Archivio WSI illimitato.</p>
               </div>
               <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <Microscope className="w-5 h-5 text-black mb-2" />
                  <h3 className="font-bold text-sm">AI Analysis</h3>
                  <p className="text-xs text-gray-500 mt-1">Motore neurale attivo.</p>
               </div>
            </div>
          </div>
          
          {/* Visual Destra rimasto invariato per brevità, se serve lo rimetto */}
          <div className="hidden lg:flex relative h-[700px] bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden items-center justify-center">
             <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
             
             <div className="relative w-3/4 h-3/4 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 flex flex-col gap-4 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                   <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                   </div>
                   <div className="h-2 w-20 bg-gray-100 rounded"></div>
                </div>
                <div className="flex gap-4 h-full">
                   <div className="w-1/4 h-full bg-gray-50 rounded space-y-2 p-2">
                      <div className="h-2 w-full bg-gray-200 rounded"></div>
                      <div className="h-2 w-2/3 bg-gray-200 rounded"></div>
                      <div className="h-2 w-full bg-gray-200 rounded"></div>
                   </div>
                   <div className="w-3/4 h-full bg-gray-100 rounded border border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-sm font-mono">
                      WSI RENDERING...
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  )
}