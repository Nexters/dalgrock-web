import { queryOptions } from '@tanstack/react-query'

import { getReport } from '@/apis/generated/report/report'
import { getQueryKeyHelper } from '@/utils/query'

const { reportv1GetMonthlyReport, reportv1GetReportDetail } = getReport()

export const reportsQueries = {
  ...getQueryKeyHelper('reports'),

  getMonthlyReports: (params: { year: number; month: number }) =>
    queryOptions({
      queryKey: reportsQueries.detail('monthlyReports', params),
      queryFn: async () => {
        const { data } = await reportv1GetMonthlyReport(params)
        return data
      }
    }),

  getReportDetail: (reportId: number) =>
    queryOptions({
      queryKey: reportsQueries.detail('reportDetail', { reportId }),
      queryFn: async () => {
        const { data } = await reportv1GetReportDetail(reportId)
        return data
      },
      enabled: !!reportId
    })
}
