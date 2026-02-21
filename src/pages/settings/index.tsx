import { useAuth } from '@/hooks/useAuth'
import { Header } from '@/components/header'
import { ArrowIcon } from '@/components/icons'

function Settings() {
  const { logout } = useAuth()

  return (
    <div className="min-h-dvh bg-gray-600">
      <Header />

      <ul>
        <li>
          <button
            onClick={logout}
            className="flex w-full items-center justify-between px-5 py-4">
            <span className="text-body-2 text-white">로그아웃</span>
            <ArrowIcon
              direction="right"
              width={24}
              height={24}
            />
          </button>
        </li>
      </ul>
    </div>
  )
}

export { Settings }
