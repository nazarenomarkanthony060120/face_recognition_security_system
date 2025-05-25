import { HistoryStatus, HistoryStatusText } from "@/utils/types"

type GetHistoryStatusType = {
    status: HistoryStatus
}

export const getHistoryStatus = ({ status }: GetHistoryStatusType) => {
    switch (status) {
        case HistoryStatus.IN:
            return HistoryStatusText.IN
        case HistoryStatus.OUT:
            return HistoryStatusText.OUT
        default:
            return HistoryStatusText.UNKNOWN
    }
}