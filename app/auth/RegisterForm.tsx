'use client'

import React, { useState, useEffect, useRef, createContext, useContext } from 'react'
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, ChevronDown, Check } from 'lucide-react'
import { COUNTRY_MAP, ITALIAN_PROVINCES } from '@/lib/constants'

// --- 1. COMPONENTI BASE UI (Input, Button, Select) ---

// INPUT BASE
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-12 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

// BUTTON BASE
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={`inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// SELECT FAMILY (Custom implementation leggera senza Radix per velocità)
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

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const currentValue = value !== undefined ? value : internalValue

  return (
    <SelectContext.Provider value={{ value: currentValue, onChange: handleValueChange, open, setOpen }}>
      <div className="relative w-full" ref={containerRef}>
        {children}
        {/* Hidden input per form submission standard HTML */}
        {name && <input type="hidden" name={name} value={currentValue} />}
      </div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({ children, className }: { children: React.ReactNode, className?: string }) {
  const ctx = useContext(SelectContext)
  if (!ctx) throw new Error("SelectTrigger must be used within Select")
  
  return (
    <button
      type="button"
      onClick={() => ctx.setOpen(!ctx.open)}
      className={`flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm ring-offset-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const ctx = useContext(SelectContext)
  // Qui potremmo mappare il value con il label se avessimo accesso ai children, ma per semplicità renderizziamo il value o children passati
  // Nel caso specifico del form, il trigger ha children custom, quindi questo componente è spesso vuoto o mostra il value raw
  return <span className="pointer-events-none">{placeholder}</span>
}

export function SelectContent({ children, className }: { children: React.ReactNode, className?: string }) {
  const ctx = useContext(SelectContext)
  if (!ctx || !ctx.open) return null

  return (
    <div className={`absolute top-full left-0 mt-1 w-full min-w-[8rem] overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-950 shadow-md animate-in fade-in-80 zoom-in-95 z-50 ${className}`}>
      <div className="p-1 max-h-[300px] overflow-y-auto custom-scrollbar">
        {children}
      </div>
    </div>
  )
}

export function SelectItem({ value, children, className }: { value: string, children: React.ReactNode, className?: string }) {
  const ctx = useContext(SelectContext)
  if (!ctx) throw new Error("SelectItem must be used within Select")
  
  const isSelected = ctx.value === value

  return (
    <div
      onClick={() => ctx.onChange(value)}
      className={`relative flex w-full cursor-default select-none items-center rounded-lg py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer ${className} ${isSelected ? 'bg-gray-50 font-medium' : ''}`}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Check className="h-4 w-4" />}
      </span>
      <span className="truncate w-full">{children}</span>
    </div>
  )
}


// --- 2. COMPONENTI SMART (ValidatedInput, etc.) ---

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
  const [value, setValue] = useState(props.defaultValue || '')
  const [touched, setTouched] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (props.defaultValue !== undefined) setValue(props.defaultValue)
  }, [props.defaultValue])

  useEffect(() => {
    if (externalError) setTouched(true)
  }, [externalError])

  const patternCheck = pattern ? new RegExp(pattern).test(String(value)) : true
  const requiredCheck = props.required ? String(value).trim().length > 0 : true
  const isValid = patternCheck && requiredCheck && !externalError
  const isError = touched && !isValid
  const isSuccess = touched && isValid && String(value).length > 0 && type !== 'password'

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type

  const borderClass = isError 
    ? 'border-red-500 focus-visible:ring-red-200 bg-red-50/10' 
    : isSuccess 
      ? 'border-green-500 focus-visible:ring-green-200 bg-green-50/10' 
      : 'border-gray-200 focus-visible:ring-gray-200'

  const displayError = externalError || (isError ? errorMessage : null)

  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative group">
        <Input
          {...props}
          type={inputType}
          value={value} 
          className={`
            pr-10 ${borderClass} ${className || ''}
            focus-visible:ring-4 transition-all duration-200
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
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}

        {type !== 'password' && isError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <AlertCircle className="w-4 h-4 text-red-500" />
            </div>
        )}
        {type !== 'password' && isSuccess && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
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

export function GlobalLocationSelector() {
  const [selectedCountryCode, setSelectedCountryCode] = useState('IT') 
  const [regions, setRegions] = useState<{ name: string }[]>([])
  const [loadingRegions, setLoadingRegions] = useState(false)

  useEffect(() => {
    async function fetchRegions() {
      if (selectedCountryCode === 'IT') {
        setRegions(ITALIAN_PROVINCES.map(p => ({ name: p })))
        return
      }
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
            <Select 
                name="country" 
                defaultValue="Italia"
                onValueChange={(val) => {
                    const country = COUNTRY_MAP.find(c => c.name === val)
                    if (country) setSelectedCountryCode(country.code)
                }}
            >
                <SelectTrigger className="h-12">
                   {/* Fallback display se non abbiamo accesso allo stato interno del trigger facilmente */}
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
                    <div className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 flex items-center text-gray-400 text-xs h-12">
                        <Loader2 className="w-3 h-3 animate-spin mr-2" /> Caricamento...
                    </div>
                 ) : regions.length > 0 ? (
                    <Select name="region" defaultValue="">
                        <SelectTrigger className="h-12">
                             <span className="truncate">Seleziona</span>
                        </SelectTrigger>
                        <SelectContent>
                            {regions.map((r, idx) => (
                                <SelectItem key={idx} value={r.name.replace('Province of ', '')}>
                                    {r.name.replace('Province of ', '')}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                 ) : (
                    <Input 
                        name="region" 
                        placeholder="Provincia/Stato" 
                        required 
                    />
                 )}
            </div>
        </div>
    </div>
  )
}