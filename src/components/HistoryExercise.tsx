import { MaterialCommunityIcons } from '@expo/vector-icons'
import { formatToHourMinutes } from '@utils/formatToHourMinutes'
import { HStack, Heading, Icon, Text, VStack } from 'native-base'

interface HistoryExerciseProps {
  muscle: string
  exercise: string
  completedAt: string
}

export function HistoryExercise({
  muscle,
  exercise,
  completedAt,
}: HistoryExerciseProps) {
  return (
    <HStack
      bg={'gray.600'}
      mb={3}
      px={6}
      py={4}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderRadius={'lg'}
    >
      <VStack flex={1}>
        <Heading
          fontSize={'lg'}
          color={'white'}
          numberOfLines={1}
          textTransform={'capitalize'}
        >
          {muscle}
        </Heading>
        <Text mt={1} fontSize={'lg'} color={'gray.100'}>
          {exercise}
        </Text>
      </VStack>
      <HStack alignItems={'center'}>
        <Icon
          as={<MaterialCommunityIcons name="clock-time-eight-outline" />}
          size={5}
        />
        <Text fontSize={'md'} color={'gray.300'} ml={1.5}>
          {formatToHourMinutes(completedAt)}
        </Text>
      </HStack>
    </HStack>
  )
}
