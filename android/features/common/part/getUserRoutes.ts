import { useAuth } from '@/context/auth'
import { UserType } from '@/utils/types'

type getUserRoutes = {
  type: UserType
}

export const getUserRoutes = (type: UserType) => {
  switch (type) {
    case UserType.USER:
      return '/screens/(user)/dashboard'

    default:
      return '/'
  }
}
