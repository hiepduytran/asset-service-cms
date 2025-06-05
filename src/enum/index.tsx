import { GREEN, ORANGE, RED } from '@/helper/colors'
import { Typography } from '@mui/material'

export const Reason = [
  { value: 'MAINTENANCE', label: 'Bảo dưỡng' },
  { value: 'UNEXPECTED_INCIDENT', label: 'Sự cố đột xuất' },
]

export const EvaluateAsset = [
  { value: 'NORMAL', label: 'Hoạt động bình thường' },
  { value: 'ABNORMAL', label: 'Dừng máy' },
]

export const ParameterType = [
  { value: 'TESTING', label: 'Kiểm tra' },
  { value: 'MAINTAIN', label: 'Bảo dưỡng' },
  { value: 'STOP', label: 'Dừng máy' },
]

export const SourceOfTrackAssetList = [
  { value: null, label: 'Tất cả' },
  { value: 'RECOVER', label: 'Thu hồi' },
  { value: 'MANUAL', label: 'Thủ công' },
  { value: 'TRANSFER', label: 'Bàn giao' },
]

export const fieldsApproveConfig = [
  {
    label: 'Tiêu chuẩn tự bảo dưỡng theo tài sản',
    value: 'assetSelfMaintainStandard',
  },
  { label: 'Phiếu tự bảo dưỡng', value: 'selfMaintainVoucher' },
  { label: 'Kế hoạch tuần', value: 'weeklyPlan' },
  { label: 'Kế hoạch tuần phát sinh', value: 'emergingWeeklyPlan' },
  { label: 'Kế hoạch năm', value: 'annualPlan' },
  { label: 'Khắc phục sự cố đột xuất', value: 'emergencyFix' },
  { label: 'Bảo dưỡng thường', value: 'regularMaintenance' },
]

export const convertPlanType = (planType: string) => {
  if (planType === 'WEEK') {
    return 'Tuần'
  } else if (planType === 'WEEKLY_INCIDENT') {
    return 'Phát sinh tuần'
  } else if (planType === 'YEAR') {
    return 'Năm'
  } else if (planType === 'EMERGENCY_TROUBLESHOOTING') {
    return 'Khắc phục sự cố đột xuất'
  } else {
    return ''
  }
}

export const renderColorText = (text: string, t: any) => {
  if (text === 'PENDING') {
    return (
      <Typography color={'#F58020'}>{`${t(
        'text.pending_approval'
      )}`}</Typography>
    )
  } else if (text === 'APPROVED') {
    return <Typography color={'#00CC6A'}>{`${t('text.approval')}`}</Typography>
  } else if (text === 'REJECTED') {
    return <Typography color={'#FF4956'}>{`${t('text.reject')}`}</Typography>
  } else if (text === 'TERMINATE') {
    return <Typography color={'#FF4956'}>{`${t('text.cancel')}`}</Typography>
  } else {
    return ''
  }
}

export const convertAllocationStatusDialog = (status?: string) => {
  if (status === 'ALLOCATED ') {
    return 'Đã cấp phát'
  } else if (status === 'NOT_ALLOCATION') {
    return 'Chưa cấp phát'
  } else if (status === 'REQUEST_SEND') {
    return 'Đã gửi yêu cầu'
  } else {
    return ''
  }
}

export const convertExecutionStatus = (status: string) => {
  if (status === 'PENDING') {
    return <Typography color={'#F89E19'}>Chưa thực hiện</Typography>
  } else if (status === 'IN_PROCESS') {
    return <Typography color={'#3F91FF'}>Đang thực hiện</Typography>
  } else if (status === 'FINISH') {
    return <Typography color={'#00CC6A'}>Hoàn thành</Typography>
  } else {
    return ''
  }
}

