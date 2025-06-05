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
    value: 'DRAFT',
    label: 'Nháp',
  },
  {
    value: 'PENDING',
    label: 'Chờ duyệt',
  },
  {
    value: 'APPROVED_LEVEL_1',
    label: 'Đã phê duyệt cấp 1',
  },
  {
    value: 'APPROVED',
    label: 'Đã phê duyệt',
  },
]

export const colorText = (text: string) => {
  if (text === 'PENDING') {
    return <Typography color={'#F58020'}>Chờ phê duyệt</Typography>
  } else if (text === 'APPROVED') {
    return <Typography color={'#00CC6A'}>Đã phê duyệt</Typography>
  } else if (text === 'DRAFT') {
    return <Typography color={'#000000'}>Nháp</Typography>
  } else if (text === 'REJECT_1') {
    return <Typography color={'#FF4956'}>Từ chối</Typography>
  } else if (text === 'REJECT_2') {
    return <Typography color={'#FF4956'}>Từ chối</Typography>
  } else if (text === 'APPROVED_LEVEL_1') {
    return <Typography color={'#00CC6A'}>Đã phê duyệt cấp 1</Typography>
  } else {
    return null
  }
}
