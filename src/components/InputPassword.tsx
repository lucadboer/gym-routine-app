import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Icon, Pressable } from 'native-base'
import { useState } from 'react'
import { Input, InputProps } from './Input'

interface InputPasswordProps extends InputProps {}

export function InputPassword({ ...rest }: InputPasswordProps) {
  const [show, setShow] = useState(false)

  return (
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
      {...rest}
    />
  )
}
