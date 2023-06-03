import { ExerciseCard } from '@components/ExerciseCard'
import { ExerciseGroup } from '@components/ExerciseGroup'
import { HomeHeader } from '@components/HomeHeader'
import { ExerciseDTO } from '@dtos/Exercise'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { FlatList, HStack, Heading, Text, VStack } from 'native-base'
import { useCallback, useEffect, useState } from 'react'
import { Platform } from 'react-native'

export function Home() {
  const [groupSelected, setGroupSelected] = useState('')
  const [exercises, setExercices] = useState<ExerciseDTO[]>([])
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

  async function fetchGroups() {
    const { data } = await api.get('groups')
    console.log(data)

    setGroups(data)
  }

  async function fetchExercises() {
    const { data } = await api.get(`exercises/bygroup/${groupSelected}`)
    setExercices(data)
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchExercises()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [groupSelected]),
  )
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
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} exercise={item} />
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
