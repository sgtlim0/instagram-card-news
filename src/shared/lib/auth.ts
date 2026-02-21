export interface User {
  id: string
  email: string
  name: string
  plan: 'free' | 'pro' | 'enterprise'
  createdAt: Date
}

export function getCurrentUser(): User | null {
  return null
}
