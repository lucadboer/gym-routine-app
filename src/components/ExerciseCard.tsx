import { HStack, Heading, Image, Text, VStack } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

import CaretRightSvg from '@assets/caretRight.svg'
import Exercise from '@assets/exercise.png'

interface ExerciseCardProps extends TouchableOpacityProps {
  title: string
}

export function ExerciseCard({ title, ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        mb={4}
        p={3}
        pr={4}
        alignItems={'center'}
        bg={'gray.500'}
        rounded={8}
      >
        <Image
          source={Exercise}
          alt="Imagem do exercício"
          resizeMode="contain"
        />
        <VStack flex={1} ml={4}>
          <Heading fontSize={'lg'} color={'white'}>
            {title}
          </Heading>
          <Text mt={2} color={'gray.200'} numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>
        <TouchableOpacity>
          <CaretRightSvg />
        </TouchableOpacity>
      </HStack>
    </TouchableOpacity>
  )
}
