import { useState } from 'react'
import { useForm, FormProvider, useController } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'motion/react'
import { toast } from 'sonner'

import { Header } from '@/components/header'
import {
  MusicSearchStep,
  EmotionSelectStep,
  MemoStep
} from '../_components/steps'
import { RecordCompleteStep } from '../_components/steps'
import { getRecord } from '@/apis/generated/record/record'
import { recordsQueries } from '@/apis/records/queries'
import type { CreateRecordRequest } from '@/apis/generated/models'
import type { Music, RecordFormData } from '@/types/record'

const { recordv1CreateRecord } = getRecord()

type FunnelStep = 'search' | 'emotion' | 'memo' | 'complete'
type Direction = 'forward' | 'backward'

const SLIDE_TRANSITION = {
  type: 'tween' as const,
  ease: 'easeInOut' as const,
  duration: 0.25
}
const FADE_TRANSITION = {
  type: 'tween' as const,
  ease: 'easeInOut' as const,
  duration: 0.3
}

const slideVariants = {
  enter: (direction: Direction) => ({
    x: direction === 'forward' ? '100%' : '-100%',
    opacity: 0
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: Direction) => ({
    x: direction === 'forward' ? '-100%' : '100%',
    opacity: 0
  })
}

const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 }
}

function RecordNew() {
  const [step, setStep] = useState<FunnelStep>('search')
  const [direction, setDirection] = useState<Direction>('forward')

  const methods = useForm<RecordFormData>({
    defaultValues: {
      musics: [],
      emotions: [],
      moment: null,
      memo: '',
      place: ''
    }
  })

  const { field: musicsField } = useController({
    name: 'musics',
    control: methods.control
  })

  const handleMusicToggle = (music: Music) => {
    const isSelected = musicsField.value.some(m => m.id === music.id)

    if (isSelected) {
      musicsField.onChange(musicsField.value.filter(m => m.id !== music.id))
    } else {
      musicsField.onChange([...musicsField.value, music])
    }
  }

  const navigate = (target: FunnelStep, dir: Direction) => {
    setDirection(dir)
    setStep(target)
    if (dir === 'forward') window.scrollTo(0, 0)
  }

  const queryClient = useQueryClient()

  const { mutate: createRecordMutate, isPending: isCreatePending } =
    useMutation({
      mutationFn: (request: CreateRecordRequest) =>
        recordv1CreateRecord(request),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: recordsQueries.all })
        navigate('complete', 'forward')
      },
      onError: () => {
        toast.error('기록 저장에 실패했습니다')
      }
    })

  const handleRecordSubmit = () => {
    const formData = methods.getValues()

    const request: CreateRecordRequest = {
      musics: formData.musics.map(({ title, artist, albumArt, genre }) => ({
        title,
        artist,
        thumbnail: albumArt,
        genre
      })),
      emotions: formData.emotions,
      content: formData.memo || undefined,
      situations: formData.moment ? [formData.moment] : undefined,
      location: formData.place || undefined
    }

    createRecordMutate(request)
  }

  const handleSearchNext = () => {
    if (musicsField.value.length > 0) navigate('emotion', 'forward')
  }

  const headerOnBack = (() => {
    if (step === 'emotion') return () => navigate('search', 'backward')
    if (step === 'memo') return () => navigate('emotion', 'backward')
    return undefined
  })()

  return (
    <FormProvider {...methods}>
      <div className="flex min-h-dvh flex-col">
        <Header onBack={headerOnBack} />

        <div className="relative flex flex-1 flex-col overflow-x-clip">
          <AnimatePresence
            mode="popLayout"
            initial={false}
            custom={direction}>
            {step === 'search' && (
              <motion.div
                key="search"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={SLIDE_TRANSITION}
                className="flex flex-1 flex-col">
                <MusicSearchStep
                  selectedMusics={musicsField.value}
                  onMusicToggle={handleMusicToggle}
                  onComplete={handleSearchNext}
                />
              </motion.div>
            )}

            {step === 'emotion' && (
              <motion.div
                key="emotion"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={SLIDE_TRANSITION}
                className="flex flex-1 flex-col">
                <EmotionSelectStep
                  onComplete={() => navigate('memo', 'forward')}
                  onBack={() => navigate('search', 'backward')}
                />
              </motion.div>
            )}

            {step === 'memo' && (
              <motion.div
                key="memo"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={SLIDE_TRANSITION}
                className="flex flex-1 flex-col">
                <MemoStep
                  onComplete={handleRecordSubmit}
                  isPending={isCreatePending}
                />
              </motion.div>
            )}

            {step === 'complete' && (
              <motion.div
                key="complete"
                variants={fadeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={FADE_TRANSITION}
                className="flex flex-1 flex-col">
                <RecordCompleteStep />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </FormProvider>
  )
}

export { RecordNew }
