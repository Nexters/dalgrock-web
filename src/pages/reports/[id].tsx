import { useParams } from 'react-router-dom'

function ReportDetail() {
  const { id } = useParams()

  return (
    <div>
      <h1>리포트 상세 페이지</h1>
      <p>리포트 ID: {id}</p>
    </div>
  )
}

export { ReportDetail }
