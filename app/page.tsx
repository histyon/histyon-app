import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { ArrowRight, Lock, Database, Microscope, BrainCircuit, Check, LayoutDashboard } from 'lucide-react'
import type { Metadata } from 'next'
import { Footer } from '@/components/layout/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white flex flex-col">
      
      <Header variant="public" />

      <main className="flex-1 pt-20 pb-20 w-full max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full">
          
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col justify-center">
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
              Diagnostica <br />
              <span className="text-gray-400">Next-Gen.</span>
            </h1>
            
            <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
              La piattaforma definitiva per l'archiviazione sicura e l'analisi istologica assistita da AI. 
              Progettata per l'eccellenza clinica.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                href="/auth/register" 
                className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-3.5 rounded-lg font-medium text-base hover:bg-gray-800 transition-all hover:translate-y-[-1px] w-full sm:w-auto shadow-xl shadow-black/5"
              >
                Richiedi Accesso <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/documentation" 
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-medium text-base text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors w-full sm:w-auto"
              >
                Documentazione
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-100 mt-4">
               <div className="p-4 rounded-xl bg-gray-50 border border-gray-100/50">
                  <Lock className="w-5 h-5 text-black mb-2" />
                  <h3 className="font-bold text-sm">Sicurezza HIPAA</h3>
                  <p className="text-xs text-gray-500 mt-1">Crittografia End-to-End.</p>
               </div>
               <div className="p-4 rounded-xl bg-gray-50 border border-gray-100/50">
                  <Database className="w-5 h-5 text-black mb-2" />
                  <h3 className="font-bold text-sm">Cloud Storage</h3>
                  <p className="text-xs text-gray-500 mt-1">Archivio WSI illimitato.</p>
               </div>
               <div className="p-4 rounded-xl bg-gray-50 border border-gray-100/50">
                  <Microscope className="w-5 h-5 text-black mb-2" />
                  <h3 className="font-bold text-sm">AI Analysis</h3>
                  <p className="text-xs text-gray-500 mt-1">Motore neurale attivo.</p>
               </div>
            </div>
          </div>
          
          <div className="hidden lg:flex relative h-[600px] bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden items-center justify-center">
             
             <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
             
             <div className="relative w-3/4 h-3/4 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                
                <div className="bg-white border-b border-gray-100 h-14 flex items-center justify-between px-4 shrink-0">
                   <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-black rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="h-2 w-16 bg-gray-100 rounded-full"></div>
                   </div>
                   <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-50 border border-gray-100"></div>
                   </div>
                </div>

                <div className="flex-1 bg-gray-50 p-4 flex flex-col gap-4 overflow-hidden">
                    
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                            <div className="h-2 w-20 bg-gray-100 rounded"></div>
                        </div>
                        <div className="bg-black text-white px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1.5 shadow-lg">
                           <LayoutDashboard className="w-3 h-3" /> Console
                        </div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between relative px-6">
                        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-50 -z-10"></div>
                        <div className="w-6 h-6 rounded bg-green-50 border border-green-100 flex items-center justify-center text-green-600"><Check className="w-3 h-3" /></div>
                        <div className="w-6 h-6 rounded bg-green-50 border border-green-100 flex items-center justify-center text-green-600"><Check className="w-3 h-3" /></div>
                        <div className="w-8 h-8 rounded-lg bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600 ring-2 ring-purple-50 animate-pulse">
                             <BrainCircuit className="w-4 h-4" />
                        </div>
                        <div className="w-6 h-6 rounded bg-gray-50 border border-gray-100"></div>
                    </div>

                    <div className="flex gap-4 h-full min-h-0">
                        
                        <div className="w-1/3 space-y-3">
                            <div className="bg-white p-3 rounded-xl border border-gray-100 h-24 space-y-2">
                                <div className="h-2 w-10 bg-gray-100 rounded-full"></div>
                                <div className="h-6 w-full bg-gray-50 rounded border border-gray-50"></div>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-gray-100 flex-1 opacity-50">
                                <div className="space-y-2">
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full"></div>
                                    <div className="h-1.5 w-2/3 bg-gray-100 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 relative">
                             <div className="absolute inset-0 bg-purple-600 rounded-xl shadow-lg shadow-purple-500/20 p-4 flex flex-col justify-between overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
                                
                                <div className="relative z-10 flex justify-between items-start">
                                    <div className="space-y-1.5">
                                        <div className="w-20 h-4 bg-white/20 rounded backdrop-blur-sm"></div>
                                        <div className="w-12 h-2 bg-white/10 rounded-full"></div>
                                    </div>
                                    <BrainCircuit className="w-4 h-4 text-white animate-spin-slow opacity-80" />
                                </div>

                                <div className="relative z-10 flex flex-col items-center justify-center gap-2">
                                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center">
                                        <BrainCircuit className="w-5 h-5 text-white animate-pulse" />
                                    </div>
                                    <div className="w-24 h-2 bg-white/40 rounded-full"></div>
                                </div>

                                <div className="relative z-10 bg-black/20 rounded-lg p-2 border border-white/5 flex gap-2 items-center">
                                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-2/3 bg-white rounded-full animate-[shimmer_2s_infinite]"></div>
                                    </div>
                                    <div className="text-[8px] font-bold text-white">67%</div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}