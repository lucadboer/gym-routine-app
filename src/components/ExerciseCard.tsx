import { HStack, Heading, Image, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'

import CaretRightSvg from '@assets/caretRight.svg'
import Exercise from '@assets/exercise.png'

export function ExerciseCard() {
  return (
    <HStack
      py={3}
      pl={3}
      pr={4}
      bg={'gray.500'}
      justifyContent={'center'}
      rounded={8}
    >
      <Image source={Exercise} resizeMode="contain" alt="Imagem do exercício" />
      <VStack flex={1} ml={4}>
        <Heading fontSize={'lg'} color={'white'}>
          Puxada Frontal
        </Heading>
        <Text color={'gray.200'}>3 séries x 12 repetições</Text>
      </VStack>
      <TouchableOpacity>
        <CaretRightSvg />
      </TouchableOpacity>
    </HStack>
  )
}
