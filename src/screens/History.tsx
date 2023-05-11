import { HistoryExercise } from '@components/HistoryExercise'
import { ScreenHeader } from '@components/ScreenHeader'
import { Heading, SectionList, Text, VStack } from 'native-base'
import { useState } from 'react'

import Gym from '@assets/gym.svg'

export function History() {
  const [exercises, setExercies] = useState([])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <HistoryExercise
            muscle="Costas"
            exercise="Puxada frontal"
            completedAt="08:52"
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
    </VStack>
  )
}
