import { FieldValue } from 'firebase/firestore'

export type UserIdRequest = {
  id: string | undefined | null
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
  ADMININISTRATOR = 'Administrator',
}

export type RegisterParentType = {
  parentName: string
  phoneNumber: string
  status: string
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
  createdAt: FieldValue
  updatedAt: FieldValue
}

export type User = {
  id: string
  phoneNumber: string
  address: string
  type: UserType
  name: string
  status: UserStatusDB
  createdAt: FieldValue
  updatedAt: FieldValue
  email: string
}

export type Student = {
  id: string
  studentId: string
  parentId: string
  name: string
  gradeSection: string
  createdAt: FieldValue
  updatedAt: FieldValue
}

export type AddStudent = {
  id: string
  studentId: string
  name: string
  gradeSection: string
}

export enum HistoryStatusText {
  IN = 'In',
  OUT = 'Out',
  UNKNOWN = 'Unknown',
}

export enum HistoryStatus {
  IN = 1,
  OUT = 2,
  UNKNOWN = 0,
}

export type History = {
  id: string
  studentId: string
  status: HistoryStatus
  timestamp: FieldValue
}

// String declared
export type AuthErrorType =
  | String
  | 'No account found with this email'
  | 'Invalid password'
  | 'Invalid email address'
