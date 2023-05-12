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
import { Button } from '@components/Button'
import { AuthNavigatorRoutesProps } from '@routes/auth'
import { useNavigation } from '@react-navigation/native'
import { InputPassword } from '@components/InputPassword'

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
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
        <InputPassword placeholder="Digite sua senha" />
        <InputPassword placeholder="Confirme sua senha" />
      </Center>

      <Button title="Criar e acessar" />

      <VStack mt={'24'}>
        <Button
          onPress={handleGoBack}
          title="Voltar para login"
          variant="secondary"
        />
      </VStack>
    </VStack>
  )
}
