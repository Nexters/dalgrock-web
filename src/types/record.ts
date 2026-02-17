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
