import {
  Center,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  useToast,
} from 'native-base'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'

import BackgroundImage from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { useEffect, useState } from 'react'
import { Button } from '@components/Button'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { Controller, useForm } from 'react-hook-form'
import { InputPassword } from '@components/InputPassword'
import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'

interface SignInParams {
  userEmail?: string
}

interface FormData {
  email: string
  password: string
}

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const route = useRoute()
  const { userEmail } = (route.params as SignInParams) || {}
  const { signIn } = useAuth()
  const toast = useToast()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível acessar, tente novamente mais tarde.'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.600',
      })
    } finally {
      setIsLoading(false)
    }
  }

  function handleGoSignUp() {
    navigation.navigate('signUp')
  }

  useEffect(() => {
    if (userEmail) {
      setValue('email', userEmail)
    }
  }, [userEmail, setValue])

  return (
    <VStack flex={1} bg={'gray.700'} px={6}>
      <Image
        source={BackgroundImage}
        defaultSource={BackgroundImage}
        alt="Imagem de uma academia"
        resizeMode="contain"
        position="absolute"
      />

      <Center my={24}>
        <LogoSvg />
        <Text color={'gray.100'}>Treine sua mente e o seu corpo</Text>
      </Center>

      <Heading
        mt={16}
        mb={8}
        fontWeight={'bold'}
        fontSize={'xl'}
        color={'white'}
        textAlign={'center'}
      >
        Acesse sua conta
      </Heading>

      <Center>
        <Controller
          name="email"
          control={control}
          rules={{ required: 'Informe um email' }}
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
          rules={{ required: 'Informe uma senha' }}
          render={({ field: { onChange, value } }) => (
            <InputPassword
              placeholder="Digite sua senha"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
            />
          )}
        />
      </Center>

      <Button
        onPress={handleSubmit(handleSignIn)}
        title="Acesse agora"
        isLoading={isLoading}
      />

      <VStack mt={'16'}>
        <Text mb={4} color={'gray.100'} textAlign={'center'} fontSize={16}>
          Não tem uma conta?
        </Text>
        <Button
          onPress={handleGoSignUp}
          title="Crie agora"
          variant="secondary"
        />
      </VStack>
    </VStack>
  )
}
