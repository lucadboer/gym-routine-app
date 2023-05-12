import { ExerciseCard } from '@components/ExerciseCard'
import { ExerciseGroup } from '@components/ExerciseGroup'
import { HomeHeader } from '@components/HomeHeader'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { FlatList, HStack, Heading, Text, VStack } from 'native-base'
import { useState } from 'react'
import { Platform } from 'react-native'

export function Home() {
  const [groupSelected, setGroupSelected] = useState('')
  const [exercises, setExercices] = useState([
    'Puxada Frontal',
    'Remada Curvada',
    'Remada Unilateral',
    'Levantamento Terra',
    'Peckdeck Invertido',
    'aaa',
    'aaaa',
  ])
  const [groups, setGroup] = useState<string[]>([
    'COSTAS',
    'BÍCEPS',
    'TRÍCEPS',
    'PEITO',
    'PERNA',
    'OMBRO',
  ])

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }
  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        flex={2}
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <ExerciseGroup
            title={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8,
        }}
        my={8}
        maxH={12}
        minH={12}
      />

      <VStack px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard title={item} onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: Platform.OS === 'ios' ? 20 : 80,
          }}
        />
      </VStack>
    </VStack>
  )
}
