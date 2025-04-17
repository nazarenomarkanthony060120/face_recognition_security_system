import { FieldValue } from "firebase/firestore"

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
  createdAt: FieldValue
  updatedAt: FieldValue
}

export type User = {
  id: string
  type: UserType
  name: string
  status: UserStatusDB
  createdAt: FieldValue
  updatedAt: FieldValue
  email: string
  password: string
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
