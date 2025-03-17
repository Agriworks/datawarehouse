import { useState } from 'react'

interface RoleResponse {
  email: string
  role: string
  exists: boolean
}

export function useCheckRole() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkRole = async (email: string): Promise<RoleResponse | null> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      console.log('User role:', data.role)
      return data
    } catch (error) {
      console.error('Error checking role:', error)
      setError('Failed to check role')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { checkRole, loading, error }
}
