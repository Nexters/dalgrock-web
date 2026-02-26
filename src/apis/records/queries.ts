import { queryOptions } from '@tanstack/react-query'

import { getRecord } from '@/apis/generated/record/record'
import { getWeekly } from '@/apis/generated/weekly/weekly'
import { getQueryKeyHelper } from '@/utils/query'

const { recordv1GetRecords, recordv1GetRecordDetail } = getRecord()
const { weeklyv1GetWeeklyRecords } = getWeekly()

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

  getMonthlyWeeklyRecords: (params: { year: number; month: number }) =>
    queryOptions({
      queryKey: recordsQueries.detail('monthlyWeeklyRecords', params),
      queryFn: async () => {
        const { data } = await weeklyv1GetWeeklyRecords(params)
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
