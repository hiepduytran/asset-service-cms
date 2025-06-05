import { useDate } from '@/components/hooks/date/useDate'
import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import {
  postMaintenancePlanTroubleshooting,
  postMaintenancePlanYear,
  putMaintenancePlanTroubleshooting,
  putMaintenancePlanYear,
} from '@/service/asset/maintenancePlan/annualMaintenancePlan/save'
import { useQueryAnnualMaintenancePlanDetail } from '@/service/asset/maintenancePlan/annualMaintenancePlan/save/getDetail'
import {
  putMaintenancePlan,
  putMaintenancePlanAriseWeek,
} from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save'
import { WeeklyMaintenancePlanSave } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/type'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  code: '',
  name: '',
  plantType: 'YEAR',
  planDate: '',
  timeOccurred: null,
  describeStatus: '',
  propose: '',
  approveEnum: '',
  planLine: [
    {
      sku: null,
      assetName: '',
      department: null,
      asset: null,
      note: '',
    },
  ],
  planConfig: [],
  planDescribe: [],
  planGeneral: {
    consumable: [],
    replacementMaterial: [],
  },
}

export const useAnnualMaintenancePlan = () => {
  const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)
  const router = useRouter()
  const id = Number(router.query?.id)
  const { actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const { getDateNow } = useDate()
  const methodForm = useFormCustom<WeeklyMaintenancePlanSave>({
    defaultValues: {
      ...defaultValues,
      planDate: getDateNow(),
    },
  })

  const { handleSubmit, watch, setValue, reset, getValues, trigger } =
    methodForm

  const [step, setStep] = useState(0)

  const handleChangeStep = async (val: number) => {
    if (val < step) {
      setStep(val)
    } else {
      const isValid = await trigger()
      if (isValid || isView) {
        setStep(val)
      }
    }
  }

  const { data, isLoading, refetch } = useQueryAnnualMaintenancePlanDetail(
    { id },
    { enabled: !!id }
  )
  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    watch('plantType') === 'YEAR'
      ? isUpdate
        ? putMaintenancePlanYear
        : postMaintenancePlanYear
      : watch('plantType') === 'EMERGENCY_TROUBLESHOOTING'
      ? isUpdate
        ? putMaintenancePlanTroubleshooting
        : postMaintenancePlanTroubleshooting
      : watch('plantType') === 'WEEK'
      ? putMaintenancePlan
      : putMaintenancePlanAriseWeek,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        if (res && res.data && res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.ANNUAL_MAINTENANCE_PLAN}/[id]`,
            query: {
              id: res?.data?.data?.id,
              actionType: 'VIEW',
            },
          })
          refetch()
        }
      },
      onError: (error) => {
        toastError(error)
      },
    }
  )

  const onSubmit = handleSubmit(async (data) => {
    mutate({ id: id, ...data, approveEnum: 'PENDING' })
  })

  const fieldByStep = [
    [
      'code',
      'name',
      'plantType',
      'planDate',
      'describeStatus',
      'propose',
      'approveEnum',
      'planLine',
    ],
    ['planConfig'],
    ['planDescribe'],
    ['planGeneral.consumable', 'planGeneral.replacementMaterial'],
  ]

  const onDraft = async () => {
    const fieldsToValidate = fieldByStep.slice(0, step + 1).flat() as Array<
      keyof WeeklyMaintenancePlanSave
    >

    const isValid = await trigger(fieldsToValidate)

    if (isValid) {
      mutate({ ...getValues(), approveEnum: 'DRAFT' })
    }
  }
  const onCancel = () => {
    router.back()
  }

  useEffect(() => {
    if (id && data?.data) {
      reset({
        ...data?.data,
        planLine: data?.data?.planLine?.map((item: any) => ({
          ...item,
          sku: {
            ...item?.asset,
            code: item?.asset?.sku,
          },
          assetName: item?.asset?.name,
        })),
        planConfig: data?.data?.planConfig?.map((item: any, index: number) => ({
          ...item,
          planConfigMaintenance: item?.planConfigMaintenance?.map(
            (item1: any, index1: number) => ({
              ...item1,
              uomName: item1?.uom?.name,
              planConfigLine: item1?.planConfigLine?.map(
                (item2: any, index2: number) => ({
                  ...item2,
                  uomName: item2?.uom?.name,
                })
              ),
            })
          ),
        })),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data?.data])

  return [
    {
      methodForm,
      step,
      isLoading,
      isLoadingSubmit,
      id,
      isView,
      isUpdate,
      router,
    },
    {
      t,
      onSubmit,
      onDraft,
      onCancel,
      watch,
      setValue,
      handleChangeStep,
      setStep,
    },
  ] as const
}
