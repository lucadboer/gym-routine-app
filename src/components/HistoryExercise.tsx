import { HStack, Heading, Text, VStack } from 'native-base'

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
        <Heading fontSize={'lg'} color={'white'} numberOfLines={1}>
          {muscle}
        </Heading>
        <Text mt={1} fontSize={'lg'} color={'gray.100'}>
          {exercise}
        </Text>
      </VStack>
      <Text fontSize={'md'} color={'gray.300'}>
        {completedAt}
      </Text>
    </HStack>
  )
}
