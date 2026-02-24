import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useQuery } from '@tanstack/react-query'

import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import { musicsQueries } from '@/apis/musics/queries'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { SearchedMusicItem } from '../searched-music-item'
import { SelectedMusicItem } from '../selected-music-item'
import type { Music } from '@/types/record'

const DEBOUNCE_DELAY_MS = 300

interface MusicSearchStepProps {
  selectedMusics: Music[]
  onMusicToggle: (music: Music) => void
  onComplete: () => void
  submitLabel?: string
}

export function MusicSearchStep({
  selectedMusics,
  onMusicToggle,
  onComplete,
  submitLabel = '다음'
}: MusicSearchStepProps) {
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebouncedValue(keyword, DEBOUNCE_DELAY_MS)

  const { data: searchResults = [], isLoading: isSearchLoading } = useQuery(
    musicsQueries.searchMusics(debouncedKeyword)
  )

  return (
    <>
      <section className="flex flex-1 flex-col gap-2">
        <div className="px-5 pt-3 pb-2">
          <SearchBar
            placeholder="제목, 가수 검색"
            value={keyword}
            onChange={setKeyword}
          />
        </div>

        {/* 검색 결과 */}
        <div className="flex-1 overflow-y-auto">
          {!keyword.trim() && (
            <div className="flex flex-1 flex-col items-center justify-center py-16">
              <div className="size-[100px] rounded-lg bg-gray-600" />
              <p className="mt-4 text-gray-400">
                오늘을 대표하는 곡을 검색해보세요!
              </p>
            </div>
          )}

          {isSearchLoading && (
            <div className="flex justify-center py-8">
              <div className="size-6 animate-spin rounded-full border-2 border-gray-600 border-t-white" />
            </div>
          )}

          {!isSearchLoading &&
            searchResults.map(music => (
              <SearchedMusicItem
                key={music.id}
                {...music}
                isSelected={selectedMusics.some(m => m.id === music.id)}
                onClick={() => onMusicToggle(music)}
              />
            ))}

          {!isSearchLoading &&
            debouncedKeyword.trim() &&
            searchResults.length === 0 && (
              <p className="py-8 text-center text-gray-400">
                검색 결과가 없습니다
              </p>
            )}
        </div>
      </section>

      {/* 하단 버튼 */}
      <AnimatePresence>
        {selectedMusics.length > 0 && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 40, stiffness: 300 }}
            className="sticky bottom-0 rounded-t-2xl pt-[2px] bg-[linear-gradient(90deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.2)_100%)] shadow-[2px_-2px_20px_0px_rgba(0,0,0,0.2)]">
            <div className="rounded-t-[19px] pt-6 pb-8 px-5 bg-[linear-gradient(180deg,rgba(44,46,52,0.7)_0%,#1D1E22_100%)] backdrop-blur-[20px]">
              <div className="mb-4">
                <p className="mb-2 text-sm text-gray-100">
                  <span className="text-white">{selectedMusics.length}</span> 곡
                  선택
                </p>
                <div className="scrollbar-hide -mx-5 flex gap-2 overflow-x-auto px-5">
                  {selectedMusics.map(music => (
                    <SelectedMusicItem
                      key={music.id}
                      {...music}
                      onRemove={() => onMusicToggle(music)}
                    />
                  ))}
                </div>
              </div>

              <Button
                variant="primary"
                className="h-[52px] w-full"
                size="lg"
                onClick={onComplete}>
                {submitLabel}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
