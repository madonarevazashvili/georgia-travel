import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// მომხმარებლები ინახება localStorage-ში (სასწავლო მაგალითი — რეალურ პროექტში საჭიროა სერვერი)
const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]')

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('currentUser') || 'null'))

  const register = ({ name, email, password }) => {
    const users = getUsers()
    if (users.some(u => u.email === email)) throw new Error('ეს ელ-ფოსტა უკვე რეგისტრირებულია')
    users.push({ name, email, password: btoa(password) })
    localStorage.setItem('users', JSON.stringify(users))
  }

  const login = (email, password) => {
    const found = getUsers().find(u => u.email === email && u.password === btoa(password))
    if (!found) throw new Error('ელ-ფოსტა ან პაროლი არასწორია')
    const current = { name: found.name, email: found.email }
    localStorage.setItem('currentUser', JSON.stringify(current))
    setUser(current)
  }

  const logout = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
