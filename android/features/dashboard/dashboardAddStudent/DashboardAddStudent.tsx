import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';

const { height } = Dimensions.get('screen')

const DashboardAddStudent = () => {
  return (
    <View className="absolute bottom-5 left-0 right-0 flex items-center">
      <TouchableOpacity>
        <Image 
          source={require("@/assets/images/loginBackground.jpg")}
          className="h-20 w-20 rounded-full"
        />
      </TouchableOpacity>
    </View>
  );
}

export default DashboardAddStudent;
