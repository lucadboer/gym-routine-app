import { HStack, Heading, Image, Text, VStack } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import CaretRightSvg from '@assets/caretRight.svg'
import { ExerciseDTO } from '@dtos/Exercise'
import { api } from '@services/api'

interface ExerciseCardProps extends TouchableOpacityProps {
  exercise: ExerciseDTO
}

export function ExerciseCard({ exercise, ...rest }: ExerciseCardProps) {
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
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${exercise.thumb}`,
          }}
          alt="Imagem do exercício"
          h={16}
          w={16}
          rounded="sm"
          mr={4}
          resizeMode="cover"
        />
        <VStack flex={1} ml={4}>
          <Heading fontSize={'lg'} color={'white'}>
            {exercise.name}
          </Heading>
          <Text mt={2} color={'gray.200'} numberOfLines={2}>
            {exercise.series} séries x {exercise.repetitions} repetições
          </Text>
        </VStack>
        <TouchableOpacity>
          <CaretRightSvg />
        </TouchableOpacity>
      </HStack>
    </TouchableOpacity>
  )
}
