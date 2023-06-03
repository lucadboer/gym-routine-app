import { useState } from 'react'
import {
  Center,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import BackgroundImage from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { useNavigation } from '@react-navigation/native'
import { InputPassword } from '@components/InputPassword'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppError } from '@utils/AppError'
import { api } from '@services/api'

interface FormData {
  name: string
  email: string
  password: string
  password_confirm: string
}

const VALID_PASSWORD_REGEX = /^(?=.*[a-zA-Z]).+$/

const signUpSchema = z.object({
  name: z
    .string({ required_error: 'Informe seu nome' })
    .min(2, { message: 'Digite mais de uma letra' }),
  email: z
    .string({ required_error: 'Informe seu email' })
    .email({ message: 'Email inválido' }),
  password: z
    .string({ required_error: 'Informe sua senha' })
    .min(5, { message: 'A senha deve ter 5 caracteres' })
    .max(12, { message: 'A senha deve ter no máximo 14 caracteres' })
    .regex(VALID_PASSWORD_REGEX, {
      message: 'A senha deve ter pelo menos uma letra',
    }),
  password_confirm: z.string({ required_error: 'Confirme sua senha' }),
})

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  })

  const toast = useToast()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleSignUp({ name, email, password }: FormData) {
    try {
      setIsLoading(true)
      await api.post('/users', { name, email, password })

      toast.show({
        title: 'Usuário criado com sucesso',
        placement: 'top',
        bgColor: 'green.600',
      })

      navigation.navigate('signIn', {
        userEmail: email,
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível criar sua conta, tente novamente mais tarde.'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.600',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScrollView
      _contentContainerStyle={{
        paddingBottom: 10,
      }}
    >
      <VStack flex={1} bg={'gray.700'} px={6}>
        <Image
          source={BackgroundImage}
          defaultSource={BackgroundImage}
          alt="Imagem de uma academia"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={'24'}>
          <LogoSvg />
          <Text color={'gray.100'}>Treine sua mente e o seu corpo</Text>
        </Center>

        <Heading
          mb={'6'}
          fontWeight={'bold'}
          fontSize={'xl'}
          color={'white'}
          textAlign={'center'}
        >
          Crie a sua conta
        </Heading>

        <Center>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Digite seu nome"
                onChangeText={onChange}
                value={value}
                InputLeftElement={
                  <Icon
                    as={<MaterialCommunityIcons name="account" />}
                    ml={4}
                    color={'white'}
                    size={5}
                  />
                }
                autoCapitalize="words"
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Digite seu e-mail"
                onChangeText={onChange}
                value={value}
                InputLeftElement={
                  <Icon
                    as={<MaterialCommunityIcons name="email-outline" />}
                    ml={4}
                    color={'white'}
                    size={5}
                  />
                }
                keyboardType="email-address"
                autoCapitalize="none"
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputPassword
                placeholder="Digite sua senha"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            name="password_confirm"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputPassword
                placeholder="Confirme sua senha"
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={
                  errors.password_confirm?.message ||
                  (value !== watch('password') && 'As senhas não coincidem')
                }
              />
            )}
          />
        </Center>

        <Button
          onPress={handleSubmit(handleSignUp)}
          title="Criar"
          isLoading={isLoading}
        />

        <VStack mt={'12'}>
          <Button
            onPress={handleGoBack}
            title="Voltar para login"
            variant="secondary"
          />
        </VStack>
      </VStack>
    </ScrollView>
  )
}
