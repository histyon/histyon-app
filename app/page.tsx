import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { ArrowRight, Lock, Database, Microscope } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white flex flex-col">
      
      <Header variant="public" />

      <main className="flex-1 pt-20 pb-20 max-w-7xl mx-auto px-6 w-full">
        
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
             
             <div className="relative w-3/4 h-3/4 bg-white rounded-xl shadow-xl border border-gray-200 p-6 flex flex-col gap-4 rotate-[-1deg] hover:rotate-0 transition-transform duration-500">
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