const INVALID_CREDENTIAL_ERROR = 'Firebase: Error (auth/invalid-credential).'
export const getErrorMessage = (errorCode: String) => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email'
    case INVALID_CREDENTIAL_ERROR:
      return 'Email not found or Incorrect Password'
    case 'auth/invalid-email':
      return 'Invalid email address'
    default:
      return 'Something went wrong'
  }
}
