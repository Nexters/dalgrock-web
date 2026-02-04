export function formatTodayDate(): string {
  const today = new Date()
  const month = today.getMonth() + 1
  const date = today.getDate()
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']
  const dayName = dayNames[today.getDay()]

  return `${month}월 ${date}일 ${dayName}요일`
}
