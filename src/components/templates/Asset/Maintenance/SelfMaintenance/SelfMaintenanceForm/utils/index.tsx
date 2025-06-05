import { Typography } from '@mui/material'

export const dateEnum = [
  {
    label: 'Thứ 2',
    value: 'isMon',
  },
  {
    label: 'Thứ 3',
    value: 'isTue',
  },
  {
    label: 'Thứ 4',
    value: 'isWed',
  },
  {
    label: 'Thứ 5',
    value: 'isThu',
  },
  {
    label: 'Thứ 6',
    value: 'isFri',
  },
  {
    label: 'Thứ 7',
    value: 'isSat',
  },
  {
    label: 'Chủ nhật',
    value: 'isSun',
  },
]

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
    value: 'DRAFT',
    label: 'Nháp',
  },
  {
    value: 'PENDING',
    label: 'Chờ phê duyệt',
  },
  {
    value: 'APPROVED_LEVEL_1',
    label: 'Đã phê duyệt cấp 1',
  },
  {
    value: 'APPROVED_LEVEL_2',
    label: 'Đã phê duyệt',
  },
]

export const colorText = (text: string) => {
  if (text === 'PENDING') {
    return <Typography color={'#F58020'}>Chờ duyệt</Typography>
  } else if (text === 'DRAFT') {
    return <Typography color={'#000000'}>Nháp</Typography>
  } else if (text === 'REJECT') {
    return <Typography color={'#FF4956'}>Từ chối</Typography>
  } else if (text === 'APPROVED_LEVEL_1') {
    return <Typography color={'#00CC6A'}>Đã phê duyệt cấp 1</Typography>
  } else if (text === 'APPROVED_LEVEL_2') {
    return <Typography color={'#00CC6A'}>Đã phê duyệt</Typography>
  } else {
    return null
  }
}
