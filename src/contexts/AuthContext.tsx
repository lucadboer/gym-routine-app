/* eslint-disable no-useless-catch */
import { UserDTO } from '@dtos/User'
import { api } from '@services/api'
import {
  storageTokenGet,
  storageTokenRemove,
  storageTokenSave,
} from '@storage/auth/storageAuthToken'
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/users/storageUser'
import { ReactNode, createContext, useEffect, useState } from 'react'

interface AuthContextDataProps {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  userUpdateProfile: (userUpdated: UserDTO) => Promise<void>
  isLoadingUserDataStorage: boolean
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  const [isLoadingUserDataStorage, setIsLoadingUserDataStorage] =
    useState(false)

  async function userUpdateProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated)
      await storageUserSave(userUpdated)
    } catch (error) {
      throw error
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      const { user, token } = data

      if (user && token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`

        await storageTokenSave(token)
        await storageUserSave(user)
        setUser(user)
      }
    } catch (error) {
      throw error
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserDataStorage(true)
      setUser({} as UserDTO)
      await storageUserRemove()
      await storageTokenRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserDataStorage(false)
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserDataStorage(true)
      const userLogged = await storageUserGet()
      const token = await storageTokenGet()

      if (userLogged && token) {
        setUser(userLogged)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserDataStorage(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user,
        isLoadingUserDataStorage,
        signOut,
        userUpdateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
