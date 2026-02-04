import { useState } from 'react'
import { useForm, FormProvider, useController } from 'react-hook-form'

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

function RecordNew() {
  const [step, setStep] = useState<FunnelStep>('search')

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
      setStep('detail')
    }
  }

  const handleDetailNext = () => {
    setStep('complete')
  }

  const handleDetailBack = () => {
    setStep('search')
  }

  return (
    <FormProvider {...methods}>
      {step === 'search' && (
        <MusicSearchStep
          selectedMusics={musicsField.value}
          onMusicToggle={handleMusicToggle}
          onNext={handleSearchNext}
        />
      )}

      {step === 'detail' && (
        <RecordDetailStep
          musics={musicsField.value}
          onBack={handleDetailBack}
          onNext={handleDetailNext}
        />
      )}

      {step === 'complete' && <RecordCompleteStep />}
    </FormProvider>
  )
}

export { RecordNew }
