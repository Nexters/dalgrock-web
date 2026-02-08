import { useState } from 'react'
import { useForm, FormProvider, useController } from 'react-hook-form'
import { AnimatePresence, motion } from 'motion/react'

import { Header } from '@/components/header'
import {
  MusicSearchStep,
  RecordDetailStep,
  RecordCompleteStep
} from './_components/funnels'

export interface Music {
  id: string
  title: string
  artist: string
  albumArt?: string
}

export interface RecordFormData {
  musics: Music[]
  emotions: string[]
  moment: string | null
  memo: string
  place: string
}

type FunnelStep = 'search' | 'detail' | 'complete'
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

  const handleSearchNext = () => {
    if (musicsField.value.length > 0) {
      setDirection('forward')
      setStep('detail')
      window.scrollTo(0, 0)
    }
  }

  const handleDetailNext = () => {
    setDirection('forward')
    setStep('complete')
    window.scrollTo(0, 0)
  }

  const handleDetailBack = () => {
    setDirection('backward')
    setStep('search')
  }

  const headerOnBack = step === 'detail' ? handleDetailBack : undefined

  return (
    <FormProvider {...methods}>
      <div className="flex min-h-dvh flex-col overflow-x-clip">
        <Header onBack={headerOnBack} />

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
                onNext={handleSearchNext}
              />
            </motion.div>
          )}

          {step === 'detail' && (
            <motion.div
              key="detail"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={SLIDE_TRANSITION}
              className="flex flex-1 flex-col">
              <RecordDetailStep
                musics={musicsField.value}
                onNext={handleDetailNext}
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
    </FormProvider>
  )
}

export { RecordNew }
