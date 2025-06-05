import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import {
  putImplementMaintenancePlanCheck,
  useQueryGetImplementMaintenancePlanCheckDetail,
} from '@/service/asset/checkImpleMaintenancePlan/action'
import { ImplementMaintenancePlanCheckDetail } from '@/service/asset/checkImpleMaintenancePlan/action/type'
import { ErrorsCode } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/list/type'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

export const useCheckImplMaintenancePlanSave = () => {
  const { t } = useTranslation(TRANSLATE.CHECK_IMPLEMENT_MAINTENANCE_PLAN)
  const methods = useFormCustom<ImplementMaintenancePlanCheckDetail>()
  const { handleSubmit, setError, reset, getValues } = methods
  const router = useRouter()
  const { id, actionType } = router.query
  const parentId = getValues('parentId')
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const is_Level_1 = getValues('currentLevel') === 'LEVEL_1'
  const is_passed_1 = getValues('checkStatus') === 'PASSED_FIRST'
  const is_passed_2 = getValues('checkStatus') === 'PASSED_SECOND'

  const {
    mutate: mutateImplementMaintenancePlanCheck,
    isLoading: isLoadingImplementMaintenancePlanCheck,
  } = useMutation(putImplementMaintenancePlanCheck, {
    onSuccess: (res) => {
      toastSuccess(t('common:message.success'))
      router.push({
        pathname: `${MENU_URL.CHECK_IMPLEMENT_MAINTENANCE_PLAN}/[id]`,
        query: {
          id: res.data.id,
        },
      })
      refetchGetImplementMaintenancePlanCheckDetail()
    },
    onError: (error) => {
      toastError(error, setError)
    },
  })

  const {
    data: dataGetImplementMaintenancePlanCheckDetail,
    isLoading: isLoadingGetImplementMaintenancePlanCheckDetail,
    error: errorGetImplementMaintenancePlanCheckDetail,
    refetch: refetchGetImplementMaintenancePlanCheckDetail,
  } = useQueryGetImplementMaintenancePlanCheckDetail(
    {
      planMaintenanceLineId: Number(id),
    },
    { enabled: isUpdate }
  )

  const onSubmit = handleSubmit((data) => {
    const { id, task, currentLevel } = data
    mutateImplementMaintenancePlanCheck({
      planMaintenanceId: parentId,
      planMaintenanceLineId: id,
      task,
      checkFirst: task.checkFirst,
      checkSecond: task.checkSecond,
      checkStatus: is_Level_1 ? 'PASSED_FIRST' : 'PASSED_SECOND',
    })
  })

  const onCancel = () => {
    router.push(MENU_URL.CHECK_IMPLEMENT_MAINTENANCE_PLAN)
  }

  useEffect(() => {
    if (dataGetImplementMaintenancePlanCheckDetail) {
      reset(dataGetImplementMaintenancePlanCheckDetail.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataGetImplementMaintenancePlanCheckDetail])

  return [
    {
      methods,
      isView,
      isUpdate,
      isLoadingImplementMaintenancePlanCheck,
      isLoadingGetImplementMaintenancePlanCheckDetail,
      errorImplementMaintenancePlanDetail:
        (errorGetImplementMaintenancePlanCheckDetail
          ? errorGetImplementMaintenancePlanCheckDetail
          : []) as ErrorsCode[],
      is_Level_1,
      is_passed_1,
      is_passed_2,
    },
    {
      t,
      onSubmit,
      onCancel,
    },
  ] as const
}
