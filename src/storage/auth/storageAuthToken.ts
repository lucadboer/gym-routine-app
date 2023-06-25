import AsyncStorage from '@react-native-async-storage/async-storage'
import { AUTH_TOKEN_STORAGE } from '@storage/storageConfig'

interface StorageTokenProps {
  token: string
  refresh_token: string
}

export async function storageTokenSave({
  token,
  refresh_token,
}: StorageTokenProps) {
  await AsyncStorage.setItem(
    AUTH_TOKEN_STORAGE,
    JSON.stringify({ token, refresh_token }),
  )
}

export async function storageTokenGet() {
  const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)

  const { token, refresh_token }: StorageTokenProps = response
    ? JSON.parse(response)
    : {}

  return {
    token,
    refresh_token,
  }
}

export async function storageTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}
