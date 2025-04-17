import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/typo'

interface HistoryListsProps {
  id: string | undefined
}

const HistoryLists = ({ id }: HistoryListsProps) => {
  return (
    <SafeAreaView className="mt-6 p-2 bg-slate-100">
      <Typo className="text-lg text-slate-700 font-semibold">History</Typo>
    </SafeAreaView>
  )
}

export default HistoryLists
