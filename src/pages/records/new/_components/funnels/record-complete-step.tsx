import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function RecordCompleteStep() {
  const navigate = useNavigate()

  const handleConfirm = () => {
    navigate('/records')
  }

  return (
    <>
      <section className="flex flex-1 flex-col items-center px-5 pt-10 pb-6">
        {/* 완료 메시지 */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <h1 className="text-xl font-bold text-white">기록이 완료되었어요!</h1>
        </div>

        <div className="text-5xl">🎵</div>
      </section>

      {/* 하단 버튼 */}
      <div className="sticky bottom-0 pt-3 px-5 pb-8 flex gap-4">
        <Button className="h-[52px] w-[118px]">닫기</Button>

        <Button
          variant="primary"
          className="h-[52px] flex-1"
          size="lg"
          onClick={handleConfirm}>
          기록 확인하기
        </Button>
      </div>
    </>
  )
}
