import { IPressableProps, Pressable, Text } from 'native-base'

interface ExerciseGroupProps extends IPressableProps {
  title: string
  isActive?: boolean
}

export function ExerciseGroup({
  title,
  isActive = false,
  ...rest
}: ExerciseGroupProps) {
  return (
    <Pressable
      bg={'gray.600'}
      w={24}
      h={12}
      mr={2}
      borderWidth={1}
      borderColor={isActive ? 'green.500' : 'gray.700'}
      borderRadius={4}
      justifyContent={'center'}
      alignItems={'center'}
      _pressed={{
        opacity: 0.6,
      }}
      {...rest}
    >
      <Text color={isActive ? 'green.500' : 'gray.200'}>{title}</Text>
    </Pressable>
  )
}
