import { HStack, Heading, Pressable, Text, VStack } from 'native-base'

import LogOut from '@assets/logout.svg'
import { UserPhoto } from './UserPhoto'
import { TouchableOpacity } from 'react-native'

export function HomeHeader() {
  return (
    <HStack bg={'gray.600'} px={8} pt={16} pb={4} alignItems={'center'}>
      <UserPhoto size={16} />
      <VStack ml={4}>
        <Text fontSize={'lg'} color={'gray.100'}>
          Olá
        </Text>
        <Heading fontSize={'lg'} color={'gray.100'}>
          Luca Destefano Boer
        </Heading>
      </VStack>

      <TouchableOpacity
        style={{
          marginLeft: 60,
        }}
      >
        <LogOut />
      </TouchableOpacity>
    </HStack>
  )
}
