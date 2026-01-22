import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LegalContent } from '@/components/legal/LegalContent'

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
      <Header variant="public" />

      <LegalContent />

      <Footer />
    </div>
  )
}