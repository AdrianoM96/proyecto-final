'use client'

import { useAuth } from '@/components'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    if (isAuthenticated === true) {
      if (user?.role === 'admin') {
        setIsAuthorized(true)
      } else {
       
        setIsAuthorized(false)
        router.push('/')
      }
    } else if (isAuthenticated === false) {
      
      setIsAuthorized(false)
      router.push('/')
    }
  }, [user, isAuthenticated, router])

  if (isAuthenticated === undefined || isAuthorized === null) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}