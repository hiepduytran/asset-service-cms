import { toastError, toastSuccess } from '@/toast'
import { MENU_URL, TRANSLATE } from '@/routes'
import { changeStatusMaintenanceCardApprove } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceApproval/get/type'
import { DetailMaintenancesCard } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceFollow/detail/type'
import { useRouter } from 'next/router'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

export default function useStep2() {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormContext<DetailMaintenancesCard>()
  const { handleSubmit, control, setError } = methods
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const { fields: maintenanceCardLinesFields } = useFieldArray({
    control,
    name: 'maintenanceCardLines',
    keyName: 'key',
  })

  const handleChangeStatus = (status: string) => {
    if (!!id) {
      mutate({
        maintenanceCardId: id,
        state: status,
      })
    }
  }

  const { mutate, isLoading: isLoadingApprove } = useMutation(
    changeStatusMaintenanceCardApprove,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_APPROVAL}`,
        })
      },
      onError: (error) => {
        toastError(error, setError)
      },
    }
  )
  return [
    { methods, isView, isUpdate, maintenanceCardLinesFields, isLoadingApprove },
    { t, handleChangeStatus },
  ] as const
}
