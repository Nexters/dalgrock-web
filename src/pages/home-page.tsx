import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div>
      <h1>🏠 홈 페이지</h1>
      <p>react-router-dom v7 라우팅이 정상적으로 작동합니다!</p>

      <nav>
        <h2>네비게이션 예시</h2>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/about">소개 (404 테스트)</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default HomePage
