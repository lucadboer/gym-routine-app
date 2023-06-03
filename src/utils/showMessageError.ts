import { AppError } from '@utils/AppError'
import { Toast } from 'native-base'

export function showMessageError(error: Error) {
  const isAppError = error instanceof AppError
  const id = 'isActive'
  const title = isAppError
    ? error.message
    : 'Não foi possível realizar essa ação, tente novamente mais tarde.'
  if (!Toast.isActive(id)) {
    Toast.show({
      id,
      title,
      placement: 'top',
      bgColor: 'red.600',
    })
  }
}
