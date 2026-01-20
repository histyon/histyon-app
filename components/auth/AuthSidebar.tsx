'use client'

import { useState, useEffect } from 'react'
import { Activity } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const TESTIMONIALS = [
  {
    text: "L'accuratezza diagnostica incontra la velocità del cloud. Histyon riduce i tempi di refertazione del 40%.",
    author: "Dr. Valerio Rossi",
    role: "Primario Patologia"
  },
  {
    text: "La gestione dei WSI non è mai stata così fluida. Finalmente un archivio centralizzato e sicuro.",
    author: "Dr.ssa Elena Bianchi",
    role: "Oncologia Molecolare"
  },
  {
    text: "Sicurezza dei dati e conformità GDPR native. La scelta obbligata per le strutture moderne.",
    author: "Ing. Marco Verdi",
    role: "CTO Sanità Digitale"
  }
]

export function AuthSidebar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="hidden lg:flex w-[45%] bg-black text-white p-12 flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop')] bg-cover opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/90"></div>

      {/* LOGO CLICCABILE -> HOME */}
      <Link href="/" className="relative z-10 flex items-center gap-2 hover:opacity-80 transition-opacity w-fit">
        <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center">
          <Activity className="w-5 h-5" />
        </div>
        <span className="font-bold text-xl tracking-wide">Histyon</span>
      </Link>

      <div className="relative z-10 h-48">
        <AnimatePresence mode='wait'>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <blockquote className="text-2xl font-medium leading-relaxed max-w-lg">
              "{TESTIMONIALS[index].text}"
            </blockquote>
            <div>
              <p className="font-bold">{TESTIMONIALS[index].author}</p>
              <p className="text-sm text-gray-400">{TESTIMONIALS[index].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="flex gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-white' : 'w-2 bg-white/30'}`} />
          ))}
        </div>
      </div>

      {/* FOOTER INDIE */}
      <div className="relative z-10 flex justify-between items-end text-xs text-gray-400 border-t border-white/10 pt-6">
        <div>
          <p className="text-white font-semibold">Histyon Console</p>
          <p>Secure Connection</p>
        </div>
        <p>© 2026 Histyon Team</p>
      </div>
    </div>
  )
}