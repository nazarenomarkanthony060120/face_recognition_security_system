import { UserStatusDB, UserStatusValue } from "@/utils/types"

export const getUserStatus = (status: number) => {
  switch (status) {
    case UserStatusDB.ACTIVE:
      return UserStatusValue.ACTIVE
    case UserStatusDB.INACTIVE:
      return UserStatusValue.INACTIVE
    default:
      return UserStatusValue.UNKNOWN
  }
}