import { HeroSection } from '@/features/landing/ui/HeroSection'
import { FeatureShowcase } from '@/features/landing/ui/FeatureShowcase'
import { TemplatePreviewSection } from '@/features/landing/ui/TemplatePreviewSection'
import { HowItWorks } from '@/features/landing/ui/HowItWorks'
import { CTASection } from '@/features/landing/ui/CTASection'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeatureShowcase />
      <TemplatePreviewSection />
      <HowItWorks />
      <CTASection />
    </div>
  )
}
