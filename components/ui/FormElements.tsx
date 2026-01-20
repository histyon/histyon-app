'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { COUNTRY_MAP, ITALIAN_PROVINCES } from '@/lib/constants'

interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  pattern?: string 
  errorMessage?: string
  externalError?: string 
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
  // gestiamo il valore internamente ma sincronizziamolo se cambia la prop defaultValue (dal server)
  const [value, setValue] = useState(props.defaultValue || '')
  const [touched, setTouched] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // se il server ci rimanda i dati indietro (es. dopo errore), aggiorniamo il campo
  useEffect(() => {
    if (props.defaultValue !== undefined) {
      setValue(props.defaultValue)
    }
  }, [props.defaultValue])

  // se c'è un errore esterno (dal server), consideriamo il campo "toccato" per mostrarlo subito
  useEffect(() => {
    if (externalError) {
        setTouched(true)
    }
  }, [externalError])

  // logica di validazione
  const patternCheck = pattern ? new RegExp(pattern).test(String(value)) : true
  const requiredCheck = props.required ? String(value).trim().length > 0 : true
  
  // è valido se passa i check locali E NON ci sono errori esterni
  const isValid = patternCheck && requiredCheck && !externalError
  
  const isError = touched && !isValid
  // successo solo se valido, toccato, non vuoto, non password e non c'è errore esterno
  const isSuccess = touched && isValid && String(value).length > 0 && type !== 'password'

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type

  // classi Bordo Dinamiche
  const borderClass = isError 
    ? 'border-red-500 focus:border-red-500 bg-red-50/10 focus:ring-red-200' 
    : isSuccess 
      ? 'border-green-500 focus:border-green-500 bg-green-50/10 focus:ring-green-200' 
      : 'border-gray-200 focus:border-black focus:ring-gray-200'

  // messaggio da mostrare: priorità all'errore server, poi quello locale regex
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
          value={value} 
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
      
      {displayError && touched && !isValid && (
        <p className="text-[11px] font-medium text-red-600 mt-1.5 ml-1 flex items-center gap-1 animate-in slide-in-from-top-1">
          • {displayError}
        </p>
      )}
    </div>
  )
}

export function PhoneInput({ name = "phone", label = "Telefono" }) {
  const [prefixes, setPrefixes] = useState<{name: string, dial_code: string, code: string}[]>([])
  
  // carico i prefissi dall'api all'avvio
  useEffect(() => {
    async function fetchPrefixes() {
        try {
            const res = await fetch('https://countriesnow.space/api/v0.1/countries/codes')
            const json = await res.json()
            if(!json.error) {
                // ordino per nome paese
                const sorted = json.data.sort((a: any, b: any) => a.name.localeCompare(b.name))
                setPrefixes(sorted)
            }
        } catch(e) {
            console.error("Errore prefissi", e)
        }
    }
    fetchPrefixes()
  }, [])

  return (
    <div className="w-full">
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
          {label}
      </label>
      <div className="flex gap-2">
        <select 
            name={`${name}Prefix`} 
            className="w-[110px] px-2 py-3 bg-white border border-gray-200 rounded-xl appearance-none cursor-pointer focus:border-black outline-none text-sm"
            defaultValue="+39"
        >
            {/* mostro italia per prima se c'è, poi gli altri */}
            <option value="+39">🇮🇹 +39</option>
            {prefixes.map((p, i) => (
                <option key={i} value={p.dial_code}>
                    {p.code} {p.dial_code}
                </option>
            ))}
        </select>
        <div className="flex-1">
            <ValidatedInput 
                name={name} 
                placeholder="333 1234567" 
                pattern="^[0-9\s]+$" // uso la regex base per numeri
                errorMessage="Solo numeri"
            />
        </div>
      </div>
    </div>
  )
}

export function GlobalLocationSelector() {
  const [selectedCountryCode, setSelectedCountryCode] = useState('IT') 
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
        
        <div className="grid grid-cols-4 gap-4">
             <div className="col-span-3">
                <ValidatedInput 
                    name="addressStreet" 
                    label="Indirizzo" 
                    placeholder="Via/Piazza" 
                    required 
                    errorMessage="Obbligatorio" 
                />
             </div>
             <div className="col-span-1">
                <ValidatedInput 
                    name="addressCivic" 
                    label="Civico" 
                    placeholder="N." 
                    required 
                    errorMessage="!" 
                />
             </div>
        </div>

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