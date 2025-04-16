import { View, Text } from 'react-native'
import React from 'react'
import { FieldErrors, FieldValues } from 'react-hook-form'

interface ErrorProps {
  errors: FieldErrors<FieldValues>
}

const Error = ({ errors }: ErrorProps) => {
  return (
    <View>
      {Object.keys(errors).length > 0 && (
        <View>
          {Object.entries(errors).map(([key, value]) => (
            <Text key={key} className="text-red-500">
              {value?.message as any}
            </Text>
          ))}
        </View>
      )}
    </View>
  )
}

export default Error