export const textColor = (text?: string) => {
  if (text === 'FINISH') {
    return <Typography color={'#00CC6A'}>Đã phê duyệt</Typography>
  } else if (text === 'IN_PROCESS') {
    return <Typography color={'#00CC6A'}>Đã thực hiện</Typography>
  } else if (text === 'PENDING') {
    return <Typography color={'#F58020'}>Chưa thực hiện</Typography>
  } else if (text === 'ALLOCATED') {
    return <Typography color={'#00CC6A'}>Đã cấp phát</Typography>
  } else if (text === 'NOT_ALLOCATION' || text === 'REQUEST_SEND') {
    return <Typography color={'#F58020'}>Chưa cấp phát</Typography>
  } else if (text === 'ONE_PART_ALLOCATION') {
    return <Typography color={'#6979F8'}>Cấp phát một phần</Typography>
  } else if (text === 'NOT_TESTED') {
    return <Typography color={'#F89E19'}>Chưa kiểm tra</Typography>
  } else if (text === 'PASSED_FIRST') {
    return <Typography color={'#00CC6A'}>Đã kiểm tra</Typography>
  } else if (text === 'PASSED_SECOND') {
    return <Typography color={'#00CC6A'}>Đã kiểm tra</Typography>
  } else if (text === 'NOT_PASSED') {
    return <Typography color={'#FF4956'}>Chưa đạt</Typography>
  } else if (text === 'RECALLED') {
    return <Typography color={'#00CC6A'}>Đã thu hồi</Typography>
  } else if (text === 'NOT_RECALL') {
    return <Typography color={'#F57322'}>Chưa thu hồi</Typography>
  } else if (text === 'ONE_PART_RECALL') {
    return <Typography color={'#6979F8'}>Thu hồi một phần</Typography>
  } else if (text === 'TRANSFER') {
    return <Typography color={'#00CC6A'}>Đã bàn giao</Typography>
  } else if (text === 'NOT_TRANSFER') {
    return <Typography color={'#F58020'}>Chưa bàn giao</Typography>
  } else if (text === 'ONE_PART_TRANSFER') {
    return <Typography color={'#6979F8'}>Bàn giao một phần</Typography>
  } else if (text === 'CANCEL') {
    return <Typography color={'#FF4956'}>Hủy</Typography>
  } else if (text === 'WAITING' || text === 'DRAFT') {
    return <Typography color={'#F58020'}>Chờ xuất kho</Typography>
  } else if (text === 'FINISH') {
    return <Typography color={'#00CC6A'}>Hoàn thành</Typography>
  } else if (text === 'TERMINATE') {
    return <Typography color={'#FF4956'}>Hủy</Typography>
  } else {
    return ''
  }
}

export const planTypeOfMaintenancePlan = [
  {
    value: null,
    label: 'Tất cả',
  },
  {
    value: 'WEEK',
    label: 'Tuần',
  },
  {
    value: 'WEEKLY_INCIDENT',
    label: 'Phát sinh tuần',
  },
  {
    value: 'YEAR',
    label: 'Năm',
  },
  {
    value: 'EMERGENCY_TROUBLESHOOTING',
    label: 'Khắc phục sự cố đột xuất',
  },
]

export const typeOfInitialAllocation = [
  { value: null, label: 'Tất cả' },
  { label: 'Tổ chức', value: 'ORGANIZATION' },
  { label: 'Bộ phận', value: 'DEPARTMENT' },
  { label: 'Nhân viên', value: 'EMPLOYEE' },
]

export const optionPlanType = (t: any) => [
  { label: `${t('text.ALL')}`, value: null },
  { label: `${t('text.WEEK')}`, value: 'WEEK' },
  { label: `${t('text.WEEKLY_INCIDENT')}`, value: 'WEEKLY_INCIDENT' },
  { label: `${t('text.YEAR')}`, value: 'YEAR' },
  {
    label: `${t('text.EMERGENCY_TROUBLESHOOTING')}`,
    value: 'EMERGENCY_TROUBLESHOOTING',
  },
]

export const assessmentType = (t: any) => [
  { label: `${t('text.NORMAL')}`, value: 'NORMAL' },
  { label: `${t('text.NOT_NORMAL')}`, value: 'NOT_NORMAL' },
]

export const optionRequest = (value: string, t: any) => {
  const requests = [
    { value: 'INTERNAL_REPAIR', label: t('text.INTERNAL_REPAIR') },
    { value: 'REPLACE', label: t('text.REPLACE') },
    { value: 'OUTSOURCED_REPAIR', label: t('text.OUTSOURCED_REPAIR') },
  ]
  return requests.find((item) => item.value === value)?.label
}

// Hàm lấy ra lỗi đầu tiên trong errors
export const findFirstError = (errors: any): any => {
  for (const key in errors) {
    if (errors[key]?.type) {
      return key
    }
    if (typeof errors[key] === 'object' && errors[key] !== null) {
      const nestedErrorKey = findFirstError(errors[key])
      if (nestedErrorKey) {
        return `${key}.${nestedErrorKey}`
      }
    }
  }
  return null
}

export const convertOrganization = (organization: string, t: any) => {
  if (organization === 'ORGANIZATION') {
    return 'Tổ chức'
  } else if (organization === 'DEPARTMENT') {
    return 'Bộ phận'
  } else if (organization === 'EMPLOYEE') {
    return 'Nhân viên'
  }
}

