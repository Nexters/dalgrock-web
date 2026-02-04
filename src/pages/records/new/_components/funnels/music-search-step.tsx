import { useState } from 'react'

import { Header } from '@/components/header'
import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import { SearchedMusicItem } from '../searched-music-item'
import { SelectedMusicItem } from '../selected-music-item'
import type { Music } from '../../index'

// TODO: API 연동 후 제거
const MOCK_SEARCH_RESULTS: Music[] = [
  { id: '1', title: 'APT.', artist: '로제 & 브루노 마스' },
  { id: '2', title: 'Whiplash', artist: 'aespa' },
  { id: '3', title: 'HAPPY', artist: 'DAY6' },
  { id: '4', title: 'Supernova', artist: 'aespa' },
  { id: '5', title: 'Love wins all', artist: 'IU' },
  { id: '6', title: 'Ditto', artist: 'NewJeans' },
  { id: '7', title: 'OMG', artist: 'NewJeans' },
  { id: '8', title: 'Super Shy', artist: 'NewJeans' },
  { id: '9', title: 'Hype Boy', artist: 'NewJeans' },
  { id: '10', title: 'Drama', artist: 'aespa' },
  { id: '11', title: '고민중독', artist: 'QWER' },
  { id: '12', title: 'SPOT!', artist: '지코 & 제니' },
  { id: '13', title: 'Magnetic', artist: 'ILLIT' },
  { id: '14', title: 'How Sweet', artist: 'NewJeans' },
  { id: '15', title: 'Armageddon', artist: 'aespa' },
  { id: '16', title: 'Small girl', artist: '이영지' },
  { id: '17', title: '예뻤어', artist: 'DAY6' },
  { id: '18', title: 'Welcome to the Show', artist: 'DAY6' },
  { id: '19', title: 'Kitsch', artist: 'IVE' },
  { id: '20', title: 'I AM', artist: 'IVE' }
]

interface MusicSearchStepProps {
  selectedMusics: Music[]
  onMusicToggle: (music: Music) => void
  onNext: () => void
}

export function MusicSearchStep({
  selectedMusics,
  onMusicToggle,
  onNext
}: MusicSearchStepProps) {
  const [keyword, setKeyword] = useState('')

  const isNextEnabled = selectedMusics.length > 0

  // TODO: API 연동 시 useQuery로 변경
  const searchResults = keyword.trim()
    ? MOCK_SEARCH_RESULTS.filter(
        music =>
          music.title.toLowerCase().includes(keyword.toLowerCase()) ||
          music.artist.toLowerCase().includes(keyword.toLowerCase())
      )
    : []

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />

      <section className="flex flex-1 flex-col gap-2">
        <div className="px-5 pt-3 pb-2">
          <SearchBar
            placeholder="제목, 가수 검색"
            value={keyword}
            onChange={setKeyword}
          />
        </div>

        {/* 검색 결과 */}
        <div className="flex-1">
          {!keyword.trim() && (
            <div className="flex flex-1 flex-col items-center justify-center py-16">
              <div className="size-[100px] rounded-lg bg-gray-600" />
              <p className="mt-4 text-gray-400">
                오늘을 대표하는 곡을 검색해보세요!
              </p>
            </div>
          )}

          {searchResults.map(music => (
            <SearchedMusicItem
              key={music.id}
              {...music}
              isSelected={selectedMusics.some(m => m.id === music.id)}
              onClick={() => onMusicToggle(music)}
            />
          ))}

          {keyword.trim() && searchResults.length === 0 && (
            <p className="py-8 text-center text-gray-400">
              검색 결과가 없습니다
            </p>
          )}
        </div>
      </section>

      {/* 하단 버튼 */}
      <div className="sticky bottom-0 rounded-t-2xl pt-[2px] bg-[linear-gradient(90deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.2)_100%)] shadow-[2px_-2px_20px_0px_rgba(0,0,0,0.2)]">
        <div className="rounded-t-[19px] pt-6 pb-8 px-5 bg-[linear-gradient(180deg,rgba(44,46,52,0.7)_0%,#1D1E22_100%)] backdrop-blur-[20px]">
          {selectedMusics.length > 0 && (
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
          )}

          <Button
            variant="primary"
            className="w-full h-[52px]"
            size="lg"
            disabled={!isNextEnabled}
            onClick={onNext}>
            다음
          </Button>
        </div>
      </div>
    </div>
  )
}
