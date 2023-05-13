import { Image, IImageProps } from 'native-base'

interface UserPhotoProps extends IImageProps {
  size: number
}

export function UserPhoto({ size, ...rest }: UserPhotoProps) {
  return (
    <Image
      w={size}
      h={size}
      alt="imagem de perfil"
      borderWidth={2}
      borderColor={'gray.400'}
      rounded={'full'}
      {...rest}
    />
  )
}
