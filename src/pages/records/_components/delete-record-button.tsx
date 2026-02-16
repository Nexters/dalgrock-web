import { useState } from 'react'
import {
  ConfirmDialog,
  ConfirmDialogContent,
  ConfirmDialogTitle,
  ConfirmDialogDescription,
  ConfirmDialogFooter,
  ConfirmDialogConfirm,
  ConfirmDialogCancel
} from '@/components/confirm-dialog'
import { TrashIcon } from 'lucide-react'

interface DeleteRecordButtonProps {
  onDelete: () => void
}

function DeleteRecordButton({ onDelete }: DeleteRecordButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(true)
  }

  return (
    <>
      <button
        className="mr-2 h-12 w-12 flex items-center justify-center text-gray-0"
        onClick={handleClick}>
        <TrashIcon />
      </button>

      <ConfirmDialog
        open={isOpen}
        onOpenChange={setIsOpen}>
        <ConfirmDialogContent className="pt-6 pb-4 px-4 gap-1">
          <ConfirmDialogTitle>기록을 삭제하시겠어요?</ConfirmDialogTitle>
          <ConfirmDialogDescription>
            삭제된 기록은 복구할 수 없어요.
          </ConfirmDialogDescription>
          <ConfirmDialogFooter className="mt-4">
            <ConfirmDialogCancel>아니오</ConfirmDialogCancel>
            <ConfirmDialogConfirm onClick={onDelete}>네</ConfirmDialogConfirm>
          </ConfirmDialogFooter>
        </ConfirmDialogContent>
      </ConfirmDialog>
    </>
  )
}

export default DeleteRecordButton
