import { useParams } from 'react-router-dom'

function RecordDetail() {
  const { id } = useParams()

  return (
    <div>
      <h1>기록 상세 페이지</h1>
      <p>기록 ID: {id}</p>
    </div>
  )
}

export { RecordDetail }
