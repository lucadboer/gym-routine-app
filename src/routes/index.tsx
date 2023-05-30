import { Box, useTheme } from 'native-base'
import { Auth } from './auth.routes'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { App } from './app.routes'

export function Routes() {
  const { colors } = useTheme()
  const theme = DefaultTheme
  theme.colors.background = colors.gray[700]

  return (
    <Box flex={1} bg={'gray.700'}>
      <NavigationContainer>
        <Auth />
      </NavigationContainer>
    </Box>
  )
}
