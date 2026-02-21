export interface CreditPlan {
  name: string
  maxGenerations: number
  maxSlides: number
  features: string[]
}

export const CREDIT_PLANS: Record<string, CreditPlan> = {
  free: {
    name: '무료',
    maxGenerations: 5,
    maxSlides: 6,
    features: ['기본 8 스타일', 'PNG 내보내기'],
  },
  pro: {
    name: '프로',
    maxGenerations: 100,
    maxSlides: 10,
    features: ['모든 스타일', 'PNG/ZIP 내보내기', '우선 생성', '커스텀 브랜딩'],
  },
  enterprise: {
    name: '엔터프라이즈',
    maxGenerations: -1,
    maxSlides: 15,
    features: ['모든 프로 기능', 'API 접근', '팀 협업', '전용 지원'],
  },
}
