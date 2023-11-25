import { getMillisToDateString } from "./DateUtils"

describe('특정 milliseconds를 받았을 때', () => {
  test('해당하는 날짜의 문자열로 변경합니다.', () => {
    expect(getMillisToDateString(1700838000000)).toBe('2023-11-25')
  })

  test('10이하의 월, 10이하의 일수를 가진다면 0N의 형태로 변경합니다.', () => {
    expect(getMillisToDateString(1701356400000)).toBe('2023-12-01')
  })
})