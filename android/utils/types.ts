export type UserIdRequest = {
  id: string | undefined
}

export type LoginRequest = {
  email: string
  password: string
}

export enum UserStatusDB {
  ACTIVE = 1,
  INACTIVE = 0,
}

export enum UserStatusValue {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  UNKNOWN = 'Unknown',
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

export type ParentType = {
  id: string
  name: string
  email: string
  password: string
  status: UserStatusValue
  type: UserType
  createdAt: string
  updatedAt: string
}

export type AddStudent = {
  userId: string
  studentId: string
  name: string
  gradeSection: string
}
