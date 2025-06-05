import { ColumnProps } from '@/components/organism/CoreTable'
import {
  changeActionType,
  changeApproveStatus,
  changeSelfMaintenanceType,
} from '@/enum'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryGetListIncidentApprove } from '@/service/asset/IncidentApprove/list'
import {
  ListForm,
  RequestParams,
} from '@/service/asset/IncidentApprove/list/type'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const defaultValues = {
  search: '',
  page: 0,
  size: 10,
}
export default function useIncidentApprove() {
  const { t } = useTranslation(TRANSLATE.INCIDENT_APPROVE)
  const methods = useFormCustom<ListForm>({ defaultValues })
  const { handleSubmit, reset } = methods
  const [queryPage, setQueryPage] = useState<RequestParams>(defaultValues)
  const router = useRouter()

  const onChangePageSize = (input: any) => {
    const { page, size } = input
    setQueryPage({ ...input, page, size })
  }
  const columns = useMemo(() => {
    return [
      { header: t('Mã sự cố'), fieldName: 'code' },
      { header: t('Tên sự cố'), fieldName: 'name' },
      { header: t('DIC'), fieldName: 'asset.code' },
      { header: t('Tài sản'), fieldName: 'asset.name' },
      { header: t('Bộ phận'), fieldName: 'department.name' },
      { header: t('Người ghi nhận'), fieldName: 'recorder.name' },
      { header: t('Nguồn'), fieldName: 'selfMaintenanceType' },
      { header: t('Vị trí lỗi'), fieldName: 'incidentLocation.name' },
      {
        header: t('Mức độ nghiêm trọng'),
        fieldName: 'severityManagement.name',
      },
      { header: t('Loại ghi nhận'), fieldName: 'actionType' },
      { header: t('Trạng thái'), fieldName: 'approveStatus' },
      { header: t('Người phê duyệt'), fieldName: 'personApprove.name' },
      { header: t('Ghi chú'), fieldName: 'reason' },
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const {
    data: dataListIncidentApprove,
    isLoading: isLoadingListIncidentApprove,
  } = useQueryGetListIncidentApprove(queryPage)

  const tableData = (
    dataListIncidentApprove ? dataListIncidentApprove.data.content : []
  ).map((item) => {
    return {
      ...item,
      selfMaintenanceType: changeSelfMaintenanceType(
        item.selfMaintenanceType,
        t
      ),
      actionType: changeActionType(item.actionType, t),
      approveStatus: changeApproveStatus(item.approveStatus, t),
      reason: item.note ?? item.reason,
    }
  })

  const onSubmit = handleSubmit((data) => {
    setQueryPage({
      ...defaultValues,
      search: data.search,
      severityManagementId: data.severityManagement?.id,
      departmentId: data.department?.id,
    })
  })

  const onReset = () => {
    setQueryPage(defaultValues)
    reset(defaultValues)
  }

  return [
    {
      methods,
      columns,
      tableData,
      isLoadingListIncidentApprove,
      router,
      page: dataListIncidentApprove
        ? {
            page: dataListIncidentApprove.data.page,
            size: dataListIncidentApprove.data.size,
            totalPages: dataListIncidentApprove.data.totalPages,
          }
        : null,
    },
    { t, onChangePageSize, onSubmit, onReset },
  ] as const
}
