import React from 'react'
import LoginLayout from './components/LoginLayout'
import LoginController from './components/LoginFormCard'

const Login = () => {
  return (
    <LoginLayout className="flex-1 justify-between px-5 bg-slate-800">
      <LoginController />
    </LoginLayout>
  )
}

export default Login
