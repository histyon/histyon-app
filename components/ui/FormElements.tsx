'use client'

import React, { useState, useEffect, useRef, createContext, useContext } from 'react'
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, ChevronDown, Check } from 'lucide-react'
import { COUNTRY_MAP, ITALIAN_PROVINCES } from '@/lib/constants'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={`flex h-12 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

interface SelectContextType {
  value: string
  onChange: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}
const SelectContext = createContext<SelectContextType | undefined>(undefined)

export function Select({ children, value, onValueChange, defaultValue, name }: { children: React.ReactNode, value?: string, onValueChange?: (val: string) => void, defaultValue?: string, name?: string }) {
  const [internalValue, setInternalValue] = useState(defaultValue || "")
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleValueChange = (val: string) => {
    setInternalValue(val)
    if (onValueChange) onValueChange(val)
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
     if (value !== undefined) setInternalValue(value);
  }, [value]);

  const currentValue = value !== undefined ? value : internalValue

  return (
    <SelectContext.Provider value={{ value: currentValue, onChange: handleValueChange, open, setOpen }}>
      <div className="relative w-full" ref={containerRef}>
        {children}
        {name && <input type="hidden" name={name} value={currentValue} />}
      </div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({ children, className }: { children: React.ReactNode, className?: string }) {
  const ctx = useContext(SelectContext)
  if (!ctx) throw new Error("SelectTrigger must be used within Select")
  return (
    <button type="button" onClick={() => ctx.setOpen(!ctx.open)} className={`flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm ring-offset-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset disabled:cursor-not-allowed disabled:opacity-50 ${className}`}>
      {children}
      <ChevronDown className="h-4 w-4 opacity-50 transition-transform duration-200" style={{ transform: ctx.open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
    </button>
  )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span className="pointer-events-none">{placeholder}</span>
}

export function SelectContent({ children, className }: { children: React.ReactNode, className?: string }) {
  const ctx = useContext(SelectContext)
  if (!ctx || !ctx.open) return null
  return (
    <div className={`absolute top-full left-0 mt-1 w-full min-w-[8rem] overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-950 shadow-xl animate-in fade-in-80 zoom-in-95 z-50 ${className}`}>
      <div className="p-1 max-h-[250px] overflow-y-auto custom-scrollbar">{children}</div>
    </div>
  )
}

export function SelectItem({ value, children, className }: { value: string, children: React.ReactNode, className?: string }) {
  const ctx = useContext(SelectContext)
  if (!ctx) throw new Error("SelectItem must be used within Select")
  const isSelected = ctx.value === value
  return (
    <div onClick={() => ctx.onChange(value)} className={`relative flex w-full cursor-default select-none items-center rounded-lg py-2 pl-2 pr-8 text-sm outline-none hover:bg-gray-50 focus:bg-gray-50 cursor-pointer ${className} ${isSelected ? 'bg-gray-50 font-medium' : ''}`}>
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">{isSelected && <Check className="h-4 w-4" />}</span>
      <span className="truncate w-full">{children}</span>
    </div>
  )
}

interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  pattern?: string 
  errorMessage?: string
  externalError?: string 
}

export function ValidatedInput({ label, type, pattern, errorMessage, externalError, className, ...props }: ValidatedInputProps) {
  const [value, setValue] = useState(props.defaultValue || '')
  const [touched, setTouched] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (props.defaultValue !== undefined && props.defaultValue !== value) {
        setValue(props.defaultValue)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.defaultValue]) 

  useEffect(() => {
    if (externalError) setTouched(true)
  }, [externalError])

  const isNotEmpty = String(value).trim().length > 0;
  
  const patternCheck = pattern && isNotEmpty ? new RegExp(pattern).test(String(value)) : true
  const requiredCheck = props.required ? isNotEmpty : true;  
  
  const isValid = patternCheck && requiredCheck && !externalError
  const isError = touched && !isValid
  const isSuccess = touched && isValid && isNotEmpty && type !== 'password'
  
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type
  
  const borderClass = isError 
    ? 'border-red-500 focus-visible:ring-red-200 bg-red-50/10' 
    : isSuccess 
        ? 'border-green-500 focus-visible:ring-green-200 bg-green-50/10' 
        : 'border-gray-200 focus-visible:ring-gray-200'

  const displayError = externalError || (isError ? errorMessage : null)

  return (
    <div className="w-full">
      {label && <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">{label} {props.required && <span className="text-red-500">*</span>}</label>}
      <div className="relative group">
        <Input 
          {...props} 
          type={inputType} 
          value={value} 
          className={`pr-10 ${borderClass} ${className || ''}`} 
          onBlur={() => setTouched(true)} 
          onChange={(e) => { 
            setValue(e.target.value); 
            if (props.onChange) props.onChange(e) 
          }} 
        />
        {type === 'password' && <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-100" tabIndex={-1}>{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>}
        
        {type !== 'password' && isError && <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none animate-in zoom-in"><AlertCircle className="w-4 h-4 text-red-500" /></div>}
        {type !== 'password' && isSuccess && <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none animate-in zoom-in"><CheckCircle2 className="w-4 h-4 text-green-500" /></div>}
      </div>
      
      {displayError && touched && !isValid && <p className="text-[11px] font-medium text-red-600 mt-1.5 ml-1 flex items-center gap-1 animate-in slide-in-from-top-1">• {displayError}</p>}
    </div>
  )
}

interface LocationDefaults {
    country?: string
    addressStreet?: string
    addressCivic?: string
    postalCode?: string
    city?: string
    region?: string
}

export function GlobalLocationSelector({ defaults, dict }: { defaults?: LocationDefaults, dict?: any }) {
  const [selectedCountryCode, setSelectedCountryCode] = useState(() => {
      if (defaults?.country) {
          const c = COUNTRY_MAP.find(x => x.name === defaults.country);
          if (c) return c.code;
      }
      return 'IT';
  });
  
  const [selectedRegion, setSelectedRegion] = useState(defaults?.region || "");
  const [regions, setRegions] = useState<{ name: string }[]>([])
  const [loadingRegions, setLoadingRegions] = useState(false)

  const t = dict?.auth?.form || { labels: { country: "Paese", address: "Indirizzo", civic: "Civico", zip: "CAP", city: "Città", province: "Provincia" }, placeholders: {}, warnings: { required: "Obbligatorio", loading: "Caricamento..." } };

  useEffect(() => {
    async function fetchRegions() {
      if (!selectedCountryCode) {
        setRegions([])
        return
      }

      if (selectedCountryCode === 'IT') {
          setRegions(ITALIAN_PROVINCES.map(p => ({ name: p })))
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
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">{t.labels.country} *</label>
            <Select 
                name="country" 
                defaultValue={defaults?.country || "Italia"}
                onValueChange={(val) => {
                    const country = COUNTRY_MAP.find(c => c.name === val)
                    if (country) setSelectedCountryCode(country.code)
                    setSelectedRegion("") 
                }}
            >
                <SelectTrigger className="h-12">
                   <span className="truncate">{COUNTRY_MAP.find(c => c.code === selectedCountryCode)?.name || "Seleziona"}</span>
                </SelectTrigger>
                <SelectContent>
                    {COUNTRY_MAP.map(c => (
                        <SelectItem key={c.code} value={c.name}>{c.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
             <div className="col-span-3">
                <ValidatedInput name="addressStreet" defaultValue={defaults?.addressStreet} label={t.labels.address} placeholder={t.placeholders.address} required errorMessage={t.warnings.required} />
             </div>
             <div className="col-span-1">
                <ValidatedInput name="addressCivic" defaultValue={defaults?.addressCivic} label={t.labels.civic} placeholder={t.placeholders.civic} required errorMessage="!" />
             </div>
        </div>

        <div className="grid grid-cols-6 gap-4">
            <div className="col-span-2">
                 <ValidatedInput name="postalCode" defaultValue={defaults?.postalCode} label={t.labels.zip} placeholder={t.placeholders.zip} required errorMessage={t.warnings.required} />
            </div>
            <div className="col-span-2">
                 <ValidatedInput name="city" defaultValue={defaults?.city} label={t.labels.city} placeholder={t.placeholders.municipality} required errorMessage={t.warnings.required} />
            </div>
            <div className="col-span-2 relative">
                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">{t.labels.province} *</label>
                 
                 {loadingRegions ? (
                    <div className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 flex items-center text-gray-400 text-xs h-12">
                        <Loader2 className="w-3 h-3 animate-spin mr-2" /> {t.warnings.loading}
                    </div>
                 ) : regions.length > 0 ? (
                    <Select 
                        name="region" 
                        defaultValue={selectedRegion}
                        value={selectedRegion} 
                        onValueChange={setSelectedRegion}
                    >
                        <SelectTrigger className="h-12">
                             <span className="truncate">{selectedRegion || t.placeholders.select || "Seleziona"}</span>
                        </SelectTrigger>
                        <SelectContent>
                            {regions.map((r, idx) => {
                                const val = r.name.replace('Province of ', '')
                                return <SelectItem key={idx} value={val}>{val}</SelectItem>
                            })}
                        </SelectContent>
                    </Select>
                 ) : (
                    <Input name="region" defaultValue={defaults?.region} placeholder={t.placeholders.province} required />
                 )}
            </div>
        </div>
    </div>
  )
}

export function PhoneInput({ label, defaultValue }: { label: string, defaultValue?: string }) {
    const parseValue = (val?: string) => {
        const parts = val ? val.split(' ') : [];
        return {
            prefix: parts.length > 1 ? parts[0] : '+39',
            number: parts.length > 1 ? parts.slice(1).join(' ') : (val || '')
        };
    };

    const initial = parseValue(defaultValue);
    const [prefix, setPrefix] = useState(initial.prefix);

    useEffect(() => {
        const updated = parseValue(defaultValue);
        setPrefix(updated.prefix);
    }, [defaultValue]);

    const currentCountry = COUNTRY_MAP.find(c => c.dial_code === prefix) || COUNTRY_MAP.find(c => c.code === 'IT');

    return (
        <div className="relative">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">{label}</label>
            <div className="flex gap-2">
                <div className="w-[100px] relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10 text-xl">
                        {currentCountry?.flag}
                    </span>
                    <select 
                        name="phonePrefix"
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                        className="w-full h-12 pl-10 pr-2 bg-white border border-gray-200 rounded-xl text-sm font-bold appearance-none focus:ring-2 focus:ring-black focus:ring-inset outline-none cursor-pointer"
                    >
                        {COUNTRY_MAP.map((c) => (
                            <option key={c.code} value={c.dial_code}>{c.dial_code} ({c.code})</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1">
                    <Input 
                        key={defaultValue} 
                        name="phone" 
                        type="tel" 
                        defaultValue={initial.number} 
                        placeholder="333 1234567" 
                    />
                </div>
            </div>
        </div>
    );
}