import { ExerciseCard } from '@components/ExerciseCard'
import { ExerciseGroup } from '@components/ExerciseGroup'
import { HomeHeader } from '@components/HomeHeader'
import { FlatList, HStack, Heading, Text, VStack } from 'native-base'
import { useState } from 'react'

export function Home() {
  const [groupSelected, setGroupSelected] = useState('')

  const [group, setGroup] = useState<string[]>([
    'COSTAS',
    'BÍCEPS',
    'TRÍCEPS',
    'PEITO',
    'PERNA',
    'OMBRO',
  ])

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={group}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <ExerciseGroup
            onPress={() => setGroupSelected(item)}
            title={item}
            isActive={groupSelected === item}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        my={8}
        maxH={12}
        _contentContainerStyle={{
          px: 8,
        }}
      />

      <HStack mb={3} px={8} justifyContent={'space-between'}>
        <Heading fontSize={'md'} color={'gray.100'}>
          Exercícios
        </Heading>
        <Text color={'gray.200'}>4</Text>
      </HStack>

      <ExerciseCard />
    </VStack>
  )
}