export const convertAround = (name: string) => {
  if (name === 'IDENTITY') {
    return <Typography color={'#0078D4'}>Mã định danh</Typography>
  } else if (name === 'TIME') {
    return <Typography color={'#0078D4'}>Thời gian</Typography>
  } else if (name === 'INCIDENT_LOG') {
    return <Typography color={'#0078D4'}>Ghi nhận sự cố</Typography>
  }
}

export const convertWareHouse = (text: string, t?: any) => {
  if (text === 'DONE') {
    return <Typography color={'#00CC6A'}>Hoàn thành</Typography>
  }
  if (text === 'PROCESSING') {
    return <Typography color={'#F57322'}>Đang xử lý</Typography>
  }
  if (text === 'WAITING' || text === 'DRAFT') {
    return <Typography color={'#F57322'}>Chưa xử lý</Typography>
  }
}

export const IssuanceSource = [
  { value: null, label: 'Tất cả' },
  { label: 'Cấp phát', value: 'REQUEST_ALLOCATION' },
  { label: 'Thu hồi', value: 'ASSET_RETRIEVAL' },
  { label: 'Bàn giao', value: 'ASSET_TRANSFER' },
  { label: 'Cấp phát đầu kỳ', value: 'INITIAL_ASSET' },
]

export const RecordConditionType = [
  { label: 'Bình thường', value: 'NORMAL' },
  { label: 'Hỏng', value: 'BROKEN' },
  { value: 'MAINTAIN', label: 'Bảo dưỡng' },
  { value: 'MAINTENANCE', label: 'Bảo dưỡng' },
]
export const convertRecordConditionType = (text: string, t?: any) => {
  if (text === 'NORMAL') {
    return 'Bình thường'
  } else if (text === 'BROKEN') {
    return 'Hỏng'
  }
  return '--'
}

export const convertSource = (text: string, t?: any) => {
  if (text === 'RECOVER') {
    return 'Thu hồi'
  }
  if (text === 'TRANSFER') {
    return 'Bàn giao'
  }
  return '--'
}

export const convertAllocationChooseType = (text: string, t?: any) => {
  if (text === 'ORGANIZATION') {
    return 'Thu hồi'
  }
  if (text === 'DEPARTMENT') {
    return 'Phòng ban'
  }
  if (text === 'EMPLOYEE') {
    return 'Nhân viên'
  }
  return '--'
}
export const convertAssetAllocationType = (text: string, t?: any) => {
  if (text === 'INITIAL_ASSET') {
    return 'Cấp phát đầu kỳ'
  }
  if (text === 'REQUEST_ALLOCATION') {
    return 'Yêu cầu cấp phát'
  }
  if (text === 'ASSET_RETRIEVAL') {
    return 'Thu hồi tài sản'
  }
  if (text === 'ASSET_TRANSFER') {
    return 'Bàn giao'
  }
  if (text === 'INCIDENT_RECORDING') {
    return 'Ghi nhận sự cố'
  }
  return '--'
}

export const convertAllocationStatus = (text: string, t?: any) => {
  if (text === 'ALLOCATED') {
    return 'Đã cấp phát'
  }
  if (text === 'NOT_ALLOCATION') {
    return 'Chưa cấp phát'
  }
  if (text === 'REQUEST_SEND') {
    return 'Gửi yêu cầu'
  }
  if (text === 'ONE_PART_ALLOCATION') {
    return 'Cấp phát một phần'
  }
  if (text === 'RECALLED') {
    return 'Đã thu hồi'
  }
  if (text === 'NOT_RECALL') {
    return 'Chưa thu hồi'
  }
  if (text === 'ONE_PART_RECALL') {
    return 'Thu hồio một phần'
  }
  if (text === 'TRANSFER') {
    return 'Đã bàn giao'
  }
  if (text === 'NOT_TRANSFER') {
    return 'Chưa bàn giao'
  }
  if (text === 'ONE_PART_TRANSFER') {
    return 'Bàn giao một phần'
  }
  if (text === 'TERMINATE') {
    return 'Hủy'
  }
  if (text === 'REJECTED') {
    return 'Từ chối'
  }
  if (text === 'INCIDENT_RECORDING') {
    return 'Ghi nhận sự cố'
  }
  return '--'
}

export const AllocatedAssetListCheckingType = [
  { value: 'LOTS', label: 'Đã cấp phát (không thu hồi)' },
  { value: 'DEFAULT', label: 'Đã cấp phát (không thu hồi)' },
  { value: 'SERIAL', label: 'Đang cấp phát' },
  { value: 'ALL', label: 'Đang cấp phát' },
]

