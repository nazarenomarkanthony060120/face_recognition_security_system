import { UserType } from '@/utils/types'

type getUserRoutes = {
  type: UserType
}

export const getUserRoutes = (type: UserType) => {
  switch (type) {
    case UserType.USER:
      return '/screens/(user)/dashboard/dashboard'
    case UserType.ADMIN:
      return '/screens/(admin)/dashboard/dashboard'
    default:
      return '/screens/(user)/dashboard/dashboard'
  }
}
