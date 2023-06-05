import { Toast } from 'native-base'

export function showMessageSuccess(message: string) {
  const id = 'isActive'
  const title = message
  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1)
  if (!Toast.isActive(id)) {
    Toast.show({
      id,
      title: formattedTitle,
      placement: 'top',
      bgColor: 'green.500',
    })
  }
}
