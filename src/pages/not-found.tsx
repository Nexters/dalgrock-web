import { Link } from 'react-router-dom'
import { css } from 'styled-system/css'

function NotFoundPage() {
  return (
    <div className={Container}>
      <h1>🚫 404 - 페이지를 찾을 수 없습니다</h1>

      <p>요청하신 페이지가 존재하지 않습니다.</p>

      <Link
        to="/"
        className={LinkStyle}>
        ← 홈으로 돌아가기
      </Link>
    </div>
  )
}

export default NotFoundPage

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
