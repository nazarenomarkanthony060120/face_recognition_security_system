import React from 'react'
import { View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Text, PlatformPressable } from '@react-navigation/elements'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Icons } from '@/constants/icons'

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme()

  return (
    <View className="absolute bottom-0 flex-row justify-between bg-white items-center gap-3 shadow ">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <PlatformPressable
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 justify-center items-center rounded-3xl py-2 gap-1"
          >
            {Icons[route.name as keyof typeof Icons]?.({
              color: isFocused ? colors.primary : colors.text,
            })}
            <Text
              style={{
                color: isFocused ? colors.primary : colors.text,
                fontSize: 11,
              }}
            >
              {label as any}
            </Text>
          </PlatformPressable>
        )
      })}
    </View>
  )
}
