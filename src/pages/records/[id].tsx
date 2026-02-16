import { Header } from '@/components/header'
import { useParams } from 'react-router-dom'
import DeleteRecordButton from './_components/delete-record-button'
import { DetailSection } from './_components/detail-section'
import { MusicItem } from './_components/music-item'
import { Tag } from './_components/tag'

const DUMMY_MUSICS = [
  { id: '1', title: 'APT.', artist: '로제 & 브루노 마스' },
  { id: '2', title: 'Whiplash', artist: 'aespa' },
  { id: '3', title: 'HAPPY', artist: 'DAY6' }
]

function RecordDetail() {
  const { id } = useParams()

  const emotions = ['감동', '슬픔', '복잡미묘']
  const moments = ['출퇴근길', '운전 중']
  const memo = '오늘 하루는 인류애를 충전한 하루였다.'

  const handleClickEdit = () => {
    console.log('수정')
  }

  const handleDelete = () => {
    // TODO: 삭제 API 호출
    console.log('삭제 확인', id)
  }

  return (
    <div>
      <Header
        midChild={<p className="text-gray-0 text-lg">2월 11일(수)</p>}
        rightChild={<DeleteRecordButton onDelete={handleDelete} />}
      />

      <div className="p-5 flex flex-col gap-5">
        {/* Section 1 음악 */}
        <DetailSection
          label="기록한 음악"
          onEdit={handleClickEdit}>
          <div>
            {DUMMY_MUSICS.map(music => (
              <MusicItem
                key={music.id}
                {...music}
              />
            ))}
          </div>
        </DetailSection>

        {/* Section 2 감정 */}
        <DetailSection
          label="함께 느낀 감정"
          onEdit={handleClickEdit}>
          <div className="flex gap-2">
            {emotions.map(emotion => (
              <Tag
                key={emotion}
                label={emotion}
              />
            ))}
          </div>
        </DetailSection>

        {/* Section 3 내용 */}
        <DetailSection
          label="음악을 들은 순간"
          onEdit={handleClickEdit}>
          <div className="flex gap-2">
            {moments.map(moment => (
              <Tag
                key={moment}
                label={moment}
              />
            ))}
          </div>
        </DetailSection>

        {/* Section 4 메모 */}
        <DetailSection
          label="메모"
          onEdit={handleClickEdit}>
          <div>
            <p className="text-gray-0 text-sm">{memo}</p>
          </div>
        </DetailSection>
      </div>
    </div>
  )
}

export { RecordDetail }
