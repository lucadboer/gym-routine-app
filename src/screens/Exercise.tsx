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
import ExercisePng from '@assets/exercise-large.png'
import { Button } from '@components/Button'
import { api } from '@services/api'
import { useEffect, useState } from 'react'
import { ExerciseDTO } from '@dtos/Exercise'

interface ExerciseParamsProps {
  exerciseId: string
}

export function Exercise() {
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)

  const navigation = useNavigation()
  const route = useRoute()
  const { exerciseId } = route.params as ExerciseParamsProps

  async function getExerciseById() {
    try {
      const { data } = await api.get(`/exercises/${exerciseId}`)
      setExercise(data)
    } catch (error) {
      console.error(error)
    }
  }

  console.log(exercise)

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

      <ScrollView contentContainerStyle={{ paddingBottom: 26 }}>
        <Box px={8} mt={12}>
          {exercise.demo && (
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
          )}

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
            <Button mt={6} title="Marcar como concluída" w={'full'} />
          </Center>
        </Box>
      </ScrollView>
    </VStack>
  )
}
