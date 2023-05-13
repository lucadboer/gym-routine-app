/* eslint-disable no-useless-return */
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { InputPassword } from '@components/InputPassword'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'

import UserPhotoDefault from '@assets/userPhotoDefault.png'

const PHOTO_SIZE = 148

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState<string>('')

  const toast = useToast()

  async function handleUpdatePhoto() {
    setPhotoIsLoading(true)

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      })

      if (photoSelected.canceled) {
        return setPhotoIsLoading(false)
      }

      const newPhoto = photoSelected.assets[0].uri

      if (newPhoto) {
        const photoInfo = await FileSystem.getInfoAsync(newPhoto)

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 4) {
          return toast.show({
            title: 'Foto muito grande, escolha uma foto com no máximo 4MB.',
            placement: 'top',
            bgColor: 'red.500',
          })
        }

        setUserPhoto(newPhoto)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

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
          <UserPhoto
            source={userPhoto ? { uri: userPhoto } : UserPhotoDefault}
            size={PHOTO_SIZE}
          />
        )}
        <TouchableOpacity>
          <Text
            onPress={handleUpdatePhoto}
            mt={2}
            fontWeight={'bold'}
            fontSize={'md'}
            color={'green.500'}
          >
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
