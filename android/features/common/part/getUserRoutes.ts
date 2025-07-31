import { UserType } from '@/utils/types'

type GetUserRoutesType = {
  type: UserType | string
}

export const getUserRoutes = ({ type }: GetUserRoutesType) => {
  // Convert to string and normalize
  const typeString = String(type).trim()
  
  // Handle both the correct and misspelled enum values
  if (typeString === UserType.USER || typeString === 'User') {
    return '/screens/(user)/dashboard/dashboard'
  }
  
  if (typeString === UserType.ADMININISTRATOR || typeString === 'Administrator') {
    return '/screens/(admin)/dashboard/dashboard'
  }

  // Default to user dashboard for safety
  return '/screens/(user)/dashboard/dashboard'
}
