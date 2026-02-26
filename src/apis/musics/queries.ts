import { queryOptions } from '@tanstack/react-query'

import { getMusic } from '@/apis/generated/music/music'
import { getQueryKeyHelper } from '@/utils/query'
import type { Music } from '@/types/record'

const { musicv1SearchMusic } = getMusic()

export const musicsQueries = {
  ...getQueryKeyHelper('musics'),

  searchMusics: (keyword: string) =>
    queryOptions({
      queryKey: musicsQueries.detail('search', { keyword }),
      queryFn: async (): Promise<Music[]> => {
        const { data } = await musicv1SearchMusic({ keyword })
        return data.map(item => ({
          id: item.spotifyId ?? '',
          title: item.title ?? '',
          artist: item.artist ?? '',
          albumArt: item.thumbnail,
          genre: item.genre
        }))
      },
      enabled: keyword.trim().length > 0
    })
}
