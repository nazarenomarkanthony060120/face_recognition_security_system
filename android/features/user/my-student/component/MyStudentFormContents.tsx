import { View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { HistoryStatusText, Student } from '@/utils/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/typo'
import { MaterialIcons } from '@expo/vector-icons'
import { fetchStudentHistoryById } from '@/hooks/common/fetchStudentHistoryById'
import { getHistoryStatus } from '@/features/common/part/getHistoryStatus'
import { Timestamp } from 'firebase/firestore'
import { createdAtFormatted } from '@/features/common/part/getCreatedAtFormatted'
import { getTimeFormatted } from '@/features/common/part/getTimeFormatted'

interface MyStudentFormContentsProps {
  student: Student | null | undefined
}

const MyStudentFormContents = ({ student }: MyStudentFormContentsProps) => {
  if (!student) return null

  const { data: fetchHistory, isLoading } = fetchStudentHistoryById({
    id: student.id,
  })

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Calculate pagination
  const totalItems = fetchHistory?.length || 0
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = fetchHistory?.slice(startIndex, endIndex) || []

  // Navigation functions
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const changeItemsPerPage = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-white/10 p-4 rounded-xl border border-white/10">
        <View className="flex-row items-center gap-4 mb-4">
          <View className="bg-white/20 p-3 rounded-full">
            <MaterialIcons name="badge" size={24} color="#ffffff" />
          </View>
          <View>
            <Typo className="text-lg font-bold text-white">{student.name}</Typo>
            <Typo className="text-sm text-gray-400">{student.studentId}</Typo>
          </View>
        </View>

        <View className="flex-row items-center gap-4 mb-6">
          <View className="bg-white/20 p-3 rounded-full">
            <MaterialIcons name="school" size={24} color="#ffffff" />
          </View>
          <View>
            <Typo className="text-lg font-bold text-white">
              Grade & Section
            </Typo>
            <Typo className="text-sm text-gray-400">
              {student.gradeSection}
            </Typo>
          </View>
        </View>

        {/* Attendance History Section */}
        <View className="mt-4">
          <View className="flex-row items-center gap-3 mb-4">
            <View className="bg-white/20 p-3 rounded-full">
              <MaterialIcons name="history" size={24} color="#ffffff" />
            </View>
            <View>
              <Typo className="text-lg font-bold text-white">
                Attendance History
              </Typo>
              <Typo className="text-sm text-gray-400">
                Recent attendance records
              </Typo>
            </View>
          </View>

          <View className="gap-3">
            {fetchHistory?.length === 0 && (
              <Typo className="text-sm text-gray-400">
                No attendance records found
              </Typo>
            )}
            {currentItems.map((record, index) => (
              <View
                key={index}
                className="bg-white/10 p-4 rounded-xl border border-white/10"
              >
                {/* Header Row */}
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center gap-3">
                    <View className="bg-white/20 p-2 rounded-full">
                      <MaterialIcons
                        name={
                          getHistoryStatus({ status: record.status }) ===
                          HistoryStatusText.IN
                            ? 'login'
                            : 'logout'
                        }
                        size={20}
                        color={
                          getHistoryStatus({ status: record.status }) ===
                          HistoryStatusText.IN
                            ? '#4ade80'
                            : '#eb4034'
                        }
                      />
                    </View>
                    <View>
                      <Typo className="text-white font-medium">
                        {getHistoryStatus({ status: record.status })}
                      </Typo>
                      <Typo className="text-sm text-white">
                        {getTimeFormatted(
                          record.timestamp as unknown as Timestamp,
                        )}
                      </Typo>
                    </View>
                  </View>
                  <View className="bg-white/10 px-3 py-1 rounded-full">
                    <Typo className="text-sm text-white">
                      {createdAtFormatted(
                        record.timestamp as unknown as Timestamp,
                      )}
                    </Typo>
                  </View>
                </View>

                {/* Details Row */}
                <View className="flex-row items-center gap-4 ml-12">
                  <View className="flex-row items-center gap-2">
                    <MaterialIcons
                      name="location-on"
                      size={16}
                      color="#ffffff80"
                    />
                    <Typo className="text-sm text-white/80">Main Gate</Typo>
                  </View>
                </View>
              </View>
            ))}

            {/* Pagination Controls */}
            {fetchHistory && fetchHistory.length > 0 && (
              <View className="mt-6">
                {/* Items per page selector */}
                <View className="flex-col items-start justify-between mb-4">
                  <View className="flex-row items-center gap-2">
                    <Typo className="text-sm text-gray-400">Show:</Typo>
                    <View className="flex-row bg-white/10 rounded-lg border border-white/10">
                      {[10, 20, 30].map((size) => (
                        <TouchableOpacity
                          key={size}
                          className={`px-3 py-1 ${
                            itemsPerPage === size
                              ? 'bg-white/20'
                              : 'bg-transparent'
                          }`}
                          onPress={() => changeItemsPerPage(size)}
                        >
                          <Typo
                            className={`text-sm ${
                              itemsPerPage === size
                                ? 'text-white'
                                : 'text-gray-400'
                            }`}
                          >
                            {size}
                          </Typo>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  <Typo className="text-sm text-gray-400">
                    {startIndex + 1}-{Math.min(endIndex, totalItems)} of{' '}
                    {totalItems} records
                  </Typo>
                </View>

                {/* Navigation buttons */}
                <View className="flex-row items-center justify-between">
                  <TouchableOpacity
                    className="flex-row items-center gap-2"
                    onPress={goToPrevPage}
                    disabled={currentPage <= 1}
                  >
                    <View
                      className={`p-2 rounded-lg border ${
                        currentPage > 1
                          ? 'bg-white/10 border-white/10'
                          : 'bg-white/5 border-white/5'
                      }`}
                    >
                      <MaterialIcons
                        name="chevron-left"
                        size={20}
                        color={currentPage > 1 ? '#ffffff' : '#ffffff40'}
                      />
                    </View>
                    <Typo
                      className={`text-sm ${
                        currentPage > 1 ? 'text-white' : 'text-gray-800'
                      }`}
                    >
                      Previous
                    </Typo>
                  </TouchableOpacity>

                  <View className="flex-row items-center gap-2">
                    <Typo className="text-sm text-gray-400">
                      Page {currentPage} of {totalPages}
                    </Typo>
                  </View>

                  <TouchableOpacity
                    className="flex-row items-center gap-2"
                    onPress={goToNextPage}
                    disabled={currentPage >= totalPages}
                  >
                    <Typo
                      className={`text-sm ${
                        currentPage < totalPages
                          ? 'text-white'
                          : 'text-gray-800'
                      }`}
                    >
                      Next
                    </Typo>
                    <View
                      className={`p-2 rounded-lg border ${
                        currentPage < totalPages
                          ? 'bg-white/10 border-white/10'
                          : 'bg-white/5 border-white/5'
                      }`}
                    >
                      <MaterialIcons
                        name="chevron-right"
                        size={20}
                        color={
                          currentPage < totalPages ? '#ffffff' : '#ffffff40'
                        }
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MyStudentFormContents
