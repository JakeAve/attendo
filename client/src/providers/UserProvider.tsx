import { createContext, useContext, useState } from 'react'

interface User {
  displayName: string
  email: string
  token: string
}

interface UserContext {
  user: User | null
  setUser: (user: User | null) => void
}

const userContext = createContext<UserContext>({} as UserContext)

export const UserProvider = (props: { children: JSX.Element }) => {
  const { children } = props
  const [user, setUser] = useState<User | null>(null)

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  )
}

export const useUserContext = () => useContext(userContext)
