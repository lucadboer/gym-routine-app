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

import BackgroundImage from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { useState } from 'react'
import { Button } from '@components/Button'

export function SignUp() {
  const [show, setShow] = useState(false)

  return (
    <VStack flex={1} bg={'gray.700'} px={6}>
      <Image
        source={BackgroundImage}
        alt="Imagem de uma academia"
        resizeMode="contain"
        position="absolute"
      />

      <Center my={24}>
        <LogoSvg />
        <Text color={'gray.100'}>Treine sua mente e o seu corpo</Text>
      </Center>

      <Heading
        mb={8}
        fontWeight={'bold'}
        fontSize={'xl'}
        color={'white'}
        textAlign={'center'}
      >
        Crie a sua conta
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
        <Input
          placeholder="Confirme sua senha"
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

      <Button title="Criar e acessar" />

      <VStack mt={'24'}>
        <Button title="Voltar para login" variant="secondary" />
      </VStack>
    </VStack>
  )
}
