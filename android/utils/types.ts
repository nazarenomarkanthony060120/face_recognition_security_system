export type UserIdRequest = {
  id: string | undefined
}

export type LoginRequest = {
  email: string
  password: string
}

export enum UserStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export enum UserType {
  USER = 'User',
  ADMIN = 'Admin',
}

export type RegisterParentType = {
  parentName: string
  email: string
  password: string
  confirmPassword: string
}
