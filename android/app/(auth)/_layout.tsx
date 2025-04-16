import { verifyInstallation } from 'nativewind'
import { useAuth } from '@/context/auth'

const RootLayout = () => {
  const auth = useAuth()

  verifyInstallation()
}

export default RootLayout
