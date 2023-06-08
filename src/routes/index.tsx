import { Box, useTheme } from 'native-base'
import { Auth } from './auth.routes'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { App } from './app.routes'
import { useAuth } from '@hooks/useAuth'
import { Loading } from '@components/Loading'

export function Routes() {
  const { colors } = useTheme()
  const theme = DefaultTheme
  theme.colors.background = colors.gray[700]

  const { user, isLoadingUserDataStorage } = useAuth()

  if (isLoadingUserDataStorage) {
    return <Loading />
  }

  return (
    <Box flex={1} bg={'gray.700'}>
      <NavigationContainer>
        {user.name ? <App /> : <Auth />}
      </NavigationContainer>
    </Box>
  )
}
