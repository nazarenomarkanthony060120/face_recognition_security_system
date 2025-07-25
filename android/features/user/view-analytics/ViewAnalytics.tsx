import React, { useState } from 'react'
import {
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { LineChart } from 'react-native-chart-kit'
import {
  useAttendanceAnalytics,
  formatDateForDisplay,
  getDateRangeOptions,
} from '@/hooks/common/useAttendanceAnalytics'
import { useFetchAllStudents } from '@/hooks/common/fetchStudentsById'
import { useAuth } from '@/context/auth'
import Typo from '@/components/typo'
import { LinearGradient } from 'expo-linear-gradient'

interface ViewAnalyticsProps {
  studentId: string | string[] | undefined
}

const ViewAnalytics = ({ studentId }: ViewAnalyticsProps) => {
  const auth = useAuth()
  const [selectedDateRange, setSelectedDateRange] = useState(30)
  const dateRangeOptions = getDateRangeOptions()

  // Get student data
  const { data: students } = useFetchAllStudents({ id: auth.user?.uid })
  const currentStudent = students?.find((student) => student.id === studentId)

  // Get analytics data
  const { totalIns, totalOuts, dailyData, isLoading, error } =
    useAttendanceAnalytics({ id: studentId as string }, selectedDateRange)

  const screenWidth = Dimensions.get('window').width

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gradient-to-br from-blue-900 to-purple-700">
        <ActivityIndicator size="large" color="#ffffff" />
        <Typo className="text-white mt-4">Loading analytics...</Typo>
      </View>
    )
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gradient-to-br from-blue-900 to-purple-700">
        <MaterialIcons name="error-outline" size={48} color="#ef4444" />
        <Typo className="text-red-400 mt-4 text-center">
          Error loading analytics data
        </Typo>
      </View>
    )
  }

  // Prepare chart data
  const chartData = {
    labels: dailyData.slice(-7).map((item) => formatDateForDisplay(item.date)), // Show last 7 days on chart
    datasets: [
      {
        data: dailyData.slice(-7).map((item) => item.ins),
        color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`, // Green for INs
        strokeWidth: 3,
      },
      {
        data: dailyData.slice(-7).map((item) => item.outs),
        color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`, // Red for OUTs
        strokeWidth: 3,
      },
    ],
    legend: ['Check INs', 'Check OUTs'],
  }

  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: 'transparent',
    backgroundGradientTo: 'transparent',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: 'rgba(255, 255, 255, 0.2)',
    },
  }

  return (
    <ScrollView
      className="flex-1 bg-gradient-to-br from-blue-900 to-purple-700"
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={['#1e3a8a', '#7c3aed']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <View className="p-5">
          {/* Header */}
          <View className="mb-6">
            <View className="flex-row items-center gap-3 mb-2">
              <View className="bg-white/20 p-3 rounded-full">
                <MaterialIcons name="analytics" size={24} color="#ffffff" />
              </View>
              <View className="flex-1">
                <Typo className="text-2xl text-white font-bold">
                  Attendance Analytics
                </Typo>
                <Typo className="text-gray-300">
                  {currentStudent?.name || 'Student Analytics'}
                </Typo>
              </View>
            </View>
          </View>

          {/* Date Range Filter */}
          <View className="mb-6">
            <Typo className="text-white font-semibold mb-3">Date Range</Typo>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {dateRangeOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => setSelectedDateRange(option.value)}
                    className={`px-4 py-2 rounded-full border ${
                      selectedDateRange === option.value
                        ? 'bg-white/20 border-white/40'
                        : 'bg-white/10 border-white/20'
                    }`}
                  >
                    <Typo
                      className={`${
                        selectedDateRange === option.value
                          ? 'text-white font-semibold'
                          : 'text-gray-300'
                      }`}
                    >
                      {option.label}
                    </Typo>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Summary Cards */}
          <View className="flex-row gap-4 mb-6">
            {/* Total INs Card */}
            <View className="flex-1 bg-green-500/20 p-4 rounded-2xl border border-green-500/30">
              <View className="flex-row items-center gap-3 mb-2">
                <View className="bg-green-500/30 p-2 rounded-full">
                  <MaterialIcons name="login" size={20} color="#22c55e" />
                </View>
                <Typo className="text-green-400 font-semibold">Check INs</Typo>
              </View>
              <Typo className="text-3xl text-white font-bold">{totalIns}</Typo>
              <Typo className="text-green-300 text-sm">
                Last {selectedDateRange} days
              </Typo>
            </View>

            {/* Total OUTs Card */}
            <View className="flex-1 bg-red-500/20 p-4 rounded-2xl border border-red-500/30">
              <View className="flex-row items-center gap-3 mb-2">
                <View className="bg-red-500/30 p-2 rounded-full">
                  <MaterialIcons name="logout" size={20} color="#ef4444" />
                </View>
                <Typo className="text-red-400 font-semibold">Check OUTs</Typo>
              </View>
              <Typo className="text-3xl text-white font-bold">{totalOuts}</Typo>
              <Typo className="text-red-300 text-sm">
                Last {selectedDateRange} days
              </Typo>
            </View>
          </View>

          {/* Line Chart */}
          <View className="bg-white/10 p-4 rounded-2xl border border-white/10 mb-6">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="bg-white/20 p-2 rounded-full">
                <MaterialIcons name="show-chart" size={20} color="#ffffff" />
              </View>
              <View>
                <Typo className="text-white font-semibold">
                  Daily Attendance Trend
                </Typo>
                <Typo className="text-gray-400 text-sm">Last 7 days</Typo>
              </View>
            </View>

            {dailyData.length > 0 ? (
              <View className="overflow-hidden rounded-xl">
                <LineChart
                  data={chartData}
                  width={screenWidth - 60}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                  withInnerLines={true}
                  withOuterLines={true}
                  withVerticalLabels={true}
                  withHorizontalLabels={true}
                  withDots={true}
                  withShadow={false}
                  fromZero={true}
                />
              </View>
            ) : (
              <View className="h-52 justify-center items-center">
                <MaterialIcons
                  name="trending-flat"
                  size={48}
                  color="rgba(255, 255, 255, 0.5)"
                />
                <Typo className="text-gray-400 mt-2">
                  No data available for chart
                </Typo>
              </View>
            )}
          </View>

          {/* Legend */}
          <View className="bg-white/10 p-4 rounded-2xl border border-white/10 mb-6">
            <Typo className="text-white font-semibold mb-3">Chart Legend</Typo>
            <View className="gap-3">
              <View className="flex-row items-center gap-3">
                <View className="w-4 h-1 bg-green-500 rounded-full"></View>
                <Typo className="text-gray-300">
                  Check INs - When student enters
                </Typo>
              </View>
              <View className="flex-row items-center gap-3">
                <View className="w-4 h-1 bg-red-500 rounded-full"></View>
                <Typo className="text-gray-300">
                  Check OUTs - When student exits
                </Typo>
              </View>
            </View>
          </View>

          {/* Additional Stats */}
          <View className="bg-white/10 p-4 rounded-2xl border border-white/10">
            <Typo className="text-white font-semibold mb-3">Quick Stats</Typo>
            <View className="gap-3">
              <View className="flex-row justify-between items-center">
                <Typo className="text-gray-300">Total Records</Typo>
                <Typo className="text-white font-semibold">
                  {totalIns + totalOuts}
                </Typo>
              </View>
              <View className="flex-row justify-between items-center">
                <Typo className="text-gray-300">Average INs per day</Typo>
                <Typo className="text-white font-semibold">
                  {selectedDateRange > 0
                    ? (totalIns / selectedDateRange).toFixed(1)
                    : '0'}
                </Typo>
              </View>
              <View className="flex-row justify-between items-center">
                <Typo className="text-gray-300">Average OUTs per day</Typo>
                <Typo className="text-white font-semibold">
                  {selectedDateRange > 0
                    ? (totalOuts / selectedDateRange).toFixed(1)
                    : '0'}
                </Typo>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  )
}

export default ViewAnalytics
