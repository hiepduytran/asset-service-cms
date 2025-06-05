import { Typography } from '@mui/material'

export const stateTypes = [
  {
    value: null,
    label: 'Tất cả',
  },
  {
    value: 'REJECT',
    label: 'Từ chối',
  },
  {
    value: 'PENDING',
    label: 'Chờ duyệt',
  },
  {
    value: 'APPROVED',
    label: 'Đã duyệt',
  },
]

export const colorText = (text: string) => {
  if (text === 'PENDING') {
    return <Typography color={'#F58020'}>Chờ duyệt</Typography>
  } else if (text === 'APPROVED') {
    return <Typography color={'#00CC6A'}>Đã duyệt</Typography>
  } else if (text === 'REJECT_1') {
    return <Typography color={'#FF4956'}>Từ chối</Typography>
  } else if (text === 'REJECT_2') {
    return <Typography color={'#FF4956'}>Từ chối</Typography>
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
