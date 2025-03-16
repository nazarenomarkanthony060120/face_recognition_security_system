import { View, Image, Dimensions, Text, Alert } from "react-native"
import React, { useState } from "react"
import { StatusBar } from "expo-status-bar"
import Input from "@/components/input"
import Button from "@/components/button"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"
import Icon from "@/components/icon"
import { useLogin } from "@/hooks"

const { width, height } = Dimensions.get("window")

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending, error, isSuccess } = useLogin()

  const handleLogin = () => {
    console.log(11111111111)
    login(
      { email, password },
      {
        onSuccess: (user) => Alert.alert("Login Successful", `Welcome ${user.email}`),
        onError: (err) => Alert.alert("Login Failed", err.message),
      }
    )
  }

  return (
    <View className="h-screen w-full pt-52">
      <StatusBar backgroundColor="white" style="inverted"></StatusBar>
      <Image
        className={'absolute w-full h-full'}
        source={require("../../assets/images/loginBackground.jpg")}
        style={{ width: width, height: height + 50 }}
      />

      <Animated.View entering={FadeInDown.delay(500).duration(1500).damping(1).springify()} className="flex-row justify-around items-center absolute w-full">
        <Image className="h-[225px] w-[90px]" 
          resizeMode="contain"
          source={require("../../assets/images/light.png")}
        />
        <Image className="h-[165px] w-[80px]" 
          resizeMode="contain"
          source={require("../../assets/images/light.png")}
        />
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(600).duration(500).damping(1).springify()} className="pt-28 flex items-center px-5 gap-2">
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
          Login
        </Text>
        <Input className=" w-full placeholder:text-slate-400" placeholder="Enter Email" value={email} onChangeText={(value) => { setEmail(value) }}></Input>
        <Input className=" w-full placeholder:text-slate-400" placeholder="Enter Password" value={password} onChangeText={(value) => { setPassword(value) }} secureTextEntry></Input>
        <Button className="uppercase font-[18]" onPress={handleLogin} loading={isPending}>Login</Button>
        <Text>{error && <Text style={{ color: "red" }}>{error.message}</Text>}</Text>
        <Text>{isSuccess && <Text style={{ color: "green" }}>Login Successful</Text>}</Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(700).duration(500).damping(1).springify()} className="mt-10 flex items-center px-5 gap-2">
        <Text className="text-2xl">or</Text>
        <View className="flex-row gap-4 mt-4">
          <Icon className="p-3 bg-white rounded-full" name={'google'} size={24} color="red"/>
          <Icon className="p-3 bg-white rounded-full" name={'facebook-square'} size={24} color="blue"/>
          <Icon className="p-3 bg-white rounded-full" name={'linkedin-square'} size={24} color="blue"/>
        </View>
      </Animated.View>
    </View>
  )
}

export default login
