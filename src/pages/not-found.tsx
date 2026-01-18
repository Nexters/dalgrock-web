import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="bg-red-500 p-4 rounded-md shadow-md text-center text-2xl font-bold text-white">
      <h1>🚫 404 - 페이지를 찾을 수 없습니다</h1>

      <p>요청하신 페이지가 존재하지 않습니다.</p>

      <Link
        to="/"
        className="text-white underline font-bold text-xl">
        ← 홈으로 돌아가기
      </Link>
    </div>
  )
}

export default NotFoundPage
