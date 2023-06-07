import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { HistoryExercise } from '@components/HistoryExercise'
import { ScreenHeader } from '@components/ScreenHeader'
import { Heading, SectionList, Text, VStack } from 'native-base'

import Gym from '@assets/gym.svg'
import { api } from '@services/api'
import { HistoryByDayDTO } from '@dtos/HistoryByDay'
import { Loading } from '@components/Loading'

export function History() {
  const [isLoading, setIsLoading] = useState(false)
  const [exercises, setExercices] = useState<HistoryByDayDTO[]>([])

  async function fetchHistoryExercises() {
    try {
      setIsLoading(true)
      const { data } = await api.get('/history')
      setExercices(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistoryExercises()
    }, []),
  )

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoryExercise
              muscle={item.group}
              exercise={item.name}
              completedAt={item.created_at}
            />
          )}
          renderSectionHeader={({ section }) => (
            <Heading mt={10} mb={'3'} fontSize="md" color={'gray.200'}>
              {section.title}
            </Heading>
          )}
          contentContainerStyle={
            exercises.length === 0 && {
              flex: 0.85,
              justifyContent: 'center',
            }
          }
          ListEmptyComponent={() => (
            <VStack alignItems={'center'}>
              <Gym width={'150px'} height={'150px'} />
              <Text fontSize={'md'} color={'gray.200'} textAlign={'center'}>
                Você ainda não registrou nenhum exercício. {'\n'}
                Bora treinar hoje?
              </Text>
            </VStack>
          )}
          px={8}
        />
      )}
    </VStack>
  )
}
