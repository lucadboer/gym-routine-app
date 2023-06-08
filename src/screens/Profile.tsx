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
import { useAuth } from '@hooks/useAuth'
import { Controller, useForm } from 'react-hook-form'
import { api } from '@services/api'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { VALID_PASSWORD_REGEX } from './SignUp'
import { showMessageError } from '@utils/showMessageError'
import { showMessageSuccess } from '@utils/showMessageSuccess'
import { UserDTO } from '@dtos/User'

interface FormData extends UserDTO {
  password: string
  old_password: string
}

const PHOTO_SIZE = 148

const updateProfileSchema = z.object({
  name: z
    .string({ required_error: 'Informe seu nome' })
    .min(2, { message: 'Digite mais de uma letra' }),
  old_password: z
    .string({ required_error: 'Informe a senha antiga' })
    .nullish(),
  password: z
    .string({ required_error: 'Informe a nova senha' })
    .min(5, { message: 'A senha deve ter 5 caracteres' })
    .max(12, { message: 'A senha deve ter no máximo 14 caracteres' })
    .regex(VALID_PASSWORD_REGEX, {
      message: 'A senha deve ter pelo menos uma letra',
    })
    .refine((value) => value || null)
    .nullish(),
})

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  const toast = useToast()
  const { user, userUpdateProfile } = useAuth()

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  })

  const oldPassword = watch('old_password')

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

        const fileExtension = newPhoto.split('.').pop()

        const userName = user.name.trim().split(' ').join('-')

        const photoFile = {
          name: `${userName}.${fileExtension}`.toLowerCase(),
          uri: newPhoto,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any

        const userPhotoUploadForm = new FormData()

        userPhotoUploadForm.append('avatar', photoFile)

        const avatarResponse = await api.patch(
          '/users/avatar',
          userPhotoUploadForm,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )

        const userUpdated = user
        userUpdated.avatar = avatarResponse.data.avatar
        userUpdateProfile(userUpdated)

        showMessageSuccess('Foto alterada!')
      }
    } catch (error) {
      showMessageError(error as Error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  async function handleUpdateProfile(data: FormData) {
    try {
      setIsUpdating(true)
      const userUpdated = user
      userUpdated.name = data.name

      await api.put('users', data)
      await userUpdateProfile(userUpdated)
      showMessageSuccess('Perfil atualizado com sucesso')
    } catch (error) {
      showMessageError(error as Error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Meu perfil" />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
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
              source={
                user.avatar
                  ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                  : UserPhotoDefault
              }
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
        <VStack mt={10} px={10}>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Digite seu nome"
                onChangeText={onChange}
                value={value}
                autoCapitalize="words"
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Input bg={'gray.600'} value={user.email} isDisabled />
          <VStack mt={'6'}>
            <Heading mb={3} color={'white'} fontSize={'md'}>
              Alterar senha
            </Heading>
            <Controller
              name="old_password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputPassword
                  placeholder="Senha antiga"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.old_password?.message}
                  bg={'gray.600'}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputPassword
                  placeholder="Nova senha"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={
                    errors.password?.message ||
                    (oldPassword &&
                      oldPassword === value &&
                      'Informe uma senha diferente da antiga')
                  }
                  bg={'gray.600'}
                />
              )}
            />
            <Button
              onPress={handleSubmit(handleUpdateProfile)}
              mb={6}
              title="Atualizar"
              isLoading={isUpdating}
            />
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
