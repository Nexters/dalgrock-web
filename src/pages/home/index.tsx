import { Link } from 'react-router-dom'

import { DateCardSlider } from './_components/date-card-slider'
import { HeroSection } from './_components/hero-section'
import { HomeTabs } from './_components/home-tabs'
import { WeeklyRecordSection } from './_components/weekly-record-grid'

function Home() {
  return (
    <div className="relative min-h-dvh bg-gray-600">
      <HomeTabs />

      <HeroSection />

      <DateCardSlider />

      <WeeklyRecordSection />

      <div className="sticky bottom-0 bg-gradient-to-t from-gray-600 to-transparent pb-10 pt-16">
        <Link
          to="/records"
          className="block text-center text-[15px] font-semibold text-white">
          기록 전체보기
        </Link>
      </div>
    </div>
  )
}

export { Home }
