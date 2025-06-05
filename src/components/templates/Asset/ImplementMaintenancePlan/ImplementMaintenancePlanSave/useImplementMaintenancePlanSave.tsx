import { findFirstError } from '@/enum'
import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import {
  putImplementMaintenancePlan,
  putImplementMaintenancePlanDraftFinish,
  useQueryGetImplementMaintenancePlanDetail,
} from '@/service/asset/implementMaintenancePlan/action'
import { ImplementMaintenancePlanDetail } from '@/service/asset/implementMaintenancePlan/action/type'
import { useQueryGetImplementMaintenancePlanTask } from '@/service/asset/implementMaintenancePlan/list'
import { ErrorsCode } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/list/type'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const defaultValues = {}

export const useImplementMaintenancePlanSave = () => {
  const { t } = useTranslation(TRANSLATE.IMPLEMENT_MAINTENANCE_PLAN)
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const [step, setStep] = useState<number>(0)
  const methods = useFormCustom<ImplementMaintenancePlanDetail>({
    defaultValues,
  })

  const {
    handleSubmit,
    setError,
    reset,
    getValues,
    watch,
    formState: { errors },
    trigger,
    setValue,
    setFocus,
  } = methods

  const isViewProp = getValues('status') === 'FINISH'
  const isStatusDraft = getValues('status') === 'IN_PROCESS'
  const parentId = getValues('parentId')

  const [assetId, setAssetId] = useState<number>(NaN)
  const [planMaintenanceId, setPlanMaintenanceId] = useState<number>(NaN)
  const [isLoadingPage, setIsLoadingPage] = useState(true)

  const handleChangeStep = async (val: number) => {
    if (val === 0) {
      setStep(val)
    } else {
      await trigger()
      if (errors && Object.keys(errors).length > 0) {
        const firstErrorKey = findFirstError(errors)
        if (firstErrorKey) {
          setFocus(firstErrorKey)
        }
      } else {
        setStep(val)
      }
    }
  }

  const { mutate: mutateFinish, isLoading: isLoadingFinish } = useMutation(
    isStatusDraft
      ? putImplementMaintenancePlanDraftFinish
      : putImplementMaintenancePlan,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.IMPLEMENT_MAINTENANCE_PLAN}/[id]`,
          query: {
            id: res.data.id,
          },
        })
        refetchImplementMaintenancePlanDetail()
      },
      onError: (error) => {
        toastError(error, setError)
      },
    }
  )
  const { mutate: mutateDraft, isLoading: isLoadingDraft } = useMutation(
    putImplementMaintenancePlan,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.IMPLEMENT_MAINTENANCE_PLAN}/[id]`,
          query: {
            id: res.data.id,
          },
        })
        refetchImplementMaintenancePlanDetail()
      },
      onError: (error) => {
        toastError(error, setError)
      },
    }
  )

  const {
    data: dataImplementMaintenancePlanDetail,
    isLoading: isLoadingImplementMaintenancePlanDetail,
    error: errorImplementMaintenancePlanDetail,
    refetch: refetchImplementMaintenancePlanDetail,
  } = useQueryGetImplementMaintenancePlanDetail(
    {
      planMaintenanceLineId: Number(id),
    },
    { enabled: isUpdate }
  )

  useEffect(() => {
    if (dataImplementMaintenancePlanDetail) {
      setAssetId(dataImplementMaintenancePlanDetail.data.asset.id)
      setPlanMaintenanceId(dataImplementMaintenancePlanDetail.data.parentId)
    }
  }, [dataImplementMaintenancePlanDetail])

  const {
    data: dataImplementMaintenancePlanTask,
    isLoading: isLoadingImplementMaintenancePlanTask,
    refetch: refetchImplementMaintenancePlanTask,
  } = useQueryGetImplementMaintenancePlanTask(
    {
      assetId: assetId,
      planMaintenanceId: planMaintenanceId,
    },
    {
      enabled: !!assetId && isUpdate && watch('status') === 'PENDING',
    }
  )

  useEffect(() => {
    if (dataImplementMaintenancePlanTask) {
      setValue('task_2', dataImplementMaintenancePlanTask.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataImplementMaintenancePlanTask])

  useEffect(() => {
    if (dataImplementMaintenancePlanDetail) {
      reset({
        ...dataImplementMaintenancePlanDetail.data,
        task: {
          ...dataImplementMaintenancePlanDetail.data.task,
          taskLineResponses: [
            ...(watch('task_2') || []),
            ...(dataImplementMaintenancePlanDetail.data.task
              .taskLineResponses ?? []),
          ],
        },
      })

      setValue('task_2', [])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataImplementMaintenancePlanDetail, dataImplementMaintenancePlanTask])

  const onSubmit = handleSubmit(async (data) => {
    if (step === 0) {
      setStep(1)
    } else {
      const { id, planDescribeMaintenance, planGeneral, task } = data
      mutateFinish({
        planMaintenanceId: parentId,
        planMaintenanceLineId: id,
        planDescribeMaintenance,
        planGeneral,
        task,
        status: 'FINISH',
      })
    }
  })

  const onDraft = () => {
    const { id, planDescribeMaintenance, planGeneral, task } = getValues()
    mutateDraft({
      planMaintenanceId: parentId,
      planMaintenanceLineId: id,
      planDescribeMaintenance,
      planGeneral,
      task,
      status: 'IN_PROCESS',
    })
  }

  return [
    {
      methods,
      isView,
      isUpdate,
      isLoadingFinish,
      isLoadingDraft,
      isLoadingImplementMaintenancePlanDetail,
      isLoadingImplementMaintenancePlanTask,
      isLoadingPage,
      id,
      step,
      errorImplementMaintenancePlanDetail: (errorImplementMaintenancePlanDetail
        ? errorImplementMaintenancePlanDetail
        : []) as ErrorsCode[],
      isViewProp,
    },
    { t, onSubmit, onDraft, setStep, handleChangeStep },
  ] as const
}
