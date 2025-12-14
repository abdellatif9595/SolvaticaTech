'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur:', error)
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Simulation d'une API de connexion
      // En production, remplacez ceci par un appel API réel
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Vérification simple des identifiants
      if (email === 'admin@solvaticatech.com' && password === 'admin123') {
        const userData: User = {
          id: '1',
          name: 'Admin SolvaticaTech',
          email: email,
          role: 'admin'
        }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        return true
      } else if (email === 'user@example.com' && password === 'user123') {
        const userData: User = {
          id: '2',
          name: 'Utilisateur Test',
          email: email,
          role: 'user'
        }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        return true
      } else {
        throw new Error('Identifiants invalides')
      }
    } catch (error) {
      console.error('Erreur de connexion:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  return context
} 