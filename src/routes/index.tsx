import { Box, useTheme } from 'native-base'
import { Auth } from './auth'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'

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
