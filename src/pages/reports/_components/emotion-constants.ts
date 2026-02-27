import blueTop from '@/assets/gradientImgs/blue-top.png'
import blueMiddle from '@/assets/gradientImgs/blue-middle.png'
import yellowTop from '@/assets/gradientImgs/yellow-top.png'
import yellowMiddle from '@/assets/gradientImgs/yellow-middle.png'
import redTop from '@/assets/gradientImgs/red-top.png'
import redMiddle from '@/assets/gradientImgs/red-middle.png'
import purpleTop from '@/assets/gradientImgs/purple-top.png'
import purpleMiddle from '@/assets/gradientImgs/purple-middle.png'
import greenTop from '@/assets/gradientImgs/green-top.png'
import greenMiddle from '@/assets/gradientImgs/green-middle.png'

export const EMOTION_CATEGORIES = {
  exciting: {
    label: '들뜬',
    color: '#F59E0B',
    emotions: ['행복', '설렘', '신남', '뿌듯함', '감동'],
    backgroundTop: yellowTop,
    backgroundMiddle: yellowMiddle
  },
  calm: {
    label: '가라앉은',
    color: '#3B82F6',
    emotions: ['우울', '그리움', '외로움', '권태', '허무', '피곤', '후회'],
    backgroundTop: blueTop,
    backgroundMiddle: blueMiddle
  },
  sharp: {
    label: '날카로운',
    color: '#EF4444',
    emotions: ['분노', '불안', '긴장', '질투'],
    backgroundTop: redTop,
    backgroundMiddle: redMiddle
  },
  complex: {
    label: '복합적인',
    color: '#10B981',
    emotions: ['사랑', '복잡미묘'],
    backgroundTop: purpleTop,
    backgroundMiddle: purpleMiddle
  },
  warm: {
    label: '따뜻한',
    color: '#8B5CF6',
    emotions: ['감사'],
    backgroundTop: greenTop,
    backgroundMiddle: greenMiddle
  }
} as const

export type EmotionCategory = keyof typeof EMOTION_CATEGORIES

export function getEmotionColor(emotion: string): string {
  for (const category of Object.values(EMOTION_CATEGORIES)) {
    if ((category.emotions as readonly string[]).includes(emotion)) {
      return category.color
    }
  }
  return '#6B7280'
}

export function getEmotionCategory(emotion: string): EmotionCategory | null {
  for (const [key, category] of Object.entries(EMOTION_CATEGORIES)) {
    if ((category.emotions as readonly string[]).includes(emotion)) {
      return key as EmotionCategory
    }
  }
  return null
}

export function getMostFrequentCategory(
  weekData: {
    emotions: string[]
  }[]
): EmotionCategory | null {
  const allEmotions = weekData.flatMap(day => day.emotions)

  if (allEmotions.length === 0) return null

  const categoryCounts: Record<string, number> = {}

  allEmotions.forEach(emotion => {
    const category = getEmotionCategory(emotion)
    if (category) {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1
    }
  })

  const maxCount = Math.max(...Object.values(categoryCounts))
  const topCategories = Object.entries(categoryCounts)
    .filter(([, count]) => count === maxCount)
    .map(([category]) => category)

  if (topCategories.length > 1) {
    for (let i = allEmotions.length - 1; i >= 0; i--) {
      const category = getEmotionCategory(allEmotions[i])
      if (category && topCategories.includes(category)) {
        return category as EmotionCategory
      }
    }
  }

  return topCategories[0] as EmotionCategory
}
