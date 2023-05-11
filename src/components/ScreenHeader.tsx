import { Center, Heading } from 'native-base'

interface ScreenHeaderProps {
  title: string
}

export function ScreenHeader({ title }: ScreenHeaderProps) {
  return (
    <Center pt={16} pb={6} bg={'gray.600'} alignItems={'center'}>
      <Heading fontSize={'xl'} color={'gray.100'}>
        {title}
      </Heading>
    </Center>
  )
}
