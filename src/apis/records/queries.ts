import { queryOptions } from '@tanstack/react-query'

import { getRecord } from '@/apis/generated/record/record'
import { getQueryKeyHelper } from '@/utils/query'

const {
  recordv1GetRecords,
  recordv1GetRecordDetail,
  recordv1GetMonthlyRecords
} = getRecord()

export const recordsQueries = {
  ...getQueryKeyHelper('records'),

  getWeeklySlotRecords: () =>
    queryOptions({
      queryKey: recordsQueries.detail('weeklySlotRecords'),
      queryFn: async () => {
        const { data } = await recordv1GetRecords()
        return data
      }
    }),

  getMonthlyRecords: (params: { year: number; month: number }) =>
    queryOptions({
      queryKey: recordsQueries.detail('monthlyRecords', params),
      queryFn: async () => {
        const { data } = await recordv1GetMonthlyRecords(params)
        return data
      }
    }),

  getRecordDetail: (recordId: number) =>
    queryOptions({
      queryKey: recordsQueries.detail('recordDetail', { recordId }),
      queryFn: async () => {
        const { data } = await recordv1GetRecordDetail(recordId)
        return data
      },
      enabled: !!recordId
    })
}
