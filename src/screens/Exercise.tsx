import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Box,
  Center,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import { TouchableOpacity } from 'react-native'

import BodySvg from '@assets/body.svg'
import Series from '@assets/series.svg'
import Repetitons from '@assets/repetitions.svg'
import { Button } from '@components/Button'
import { api } from '@services/api'
import { useEffect, useState } from 'react'
import { ExerciseDTO } from '@dtos/Exercise'
import { Loading } from '@components/Loading'
import { showMessageError } from '@utils/showMessageError'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { showMessageSuccess } from '@utils/showMessageSuccess'

interface ExerciseParamsProps {
  exerciseId: string
}

export function Exercise() {
  const [isSending, setIsSending] = useState(false)
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()
  const { exerciseId } = route.params as ExerciseParamsProps

  async function getExerciseById() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/exercises/${exerciseId}`)
      setExercise(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleRegisterExercise(exerciseId: string) {
    try {
      setIsSending(true)
      await api.post('history', { exercise_id: exerciseId })

      showMessageSuccess(
        `${exercise.group} cada vez mais forte, continue assim!`,
      )
      navigation.navigate('history')
    } catch (error) {
      showMessageError(error as Error)
    } finally {
      setIsSending(false)
    }
  }

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    getExerciseById()
  }, [exerciseId])
  return (
    <VStack flex={1}>
      <VStack px={6} pt={12} pb={8} bg={'gray.600'}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color={'green.500'} size={6} />
        </TouchableOpacity>

        <HStack mt={3} justifyContent={'space-between'} alignItems={'center'}>
          <Heading fontSize={'lg'} color={'gray.100'} flexShrink={1}>
            {exercise.name}
          </Heading>
          <HStack alignItems={'center'}>
            <Icon as={BodySvg} name="cpu" size={6} />
            <Text
              ml={1}
              fontSize={'md'}
              color={'gray.200'}
              textTransform="capitalize"
            >
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 26 }}>
          <Box px={8} mt={12}>
            <Image
              w="full"
              h={80}
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
              }}
              alt="Nome do Exercicio"
              mb={3}
              resizeMode="cover"
              rounded="lg"
            />

            <Center mt={8} bg={'gray.600'} p={4} rounded={'lg'}>
              <HStack>
                <HStack alignItems={'center'}>
                  <Icon as={Series} />
                  <Text ml={2} color={'gray.200'}>
                    {exercise.series} séries
                  </Text>
                </HStack>
                <HStack ml={10} alignItems={'center'}>
                  <Icon as={Repetitons} />
                  <Text ml={2} color={'gray.200'}>
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>
              <Button
                onPress={() => handleRegisterExercise(exercise.id)}
                isLoading={isSending}
                mt={6}
                title="Marcar como concluída"
                w={'full'}
              />
            </Center>
          </Box>
        </ScrollView>
      )}
    </VStack>
  )
}
