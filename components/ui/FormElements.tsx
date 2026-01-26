'use client'

import { useState, useEffect } from 'react'
import { COUNTRY_MAP } from '@/lib/constants'
import { Loader2, ChevronDown } from 'lucide-react'

// --- Componente ValidatedInput ---
export function ValidatedInput({ 
    name, 
    label, 
    type = "text", 
    required = false, 
    pattern, 
    errorMessage, 
    className = "", 
    placeholder = "",
    defaultValue,
    externalError,
    maxLength
}: { 
    name: string, 
    label: string, 
    type?: string, 
    required?: boolean, 
    pattern?: string, 
    errorMessage?: string,
    className?: string,
    placeholder?: string,
    defaultValue?: any,
    externalError?: string,
    maxLength?: number
}) {
    const [touched, setTouched] = useState(false)
    const [value, setValue] = useState(defaultValue || "")
    const [error, setError] = useState("")

    useEffect(() => {
        if (externalError) {
            setError(externalError)
            setTouched(true)
        }
    }, [externalError])

    // FIX: Aggiunto tipo esplicito (val: string) per risolvere errore ts(7006)
    const validate = (val: string) => {
        if (required && !val) return "Campo obbligatorio"
        if (pattern && !new RegExp(pattern).test(val)) return errorMessage || "Formato non valido"
        return ""
    }

    const handleBlur = () => {
        setTouched(true)
        setError(validate(value))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        if (touched) setError(validate(e.target.value))
    }

    return (
        <div className="relative">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                {label} {required && "*"}
            </label>
            <input 
                name={name}
                type={type}
                required={required}
                placeholder={placeholder}
                value={value}
                maxLength={maxLength}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`
                    w-full px-4 py-3 bg-white border rounded-xl outline-none transition-all
                    placeholder:text-gray-300
                    ${error ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50 text-red-900' : 'border-gray-200 focus:border-black focus:ring-4 focus:ring-gray-100 text-gray-900'}
                    ${className}
                `}
            />
            {error && <p className="text-xs text-red-500 mt-1.5 font-medium ml-1 flex items-center gap-1 animate-in slide-in-from-top-1">{error}</p>}
        </div>
    )
}

// --- Componente GlobalLocationSelector (HTML Standard) ---
export function GlobalLocationSelector({ dict }: { dict: any }) {
  const [selectedCountryCode, setSelectedCountryCode] = useState('IT') 
  const [regions, setRegions] = useState<{ name: string }[]>([])
  const [loadingRegions, setLoadingRegions] = useState(false)
  
  // Fallback sicuro se dict non è caricato
  const t = dict?.auth?.form || { labels: {}, placeholders: {}, warnings: {} };

  useEffect(() => {
    if (!selectedCountryCode) return
    setLoadingRegions(true)
    fetch(`https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json`)
      .then(res => res.json())
      .then((data: any[]) => {
         const countryStates = data.filter((s: any) => s.country_code === selectedCountryCode)
         setRegions(countryStates)
      })
      .catch(() => setRegions([]))
      .finally(() => setLoadingRegions(false))
  }, [selectedCountryCode])

  return (
    <div className="space-y-4">
        {/* SELEZIONE PAESE */}
        <div className="relative">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                {t.labels.country} *
            </label>
            <div className="relative">
                <select 
                    name="country"
                    defaultValue="Italia"
                    onChange={(e) => {
                        const val = e.target.value;
                        const country = COUNTRY_MAP.find(c => c.name === val)
                        if (country) setSelectedCountryCode(country.code)
                    }}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none appearance-none cursor-pointer focus:border-black focus:ring-4 focus:ring-gray-100 transition-all text-gray-900 pr-10"
                >
                    {COUNTRY_MAP.map(c => (
                        <option key={c.code} value={c.name}>{c.name}</option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronDown className="w-4 h-4" />
                </div>
            </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
             <div className="col-span-3">
                <ValidatedInput name="addressStreet" label={t.labels.address} placeholder={t.placeholders.address} required errorMessage={t.warnings.required} />
             </div>
             <div className="col-span-1">
                <ValidatedInput name="addressCivic" label={t.labels.civic} placeholder={t.placeholders.civic} required errorMessage="!" />
             </div>
        </div>

        <div className="grid grid-cols-6 gap-4">
            <div className="col-span-2">
                 <ValidatedInput name="postalCode" label={t.labels.zip} placeholder={t.placeholders.zip} required errorMessage={t.warnings.required} />
            </div>
            <div className="col-span-2">
                 <ValidatedInput name="city" label={t.labels.city} placeholder={t.placeholders.municipality} required errorMessage={t.warnings.required} />
            </div>
            
            {/* SELEZIONE PROVINCIA */}
            <div className="col-span-2 relative">
                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                    {t.labels.province} *
                 </label>
                 {loadingRegions ? (
                    <div className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 flex items-center text-gray-400 text-xs h-12">
                        <Loader2 className="w-3 h-3 animate-spin mr-2" /> {t.warnings.loading}
                    </div>
                 ) : regions.length > 0 ? (
                    <div className="relative">
                        <select 
                            name="region" 
                            defaultValue=""
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none appearance-none cursor-pointer focus:border-black focus:ring-4 focus:ring-gray-100 transition-all text-gray-900 pr-10"
                        >
                            <option value="" disabled>{t.placeholders.select}</option>
                            {regions.map((r, idx) => (
                                <option key={idx} value={r.name.replace('Province of ', '')}>
                                    {r.name.replace('Province of ', '')}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </div>
                 ) : (
                    <input 
                        name="region" 
                        placeholder={t.placeholders.province} 
                        required 
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-black focus:ring-4 focus:ring-gray-100 transition-all placeholder:text-gray-300"
                    />
                 )}
            </div>
        </div>
    </div>
  )
}

// --- Componente PhoneInput ---
export function PhoneInput({ label }: { label: string }) {
    return (
        <div className="relative">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                {label}
            </label>
            <div className="flex gap-3">
                <div className="w-24">
                   <input 
                      name="phonePrefix" 
                      defaultValue="+39" 
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-center font-bold text-gray-500 focus:border-black focus:ring-4 focus:ring-gray-100 outline-none"
                   />
                </div>
                <div className="flex-1">
                    <input 
                        name="phone" 
                        type="tel" 
                        placeholder="333 1234567"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-black focus:ring-4 focus:ring-gray-100 transition-all placeholder:text-gray-300"
                    />
                </div>
            </div>
        </div>
    )
}