
import React from 'react'
import { Text } from 'react-native'
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form'
import { useLogin } from '@/hooks/login'
import Animated, { FadeInUp } from 'react-native-reanimated'
import Input from '@/components/input'
import Button from "@/components/button"
import { LoginRequest } from '@/utils/types'


const LoginController = () => {
  const { control, handleSubmit } = useForm()
  const { mutate: login, error, isSuccess, isPending } = useLogin()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    login(data as LoginRequest)
  }
  
  return (
    <Animated.View entering={FadeInUp.delay(600).duration(500).damping(1).springify()} className="pt-28 flex items-center px-5 gap-2">
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>Login</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email is required' }}
        render={({ field: { onChange, value } }) => (
          <Input className=" w-full placeholder:text-slate-400" placeholder="Enter Email" value={value} onChangeText={onChange}></Input>
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password is required' }}
        render={({ field: { onChange, value } }) => (
          <Input className=" w-full placeholder:text-slate-400" placeholder="Enter Password"value={value} onChangeText={onChange} secureTextEntry></Input>
        )}
      />
      <Button className="uppercase font-[18]" onPress={handleSubmit(onSubmit)} loading={isPending}>Login</Button>
      <Text>{error && <Text style={{ color: "red" }}>{error.message}</Text>}</Text>
      <Text>{isSuccess && <Text style={{ color: "green" }}>Login Successful</Text>}</Text>
    </Animated.View>
  )
}

export default LoginController