import { IButtonProps, Button as NativeBaseButton, Text } from 'native-base'

interface ButtonProps extends IButtonProps {
  title: string
  variant?: 'primary' | 'secondary'
}

export function Button({ title, variant = 'primary', ...rest }: ButtonProps) {
  return (
    <NativeBaseButton
      h={14}
      bgColor={variant === 'primary' ? 'green.700' : 'transparent'}
      borderWidth={2}
      borderColor={variant === 'primary' ? 'transparent' : 'green.700'}
      borderRadius={6}
      _pressed={{
        bgColor: variant === 'primary' ? 'green.500' : 'gray.600',
      }}
      {...rest}
    >
      <Text
        fontWeight={'bold'}
        fontSize={16}
        color={variant === 'primary' ? 'white' : 'green.700'}
      >
        {title}
      </Text>
    </NativeBaseButton>
  )
}
