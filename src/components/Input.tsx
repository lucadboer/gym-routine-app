import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base'

export interface InputProps extends IInputProps {
  errorMessage?: string | boolean | null
}

export function Input({ errorMessage = null, isInvalid, ...rest }: InputProps) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        height={14}
        bg={'gray.700'}
        borderWidth={1}
        borderColor={'transparent'}
        borderRadius={6}
        color={'white'}
        fontSize={16}
        isInvalid={invalid}
        _focus={{
          bgColor: 'gray.700',
          borderColor: 'green.500',
        }}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        {...rest}
      />

      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}
