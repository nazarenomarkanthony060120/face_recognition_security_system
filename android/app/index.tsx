import { View, Image, Dimensions, Text, TextInput } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import '../global.css'
import Input from "@/components/input";

const { width, height } = Dimensions.get("window");

const Index = () => {
  return (
    <View className="h-full w-full pt-52">
      <StatusBar backgroundColor="white" style="inverted"></StatusBar>
      <Image
        className={'absolute w-full h-full'}
        source={require("../assets/images/loginBackground.jpg")}
        style={{ width: width, height: height + 50 }}
      />

      <View className="flex-row justify-around items-center absolute w-full">
        <Image className="h-[225px] w-[90px]" 
          resizeMode="contain"
          source={require("../assets/images/light.png")}
        />
        <Image className="h-[155px] w-[40px]" 
          resizeMode="contain"
          source={require("../assets/images/light.png")}
        />
      </View>

      <View className="pt-40 flex items-center px-5 ">
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
          Login
        </Text>
        <Input />
      </View>
    </View>
  );
};

export default Index;
