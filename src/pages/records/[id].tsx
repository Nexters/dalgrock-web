import { Header } from '@/components/header'
import { useParams } from 'react-router-dom'

function RecordDetail() {
  const { id } = useParams()

  const handleClickEdit = () => {
    console.log('수정')
  }

  const handleClickDelete = () => {
    console.log('삭제')
  }

  return (
    <div>
      <Header />

      <div className="flex items-center justify-between">
        <p>1월 18일 토요일</p>

        <div className="flex items-center gap-2">
          <button onClick={handleClickEdit}>수정</button>
          <button onClick={handleClickDelete}>삭제</button>
        </div>
      </div>

      {/* Section 1 음악 */}

      {/* Section 2 감정 */}

      {/* Section 3 내용 */}

      {/* Section 4 상황 */}

      {/* Section 5 장소 */}
    </div>
  )
}

export { RecordDetail }
