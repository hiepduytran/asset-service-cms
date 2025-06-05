import { BLUE, GREEN, ORANGE, RED } from '@/helper/colors'

interface Type {
  label: string
  value: string | null
  color?: string
}
export const TypeLabelWithColor: Type[] = [
  { label: 'Nháp', value: 'DRAFT', color: ORANGE },
  { label: 'Chờ phê duyệt', value: 'WAITING_FOR_APPROVAL', color: BLUE },
  { label: 'Bị từ chối', value: 'REFUSE', color: RED },
  { label: 'Đã phê duyệt', value: 'APPROVED', color: GREEN },
]

export const TypeLabelWithColorOfApproveMaintenancePlan: Type[] = [
  { label: 'Chờ phê duyệt', value: 'PENDING', color: '#F58020' },
  { label: 'Đã phê duyệt', value: 'APPROVED', color: '#00CC6A' },
  { label: 'Đã phê duyệt', value: 'APPROVED_LEVEL_1', color: '#00CC6A' },
  { label: 'Từ chối', value: 'REJECTED', color: '#FF4956' },
  { label: 'Từ chối', value: 'REJECT_1', color: '#FF4956' },
  { label: 'Từ chối', value: 'REJECT_2', color: '#FF4956' },
]

export const StateWithColor: Type[] = [
  { label: 'Nháp', value: 'DRAFT', color: '#242424' },
  { label: 'Chờ duyệt', value: 'PENDING', color: '#F58020' },
  { label: 'Đã duyệt', value: 'APPROVED', color: '#00CC6A' },
  { label: 'Đã duyệt', value: 'APPROVED_LEVEL_1', color: '#00CC6A' },
  { label: 'Đã lưu', value: 'ARCHIVED', color: '#00CC6A' },
  { label: 'Bị từ chối', value: 'REJECTED', color: '#FF4956' },
  { label: 'Bị từ chối', value: 'REJECT_1', color: '#FF4956' },
  { label: 'Bị từ chối', value: 'REJECT_2', color: '#FF4956' },
  { label: 'Hủy', value: 'TERMINATE', color: '#FF4956' },
  { label: 'Publish', value: 'PUBLISH', color: '#00CC6A' },
]

export const StateWithColorAllocation: Type[] = [
  { label: 'Nháp', value: 'DRAFT', color: '#242424' },
  { label: 'Chờ duyệt', value: 'PENDING', color: '#F58020' },
  { label: 'Đã duyệt', value: 'APPROVED', color: '#00CC6A' },
  { label: 'Đã duyệt', value: 'APPROVED_LEVEL_1', color: '#00CC6A' },
  { label: 'Đã lưu', value: 'ARCHIVED', color: '#00CC6A' },
  { label: 'Từ chối', value: 'REJECTED', color: '#FF4956' },
  { label: 'Bị từ chối', value: 'REJECT_1', color: '#FF4956' },
  { label: 'Bị từ chối', value: 'REJECT_2', color: '#FF4956' },
  { label: 'Hủy', value: 'TERMINATE', color: '#FF4956' },
  { label: 'Publish', value: 'PUBLISH', color: '#00CC6A' },
]

export const TypeDate: Type[] = [
  { label: 'Ngày', value: 'DAY', color: '' },
  { label: 'Tuần', value: 'WEEK', color: '' },
  { label: 'Tháng', value: 'MONTH', color: '' },
]

export const TypeAction: Type[] = [
  { label: 'Thêm mới', value: 'CREATE', color: '' },
  { label: 'Chỉnh sửa', value: 'UPDATE', color: '' },
  { label: 'Xóa', value: 'DELETE', color: '' },
]

export const TypeOfRaw: Type[] = [
  { label: 'Thành phẩm sản xuất', value: 'SEMI_FINISHED_PRODUCT', color: '' },
  { label: 'Thành phẩm', value: 'FINISHED_PRODUCT', color: '' },
  { label: 'Vật tư', value: 'SUPPLIES_PRODUCT', color: '' },
  { label: 'Nguyên vật liệu', value: 'MATERIALS', color: '' },
]

export const TypeOfAllocation: Type[] = [
  { label: 'Đã cấp phát', value: 'APPROVED', color: GREEN },
  { label: 'Chưa cấp phát', value: 'PENDING', color: ORANGE },
  { label: 'Đóng cấp phát', value: 'ARCHIVED', color: '#6979F8' },
]

export const TypeOfSource: Type[] = [
  { label: 'Thủ công', value: 'HAND_MADE', color: '' },
  { label: 'Yêu cầu cấp phát', value: 'REQUEST', color: '' },
]

export const TypeOfRecovery: Type[] = [
  { label: 'Đã thu hồi', value: 'APPROVED', color: GREEN },
  { label: 'Chưa thu hồi', value: 'PENDING', color: ORANGE },
  { label: 'Đóng thu hồi', value: 'ARCHIVED', color: '#6979F8' },
]

export const IncidentLogListStatus: Type[] = [
  { value: 'DRAFT', label: 'Nháp', color: ORANGE },
  { value: 'PUBLISH', label: 'Đã ghi nhận', color: GREEN },

]

export const getTypeLabelWithColor = (
  value: string,
  types: Type[]
): JSX.Element | null => {
  const type = types.find((type) => type.value === value)
  if (type) {
    const labelStyle: React.CSSProperties = {
      color: type.color,
    }
    return <span style={labelStyle}>{type.label}</span>
  }
  return null
}

export const getTypeData = (
  value: string,
  types: Type[]
): JSX.Element | null => {
  const type = types.find((type) => type.value === value)
  if (type) {
    return <span>{type.label}</span>
  }
  return null
}

export const getTypeLabelWithFontWeight = (
  value: string,
  types: Type[],
  boldValues: string[] = []
): JSX.Element | null => {
  const type = types.find((type) => type.value === value)
  if (type) {
    const labelStyle: React.CSSProperties = {
      fontWeight: boldValues.includes(value) ? 'bold' : 'normal',
    }
    return <span style={labelStyle}>{type.label}</span>
  }
  return null
}

