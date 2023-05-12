import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { InputPassword } from '@components/InputPassword'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from 'native-base'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

const PHOTO_SIZE = 148

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  return (
    <VStack flex={1}>
      <ScreenHeader title="Meu perfil" />

      <Center mt={6}>
        {photoIsLoading ? (
          <Skeleton
            w={PHOTO_SIZE}
            h={PHOTO_SIZE}
            rounded={'full'}
            startColor={'gray.400'}
            endColor={'gray.500'}
          />
        ) : (
          <UserPhoto size={PHOTO_SIZE} />
        )}
        <TouchableOpacity>
          <Text mt={2} fontWeight={'bold'} fontSize={'md'} color={'green.500'}>
            Alterar foto
          </Text>
        </TouchableOpacity>
      </Center>
      <ScrollView mt={10} px={10} showsVerticalScrollIndicator={false}>
        <Input bg={'gray.600'} placeholder="Seu nome" />
        <Input bg={'gray.600'} value="luca.boer@outlook.com" isDisabled />

        <VStack mt={'6'}>
          <Heading mb={3} color={'white'} fontSize={'md'}>
            Alterar senha
          </Heading>

          <InputPassword bg={'gray.600'} placeholder="Senha antiga" />
          <InputPassword bg={'gray.600'} placeholder="Nova senha" />
          <InputPassword bg={'gray.600'} placeholder="Confirmar senha" />

          <Button mb={6} title="Confirmar alterações" />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
