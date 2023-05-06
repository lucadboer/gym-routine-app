import { Input as NativeBaseInput, IInputProps } from 'native-base'

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      mb={6}
      height={14}
      bg={'gray.700'}
      borderWidth={1}
      borderColor={'transparent'}
      borderRadius={6}
      color={'white'}
      fontSize={16}
      _focus={{
        bgColor: 'gray.700',
        borderColor: 'green.500',
      }}
      {...rest}
    />
  )
}
