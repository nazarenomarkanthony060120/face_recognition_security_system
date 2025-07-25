import { useMemo } from 'react'
import { fetchStudentHistoryById } from './fetchStudentHistoryById'
import { HistoryStatus, UserIdRequest } from '@/utils/types'

export interface DailyAttendanceData {
  date: string
  ins: number
  outs: number
}

export interface AttendanceAnalytics {
  totalIns: number
  totalOuts: number
  dailyData: DailyAttendanceData[]
  isLoading: boolean
  error: any
}

export const useAttendanceAnalytics = (
  { id }: UserIdRequest,
  dateRange: number = 30 // Default to last 30 days
): AttendanceAnalytics => {
  const { data: historyData, isLoading, error } = fetchStudentHistoryById({ id })

  const analytics = useMemo(() => {
    if (!historyData || historyData.length === 0) {
      return {
        totalIns: 0,
        totalOuts: 0,
        dailyData: [],
      }
    }

    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - dateRange)

    // Filter data within date range
    const filteredData = historyData.filter(record => {
      try {
        const timestamp = record.timestamp as any
        const recordDate = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp)
        return recordDate >= startDate && recordDate <= endDate
      } catch (error) {
        console.error('Error parsing timestamp:', error)
        return false
      }
    })

    // Calculate total counts
    const totalIns = filteredData.filter(record => record.status === HistoryStatus.IN).length
    const totalOuts = filteredData.filter(record => record.status === HistoryStatus.OUT).length

    // Group data by day and count INs/OUTs
    const dailyMap = new Map<string, { ins: number; outs: number }>()

    // Initialize all dates in range with zero counts
    for (let i = 0; i < dateRange; i++) {
      const date = new Date()
      date.setDate(endDate.getDate() - i)
      const dateKey = date.toISOString().split('T')[0] // YYYY-MM-DD format
      dailyMap.set(dateKey, { ins: 0, outs: 0 })
    }

    // Count actual attendance records
    filteredData.forEach(record => {
      try {
        const timestamp = record.timestamp as any
        const recordDate = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp)
        const dateKey = recordDate.toISOString().split('T')[0]

        const existing = dailyMap.get(dateKey) || { ins: 0, outs: 0 }

        if (record.status === HistoryStatus.IN) {
          existing.ins += 1
        } else if (record.status === HistoryStatus.OUT) {
          existing.outs += 1
        }

        dailyMap.set(dateKey, existing)
      } catch (error) {
        console.error('Error processing record:', error)
      }
    })

    // Convert to array and sort by date (oldest to newest for chart)
    const dailyData: DailyAttendanceData[] = Array.from(dailyMap.entries())
      .map(([date, counts]) => ({
        date,
        ins: counts.ins,
        outs: counts.outs,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))

    return {
      totalIns,
      totalOuts,
      dailyData,
    }
  }, [historyData, dateRange])

  return {
    ...analytics,
    isLoading,
    error,
  }
}

// Utility function to format date for display
export const formatDateForDisplay = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  } catch (error) {
    return dateString
  }
}

// Utility function to get date range options
export const getDateRangeOptions = () => [
  { label: 'Last 7 days', value: 7 },
  { label: 'Last 14 days', value: 14 },
  { label: 'Last 30 days', value: 30 },
  { label: 'Last 60 days', value: 60 },
] 