'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { COUNTRY_MAP, ITALIAN_PROVINCES } from '@/lib/constants'

// --- 1. COMPONENTE INPUT CON VALIDAZIONE AVANZATA ---
interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  pattern?: string // Regex string
  errorMessage?: string
  externalError?: string // Errore che arriva dal server (es. Email già in uso)
}

export function ValidatedInput({ 
  label, 
  type, 
  pattern, 
  errorMessage, 
  externalError, 
  className, 
  ...props 
}: ValidatedInputProps) {
  // Gestiamo il valore internamente ma sincronizziamolo se cambia la prop defaultValue (dal server)
  const [value, setValue] = useState(props.defaultValue || '')
  const [touched, setTouched] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Effetto: Se il server ci rimanda i dati indietro (es. dopo errore), aggiorniamo il campo
  useEffect(() => {
    if (props.defaultValue !== undefined) {
      setValue(props.defaultValue)
    }
  }, [props.defaultValue])

  // Effetto: Se c'è un errore esterno (dal server), consideriamo il campo "toccato" per mostrarlo subito
  useEffect(() => {
    if (externalError) {
        setTouched(true)
    }
  }, [externalError])

  // LOGICA VALIDAZIONE
  const patternCheck = pattern ? new RegExp(pattern).test(String(value)) : true
  const requiredCheck = props.required ? String(value).trim().length > 0 : true
  
  // È valido se passa i check locali E NON ci sono errori esterni
  const isValid = patternCheck && requiredCheck && !externalError
  
  const isError = touched && !isValid
  // Successo solo se valido, toccato, non vuoto, non password e non c'è errore esterno
  const isSuccess = touched && isValid && String(value).length > 0 && type !== 'password'

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type

  // Classi Bordo Dinamiche
  const borderClass = isError 
    ? 'border-red-500 focus:border-red-500 bg-red-50/10 focus:ring-red-200' 
    : isSuccess 
      ? 'border-green-500 focus:border-green-500 bg-green-50/10 focus:ring-green-200' 
      : 'border-gray-200 focus:border-black focus:ring-gray-200'

  // Messaggio da mostrare: priorità all'errore server, poi quello locale regex
  const displayError = externalError || (isError ? errorMessage : null)

  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative group">
        <input
          {...props}
          type={inputType}
          value={value} // Controllato
          className={`
            w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200
            focus:ring-4 ${borderClass}
            ${type === 'password' ? 'pr-12' : 'pr-4'} 
            ${className || ''}
          `}
          onBlur={() => setTouched(true)}
          onChange={(e) => {
            setValue(e.target.value)
            if (props.onChange) props.onChange(e)
          }}
        />

        {/* ICONA PASSWORD */}
        {type === 'password' && (
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)} 
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-100"
            tabIndex={-1} 
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}

        {/* ICONE STATO (Solo se non è password per non sovrapporsi) */}
        {type !== 'password' && isError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
        )}
        {type !== 'password' && isSuccess && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
        )}
      </div>
      
      {/* Messaggio Errore */}
      {displayError && touched && !isValid && (
        <p className="text-[11px] font-medium text-red-600 mt-1.5 ml-1 flex items-center gap-1 animate-in slide-in-from-top-1">
          • {displayError}
        </p>
      )}
    </div>
  )
}

// --- 2. SELECTOR MONDIALE (Aggiornato con Validazione e Province Italiane) ---
export function GlobalLocationSelector() {
  const [selectedCountryCode, setSelectedCountryCode] = useState('IT') // Default Italia
  const [regions, setRegions] = useState<{ name: string }[]>([])
  const [loadingRegions, setLoadingRegions] = useState(false)

  useEffect(() => {
    async function fetchRegions() {
      // CASO 1: ITALIA -> Usiamo la lista statica pulita da constants.ts
      if (selectedCountryCode === 'IT') {
        // Mappiamo le stringhe in oggetti { name: string } per compatibilità
        setRegions(ITALIAN_PROVINCES.map(p => ({ name: p })))
        return
      }

      // CASO 2: ESTERO -> Usiamo API
      if (!selectedCountryCode) {
        setRegions([])
        return
      }
      
      setLoadingRegions(true)
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ iso2: selectedCountryCode })
        })
        const data = await response.json()
        if (!data.error && data.data.states) setRegions(data.data.states)
        else setRegions([])
      } catch (err) {
        console.error(err)
        setRegions([])
      } finally {
        setLoadingRegions(false)
      }
    }
    fetchRegions()
  }, [selectedCountryCode])

  return (
    <div className="space-y-4">
        {/* Paese */}
        <div className="relative">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Paese *</label>
            <select 
                name="country" 
                defaultValue="Italia"
                onChange={(e) => {
                    const country = COUNTRY_MAP.find(c => c.name === e.target.value)
                    if (country) setSelectedCountryCode(country.code)
                }}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl appearance-none cursor-pointer focus:border-black outline-none focus:ring-4 focus:ring-gray-100 transition-all"
            >
                {COUNTRY_MAP.map(c => (
                    <option key={c.code} value={c.name}>{c.name}</option>
                ))}
            </select>
        </div>

        <ValidatedInput 
            name="address" 
            label="Indirizzo" 
            placeholder="Via/Piazza, Civico" 
            required 
            errorMessage="Indirizzo obbligatorio" 
        />

        <div className="grid grid-cols-6 gap-4">
            <div className="col-span-2">
                 <ValidatedInput 
                    name="postalCode" 
                    label="CAP" 
                    placeholder="00100" 
                    required 
                    errorMessage="Obbligatorio" 
                 />
            </div>
            <div className="col-span-2">
                 <ValidatedInput 
                    name="city" 
                    label="Città" 
                    placeholder="Comune" 
                    required 
                    errorMessage="Obbligatorio" 
                 />
            </div>
            <div className="col-span-2 relative">
                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Provincia *</label>
                 
                 {loadingRegions ? (
                    <div className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 flex items-center text-gray-400 text-xs">
                        <Loader2 className="w-3 h-3 animate-spin mr-2" /> Caricamento...
                    </div>
                 ) : regions.length > 0 ? (
                    <select 
                        name="region" 
                        required 
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl appearance-none cursor-pointer focus:border-black outline-none text-sm invalid:text-gray-400"
                        defaultValue=""
                    >
                        <option value="" disabled>Seleziona</option>
                        {regions.map((r, idx) => (
                            // Rimuove "Province of" se presente nell'API estera, lascia intatto per Italia
                            <option key={idx} value={r.name.replace('Province of ', '')}>
                                {r.name.replace('Province of ', '')}
                            </option>
                        ))}
                    </select>
                 ) : (
                    <input 
                        name="region" 
                        placeholder="Provincia/Stato" 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black outline-none" 
                        required 
                    />
                 )}
            </div>
        </div>
    </div>
  )
}