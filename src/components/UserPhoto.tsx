import { Image, IImageProps } from 'native-base'

import userPhotoDefault from '@assets/userPhotoDefault.png'

interface UserPhotoProps extends IImageProps {
  size: number
}

export function UserPhoto({ size, ...rest }: UserPhotoProps) {
  return (
    <Image
      source={{ uri: 'https://github.com/lucadboer.png' }}
      w={size}
      h={size}
      alt="imagem de perfil"
      rounded={'full'}
      {...rest}
    />
  )
}
