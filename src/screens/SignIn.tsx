import {
  Center,
  Heading,
  Icon,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import BackgroundImage from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { useState } from 'react'
import { Button } from '@components/Button'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

export function SignIn() {
  const [show, setShow] = useState(false)
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleGoSignUp() {
    navigation.navigate('signUp')
  }

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
        mt={20}
        mb={8}
        fontWeight={'bold'}
        fontSize={'xl'}
        color={'white'}
        textAlign={'center'}
      >
        Acesse sua conta
      </Heading>

      <Center>
        <Input
          placeholder="Digite seu e-mail"
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
        />
        <Input
          placeholder="Digite sua senha"
          InputLeftElement={
            <Icon
              as={<MaterialCommunityIcons name="lock-outline" />}
              ml={4}
              color={'white'}
              size={5}
            />
          }
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={
                  <MaterialCommunityIcons
                    name={show ? 'eye-outline' : 'eye-off-outline'}
                  />
                }
                size={5}
                mr={2}
              />
            </Pressable>
          }
          secureTextEntry={!show}
          autoCapitalize="none"
        />
      </Center>

      <Button title="Acesse agora" />

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
