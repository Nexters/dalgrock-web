import { Link } from 'react-router-dom'
import { css } from 'styled-system/css'

function HomePage() {
  return (
    <div className={Container}>
      <h1>🏠 홈 페이지</h1>
      <p>react-router-dom v7 라우팅이 정상적으로 작동합니다!</p>

      <nav>
        <h2>네비게이션 예시</h2>
        <ul>
          <li>
            <Link
              to="/"
              className={LinkStyle}>
              홈
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={LinkStyle}>
              소개 (404 테스트)
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default HomePage

const Container = css({
  bg: 'red.500',
  p: 4,
  borderRadius: 'md',
  boxShadow: 'md',
  textAlign: 'center',
  fontSize: '2xl',
  fontWeight: 'bold',
  color: 'white'
})

const LinkStyle = css({
  color: 'white',
  textDecoration: 'underline',
  fontWeight: 'bold',
  fontSize: 'xl'
})
