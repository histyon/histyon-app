'use client'

import { MONTHS, DAYS } from '@/lib/constants'

export function DateOfBirthPicker({ name = "dob" }: { name?: string }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 110 }, (_, i) => currentYear - i);
  return (
    <div className="grid grid-cols-3 gap-2">
      
      <div className="relative">
        <select 
            name={`${name}_day`} 
            required 
            defaultValue="" 
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer focus:border-black focus:ring-1 focus:ring-black outline-none text-gray-900"
        >
            <option value="" disabled>Giorno</option>
            {DAYS.map(d => (
                <option key={d} value={d.toString().padStart(2, '0')}>{d}</option>
            ))}
        </select>
      </div>

      <div className="relative">
        <select 
            name={`${name}_month`} 
            required 
            defaultValue=""
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer focus:border-black focus:ring-1 focus:ring-black outline-none text-gray-900"
        >
            <option value="" disabled>Mese</option>
            {MONTHS.map((m, i) => (
                <option key={m} value={(i + 1).toString().padStart(2, '0')}>{m}</option>
            ))}
        </select>
      </div>

      <div className="relative">
        <select 
            name={`${name}_year`} 
            required 
            defaultValue=""
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer focus:border-black focus:ring-1 focus:ring-black outline-none text-gray-900"
        >
            <option value="" disabled>Anno</option>
            {years.map(y => (
                <option key={y} value={y}>{y}</option>
            ))}
        </select>
      </div>
    </div>
  )
}