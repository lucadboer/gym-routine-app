import { HStack, Heading, Text, VStack } from 'native-base'

import defaulUserPhotoImg from '@assets/userPhotoDefault.png'
import LogOut from '@assets/logout.svg'
import { UserPhoto } from './UserPhoto'
import { TouchableOpacity } from 'react-native'
import { useAuth } from '@hooks/useAuth'
import { api } from '@services/api'

export function HomeHeader() {
  const { user, signOut } = useAuth()
  return (
    <HStack bg={'gray.600'} px={6} pt={16} pb={4} alignItems={'center'}>
      <UserPhoto
        size={16}
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
            : defaulUserPhotoImg
        }
      />
      <VStack ml={4} flex={1}>
        <Text fontSize={'lg'} color={'gray.100'}>
          Olá
        </Text>
        <Heading fontSize={'lg'} color={'gray.100'}>
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <LogOut />
      </TouchableOpacity>
    </HStack>
  )
}