export const convertIncidentSource = (text: string, t?: any) => {
  if (text === 'OPERATE') {
    return 'Vận hành'
  }
  if (text === 'SELF_MAINTENANCE') {
    return 'Tự bảo dưỡng'
  }
  if (text === 'INCIDENT_REPORT') {
    return 'Báo cáo sự cố'
  }
  if (text === 'RECOVERY') {
    return 'Thu hồi'
  }
  return '--'
}
export const changeTypeDeclaration = (typeDeclaration: string, t?: any) => {
  if (
    typeDeclaration === 'MAINTENANCE_WORK_OVER_VIEW' ||
    typeDeclaration === 'DETAILS_WORK_OVER_VIEW'
  )
    return <Typography>{t('Công việc bảo dưỡng')}</Typography>
  if (
    typeDeclaration === 'MAINTENANCE_WORK_REPAIR' ||
    typeDeclaration === 'DETAILS_WORK_REPAIR'
  )
    return <Typography>{t('Công việc sửa chữa')}</Typography>
  return '--'
}

export const changeSelfMaintenanceTypeDetail = (
  selfMaintenanceType: string,
  t?: any
) => {
  if (selfMaintenanceType === 'RECOVERY')
    return (
      <Typography
        sx={{
          fontSize: '15px',
        }}
      >
        {t('Thu hồi')}
      </Typography>
    )
  if (selfMaintenanceType === 'OPERATE')
    return (
      <Typography
        sx={{
          fontSize: '15px',
        }}
      >
        {t('Vận hành')}
      </Typography>
    )
  if (selfMaintenanceType === 'INCIDENT_REPORT')
    return (
      <Typography
        sx={{
          fontSize: '15px',
        }}
      >
        {t('Báo cáo sự cố')}
      </Typography>
    )
  if (selfMaintenanceType === 'SELF_MAINTENANCE')
    return (
      <Typography
        sx={{
          fontSize: '15px',
        }}
      >
        {t('Tự bảo dưỡng')}
      </Typography>
    )
  return '--'
}

export const changeSelfMaintenanceType = (
  selfMaintenanceType: string,
  t?: any
) => {
  if (selfMaintenanceType === 'RECOVERY')
    return <Typography>{t('Thu hồi')}</Typography>
  if (selfMaintenanceType === 'OPERATE')
    return <Typography>{t('Vận hành')}</Typography>
  if (selfMaintenanceType === 'INCIDENT_REPORT')
    return <Typography>{t('Báo cáo sự cố')}</Typography>
  if (selfMaintenanceType === 'SELF_MAINTENANCE')
    return <Typography>{t('Tự bảo dưỡng')}</Typography>
  return '--'
}

export const changeActionType = (actionType: string, t?: any) => {
  if (actionType === 'CREATE_NEW')
    return <Typography>{t('Thêm mới')}</Typography>
  if (actionType === 'REVIEW_AGAIN')
    return <Typography>{t('Đánh giá lại')}</Typography>
  if (actionType === 'REVIEW_EDIT')
    return <Typography>{t('Chỉnh sửa đánh giá lại')}</Typography>
  if (actionType === 'EDIT_NEW')
    return <Typography>{t('Chỉnh sửa thêm mới')}</Typography>
  return '---'
}
export const convertAssetStatus = (value: boolean) => {
  if (value) {
    return <Typography>Đang hoạt động</Typography>
  } else {
    return <Typography>Dừng hoạt động</Typography>
  }
}

export const convertAssetStatusIR = (value: string) => {
  if (value === 'NORMAL') {
    return <Typography color={GREEN}>Đang hoạt động</Typography>
  } else if (value === 'ABNORMAL')
    return <Typography color={RED}>Dừng hoạt động</Typography>
  else return ''
}

export const convertPlanStatus = (value: boolean) => {
  if (value) {
    return <Typography color={GREEN}>Đã lập kế hoạch</Typography>
  } else {
    return <Typography color={ORANGE}>Chưa lập kế hoạch</Typography>
  }
}

export const changeApproveStatus = (approveStatus: string, t?: any) => {
  if (approveStatus === 'APPROVED')
    return <Typography color={'#00CC6A'}>{t('Đã phê duyệt')}</Typography>
  else if (approveStatus === 'REJECTED')
    return <Typography color={'#FF0012'}>{t('Từ chối')}</Typography>
  else return <Typography color={'#F57322'}>{t('Chờ phê duyệt')}</Typography>
}
