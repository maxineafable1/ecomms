import { createContext, useContext, useEffect, useState } from "react";
import { LoginFormType, SignupFormType } from "../components/UserForm";

type TokensType = {
  access: string
  refresh: string
}

type UserContextType = {
  tokens: TokensType | null
  login: (e: React.FormEvent<HTMLFormElement>, form: LoginFormType) => void
  signup: (e: React.FormEvent<HTMLFormElement>, form: SignupFormType) => void
  logout: () => void
}

const initialUserContext: UserContextType = {
  tokens: null,
  login: () => { },
  signup: () => { },
  logout: () => { },
}

const UserContext = createContext(initialUserContext)

type UserProviderProps = {
  children: React.ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const [tokens, setTokens] = useState<TokensType | null>(() => {
    const storageTokens = localStorage.getItem('tokens')
    return storageTokens ? JSON.parse(storageTokens) : null
  })

  async function login(e: React.FormEvent<HTMLFormElement>, form: LoginFormType) {
    e.preventDefault()
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error);
      }
      setTokens(data)
      localStorage.setItem('tokens', JSON.stringify(data))
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function signup(e: React.FormEvent<HTMLFormElement>, form: SignupFormType) {
    e.preventDefault()
    try {
      const res = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error);
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function logout() {
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: tokens?.refresh })
      })
      setTokens(null)
      localStorage.removeItem('tokens')
    } catch (error) {
      console.log(error)
    }
  }

  async function getNewAccessToken() {
    if (!tokens) return
    try {
      const res = await fetch('/api/users/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: tokens?.refresh })
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data);
      }
      setTokens({ ...tokens, access: data.access })
      localStorage.setItem('tokens', JSON.stringify({ access: data.access, refresh: tokens.refresh }))
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (tokens?.refresh)
      getNewAccessToken()
  }, [tokens?.refresh])

  useEffect(() => {
    const minute = 1000 * 60
    const intervalId = setInterval(() => {
      if (tokens?.refresh)
        getNewAccessToken()
    }, 4 * minute)

    return () => clearInterval(intervalId)
  }, [tokens?.refresh])

  const contextValue = {
    tokens,
    login,
    signup,
    logout,
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const user = useContext(UserContext)
  if (!user) {
    throw new Error("useUserContext must be used within UserProvider");
  }
  return user
}