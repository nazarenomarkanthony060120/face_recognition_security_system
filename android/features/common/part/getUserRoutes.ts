import { UserType } from '@/utils/types'

type GetUserRoutesType = {
  type: UserType
}

export const getUserRoutes = ({ type }: GetUserRoutesType) => {
  switch (type) {
    case UserType.USER:
      return '/screens/(user)/dashboard/dashboard'
    case UserType.ADMININISTRATOR:
      return '/screens/(admin)/dashboard/dashboard'
    default:
      return '/screens/(user)/dashboard/dashboard'
  }
}
