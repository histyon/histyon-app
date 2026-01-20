'use client'
import { User, ChevronRight } from 'lucide-react'

export function PatientList({ patients }: { patients: any[] }) {
  return (
    <div className="divide-y divide-gray-100">
      {patients.map((p) => (
        <div key={p.id} className="p-4 hover:bg-gray-50 flex items-center justify-between group cursor-pointer transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-100">
              {p.first_name[0]}{p.last_name[0]}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{p.first_name} {p.last_name}</p>
              <p className="text-xs text-gray-500 font-mono">{p.fiscal_code}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 border border-gray-200">
              {new Date(p.date_of_birth).toLocaleDateString()}
            </span>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600" />
          </div>
        </div>
      ))}
    </div>
  )
}