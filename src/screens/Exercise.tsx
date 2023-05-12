import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
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

export function Exercise() {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }
  return (
    <VStack flex={1}>
      <VStack px={6} pt={12} pb={8} bg={'gray.600'}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color={'green.500'} size={6} />
        </TouchableOpacity>

        <HStack mt={3} justifyContent={'space-between'} alignItems={'center'}>
          <Heading fontSize={'lg'} color={'gray.100'} flexShrink={1}>
            Puxada frontal
          </Heading>
          <HStack alignItems={'center'}>
            <Icon as={BodySvg} name="cpu" size={6} />
            <Text ml={1} fontSize={'md'} color={'gray.200'}>
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView contentContainerStyle={{ paddingBottom: 26 }}>
        <Box px={8} mt={12}>
          <Image
            w={'full'}
            h={80}
            source={ExercisePng}
            alt="foto do exercício"
            rounded={'lg'}
            resizeMode="cover"
          />

          <Center mt={8} bg={'gray.600'} p={4} rounded={'lg'}>
            <HStack>
              <HStack alignItems={'center'}>
                <Icon as={Series} />
                <Text ml={2} color={'gray.200'}>
                  3 séries
                </Text>
              </HStack>
              <HStack ml={10} alignItems={'center'}>
                <Icon as={Repetitons} />
                <Text ml={2} color={'gray.200'}>
                  12 repetições
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
