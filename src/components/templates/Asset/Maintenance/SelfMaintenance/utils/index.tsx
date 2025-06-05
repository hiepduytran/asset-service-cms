import { Typography } from '@mui/material'

export const stateTypes = [
  {
    value: null,
    label: 'Tất cả',
  },
  {
    value: 'SAVED',
    label: 'Lưu trữ',
  },
  {
    value: 'APPROVED',
    label: 'Hoạt động',
  },
]

export const colorText = (text: string) => {
  if (text === 'PENDING') {
    return <Typography color={'#EC6823'}>Chờ duyệt</Typography>
  } else if (text === 'APPROVED') {
    return <Typography color={'#00CC6A'}>Đã duyệt</Typography>
  } else if (text === 'ARCHIVED') {
    return <Typography color={'#00CC6A'}>Đã lưu</Typography>
  } else if (text === 'DRAFT') {
    return <Typography color={'#000000'}>Nháp</Typography>
  } else if (text === 'REJECT_1') {
    return <Typography color={'#FF4956'}>Từ chối</Typography>
  } else if (text === 'REJECT_2') {
    return <Typography color={'#FF4956'}>Từ chối</Typography>
  } else if (text === 'TERMINATE') {
    return <Typography color={'#FF4956'}>Hủy</Typography>
  } else if (text === 'PUBLISH') {
    return <Typography color={'#00CC6A'}>Publish</Typography>
  } else if (text === 'APPROVED_LEVEL_1') {
    return <Typography color={'#00CC6A'}>Đã duyệt cấp 1</Typography>
  } else if (text === 'SAVED') {
    return <Typography color={'#00CC6A'}>Đã lưu</Typography>
  } else {
    return null
  }
}

export const colorTextOfFollowList = (text: string) => {
  if (text === 'APPROVED') {
    return <Typography color={'#00CC6A'}>Hoạt động</Typography>
  } else if (text === 'SAVED') {
    return <Typography color={'#FF4956'}>Lưu trữ</Typography>
  } else {
    return null
  }
}

export const convertDayOfWeek = (day: string) => {
  if (day === 'MONDAY') {
    return 'Thứ 2'
  } else if (day === 'TUESDAY') {
    return 'Thứ 3'
  } else if (day === 'WEDNESDAY') {
    return 'Thứ 4'
  } else if (day === 'THURSDAY') {
    return 'Thứ 5'
  } else if (day === 'FRIDAY') {
    return 'Thứ 6'
  } else if (day === 'SATURDAY') {
    return 'Thứ 7'
  } else if (day === 'SUNDAY') {
    return 'Chủ nhật'
  } else {
    return ''
  }
}

export const optionErrorAssessment = [
  { value: 'MINOR', label: 'Lỗi không nghiêm trọng' },
  { value: 'DANGEROUS', label: 'Lỗi nghiêm trọng ' },
  { value: 'FOLLOWING', label: 'Theo dõi thêm' },
]

export const statusShifts = [
  {
    label: 'Hoạt động ổn định',
    value: 'NORMAL',
  },
  // {
  //   label: 'Lỗi không nghiêm trọng',
  //   value: 'MINOR',
  // },
  // {
  //   label: 'Lỗi nghiêm trọng',
  //   value: 'DANGEROUS',
  // },
  {
    label: 'Dừng máy',
    value: 'PAUSED',
  },
]
