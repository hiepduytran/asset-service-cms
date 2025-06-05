import { Typography } from '@mui/material'

export const stateTypes = [
  {
    value: null,
    label: 'Tất cả',
  },
  {
    value: 'PUBLISH',
    label: 'Hoạt động',
  },
  {
    value: 'ARCHIVED ',
    label: 'Lưu trữ',
  },
]

export const colorText = (text: string) => {
  if (text === 'PUBLISH') {
    return <Typography color={'#00CC6A'}>Hoạt động</Typography>
  } else if (text === 'ARCHIVED') {
    return <Typography color={'#F58020'}>Lưu trữ</Typography>
  } else {
    return null
  }
}

export const dateEnum = [
  {
    label: 'Thứ 2',
    value: 'isMon',
    valueE: 'MON',
  },
  {
    label: 'Thứ 3',
    value: 'isTue',
    valueE: 'TUE',
  },
  {
    label: 'Thứ 4',
    value: 'isWed',
    valueE: 'WED',
  },
  {
    label: 'Thứ 5',
    value: 'isThu',
    valueE: 'THU',
  },
  {
    label: 'Thứ 6',
    value: 'isFri',
    valueE: 'FRI',
  },
  {
    label: 'Thứ 7',
    value: 'isSat',
    valueE: 'SAT',
  },
  {
    label: 'Chủ nhật',
    value: 'isSun',
    valueE: 'SUN',
  },
]
