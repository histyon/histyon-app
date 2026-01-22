'use client'

import { useState } from 'react'
import { Shield, Scale, Cookie, Lock, FileText } from 'lucide-react'

const TABS = [
  { id: 'privacy', label: 'Privacy Policy', icon: Shield },
  { id: 'terms', label: 'Termini di Servizio', icon: Scale },
  { id: 'cookie', label: 'Cookie Policy', icon: Cookie },
  { id: 'dpa', label: 'Trattamento Dati (DPA)', icon: FileText },
]

export function LegalContent() {
  const [activeTab, setActiveTab] = useState('privacy')

  return (
    <>
      <div className="bg-gray-50 border-b border-gray-200 py-16">
        <div className="w-full max-w-7xl mx-auto px-6 text-left space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Centro Legale & Privacy</h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            La trasparenza è fondamentale nella diagnostica medica. Qui trovi tutte le informazioni su come proteggiamo i tuoi dati e quelli dei tuoi pazienti.
          </p>
          <p className="text-xs font-mono text-gray-400 uppercase tracking-widest pt-4">
            Ultimo aggiornamento: 21 Gennaio 2026
          </p>
        </div>
      </div>

      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="w-full max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
           <div className="flex justify-start min-w-max">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className={`
                    flex items-center gap-2 px-6 py-5 text-sm font-bold border-b-2 transition-all duration-200 first:pl-0
                    ${activeTab === tab.id 
                      ? 'border-black text-black' 
                      : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200'}
                  `}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
           </div>
        </div>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:py-16 max-w-4xl mx-auto">
        
        {activeTab === 'privacy' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <SectionTitle title="Informativa sulla Privacy" subtitle="Ai sensi del Regolamento UE 2016/679 (GDPR)" />
             
             <TextBlock title="1. Titolare del Trattamento">
               Il Titolare del trattamento dei dati relativi alla registrazione dei Medici è <strong>Histyon Team</strong>, con sede in Italia. 
               Per i dati sanitari dei Pazienti caricati sulla piattaforma, il Medico professionista agisce in qualità di <strong>Titolare del Trattamento</strong>, mentre Histyon agisce come <strong>Responsabile del Trattamento</strong> (vedi sezione DPA).
             </TextBlock>

             <TextBlock title="2. Dati Raccolti">
               <ul className="list-disc pl-5 space-y-2 mt-2">
                 <li><strong>Dati del Professionista:</strong> Clarissa Gambino, info@histyon.com, Azienda Universitaria Ospedaliera di Siena.</li>
                 <li><strong>Dati di Utilizzo:</strong> Log di accesso, indirizzi IP, timestamp di caricamento file (per scopi di sicurezza e audit).</li>
                 <li><strong>Dati Pazienti (caricati dall'utente):</strong> Dati anagrafici e immagini istologiche (WSI). Questi dati sono criptati e accessibili solo dal medico autorizzato.</li>
               </ul>
             </TextBlock>

             <TextBlock title="3. Finalità e Base Giuridica">
                I dati sono trattati per:
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>Erogazione del servizio di archiviazione e analisi (Esecuzione contrattuale).</li>
                  <li>Supporto diagnostico tramite algoritmi AI (Legittimo interesse e Contratto).</li>
                  <li>Adempimenti legali e fiscali (Obbligo di legge).</li>
                </ul>
             </TextBlock>

             <TextBlock title="4. Trasferimento Dati e Fornitori">
                Ci avvaliamo di infrastrutture cloud sicure conformi a GDPR e HIPAA:
                <ul className="list-disc pl-5 space-y-2 mt-2">
                   <li><strong>Database & Auth:</strong> Supabase (Server in EU/Frankfurt).</li>
                   <li><strong>Storage Immagini:</strong> Cloudflare R2 (Criptazione a riposo).</li>
                </ul>
             </TextBlock>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <SectionTitle title="Termini e Condizioni" subtitle="Regolamento per l'utilizzo della Console Medica" />
            
            <AlertBox>
               <strong>ATTENZIONE - DISCLAIMER MEDICO:</strong><br/>
               Histyon è uno strumento di supporto tecnico e non sostituisce in alcun modo il giudizio professionale del medico. 
               L'analisi AI è probabilistica e deve essere sempre validata da un patologo umano. Histyon non è responsabile per diagnosi errate basate esclusivamente sull'output dell'software.
            </AlertBox>

            <TextBlock title="1. Requisiti di Accesso">
               L'accesso è riservato esclusivamente a <strong>medici chirurghi e patologi</strong> regolarmente iscritti all'ordine. 
               In fase di registrazione è richiesto il numero di licenza medica. Histyon si riserva il diritto di sospendere account non verificabili.
            </TextBlock>

            <TextBlock title="2. Responsabilità sui Dati Caricati">
               L'Utente (Medico) dichiara di aver ottenuto il <strong>consenso informato</strong> dal paziente per il caricamento dei dati e delle immagini istologiche sulla piattaforma, in conformità con le leggi vigenti. L'Utente è l'unico responsabile della legittimità dei dati caricati.
            </TextBlock>

            <TextBlock title="3. Uso Consentito">
               È vietato condividere le credenziali di accesso. Ogni account è strettamente personale. Il sistema monitora accessi simultanei o sospetti per prevenire abusi.
            </TextBlock>
          </div>
        )}

        {activeTab === 'cookie' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <SectionTitle title="Cookie Policy" subtitle="Trasparenza sui tracciamenti" />
            
            <TextBlock title="1. Cosa sono i cookie">
               I cookie sono piccoli file di testo salvati sul tuo dispositivo per garantire il funzionamento del sito.
            </TextBlock>

            <TextBlock title="2. Cookie Tecnici (Strettamente Necessari)">
               Histyon utilizza cookie tecnici essenziali per:
               <ul className="list-disc pl-5 space-y-2 mt-2">
                 <li><strong>Autenticazione:</strong> Mantenere la sessione sicura (tramite Supabase Auth).</li>
                 <li><strong>Sicurezza:</strong> Prevenire attacchi CSRF e accessi non autorizzati.</li>
               </ul>
               <p className="mt-2 text-sm italic">Questi cookie non richiedono il consenso preventivo in quanto necessari per erogare il servizio richiesto.</p>
            </TextBlock>

            <TextBlock title="3. Cookie di Terze Parti">
               Al momento Histyon <strong>NON</strong> utilizza cookie di profilazione pubblicitaria o marketing. 
               Eventuali strumenti di analisi (es. log di errore) raccolgono dati in forma anonima e aggregata.
            </TextBlock>
          </div>
        )}

        {activeTab === 'dpa' && (
           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <SectionTitle title="Data Processing & Sicurezza" subtitle="Appendice tecnica sulla sicurezza dei dati" />
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                   <Lock className="w-6 h-6 mb-2 text-black" />
                   <h3 className="font-bold text-sm mb-1">Crittografia</h3>
                   <p className="text-xs text-gray-500">Tutti i dati in transito usano TLS 1.3. I dati a riposo (DB e Storage) sono criptati con AES-256.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                   <Shield className="w-6 h-6 mb-2 text-black" />
                   <h3 className="font-bold text-sm mb-1">Access Control</h3>
                   <p className="text-xs text-gray-500">Row Level Security (RLS) garantisce che ogni medico veda SOLO i propri pazienti.</p>
                </div>
             </div>

             <TextBlock title="1. Nomina a Responsabile (DPA)">
                Accettando i Termini, il Medico nomina Histyon come Responsabile del Trattamento per l'archiviazione tecnica e l'elaborazione algoritmica dei vetrini. Histyon si impegna a non accedere ai dati clinici se non per scopi di manutenzione tecnica critica o su richiesta dell'autorità giudiziaria.
             </TextBlock>

             <TextBlock title="2. Conformità HIPAA (Security Rule)">
                Per gli utenti soggetti a normativa USA, implementiamo misure di sicurezza fisica, tecnica e amministrativa compatibili con HIPAA Security Rule, inclusi audit log degli accessi e backup automatici.
             </TextBlock>
           </div>
        )}

      </main>
    </>
  )
}

function SectionTitle({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <div className="border-b border-gray-100 pb-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <p className="text-gray-500 mt-1">{subtitle}</p>
    </div>
  )
}

function TextBlock({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="bg-white">
      <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
      <div className="text-gray-600 leading-relaxed text-sm md:text-base">
        {children}
      </div>
    </div>
  )
}

function AlertBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-amber-900 text-sm leading-relaxed flex gap-3">
       <div className="shrink-0 pt-0.5">
          <Scale className="w-5 h-5 text-amber-600" />
       </div>
       <div>{children}</div>
    </div>
  )
}