import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useQueryAnnualMaintenancePlanDetail } from '@/service/asset/maintenancePlan/annualMaintenancePlan/save/getDetail'
import { putApproveMaintenancePlan } from '@/service/asset/maintenancePlan/approvelMaintenancePlan/save'
import { WeeklyMaintenancePlanSave } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/type'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  code: '',
  name: '',
  plantType: '',
  planDate: '',
  endPlanDate: '',
  timeOccurred: '',
  describeStatus: '',
  propose: '',
  approveEnum: '',
  planLine: [],
  planConfig: [],
  planDescribe: [],
  planGeneral: {
    consumable: [],
    replacementMaterial: [],
  },
}

export const useApproveMaintenancePlan = () => {
  const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)
  const router = useRouter()
  const id = Number(router.query?.id)
  const methodForm = useFormCustom<WeeklyMaintenancePlanSave>({
    defaultValues,
  })

  const { handleSubmit, watch, setValue, reset, getValues } = methodForm

  const { data, isLoading, refetch } = useQueryAnnualMaintenancePlanDetail(
    { id },
    { enabled: !!id }
  )

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    putApproveMaintenancePlan,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        if (res && res.data && res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.APPROVE_MAINTENANCE_PLAN}`,
          })
        }
      },
      onError: (error) => {
        toastError(error)
      },
    }
  )

  const onSubmit = handleSubmit(async (data) => {
    mutate({
      id: id,
      status:
        watch('checkApproveLevel') === 'LEVEL_1'
          ? 'APPROVED'
          : watch('checkAccountLevel') === 'LEVEL_1'
          ? 'APPROVED_LEVEL_1'
          : 'APPROVED',
    })
  })

  const onCancel = () => {
    router.back()
  }

  const onReject = () => {
    mutate({
      id: id,
      status:
        watch('checkAccountLevel') === 'LEVEL_1' ? 'REJECT_1' : 'REJECT_2',
    })
  }

  useEffect(() => {
    if (id && data?.data) {
      const latestEndDate = data?.data?.planDescribe?.reduce(
        (latest: string | null, item: any) => {
          const currentEndDate = item?.endDate
          return currentEndDate &&
            (!latest || new Date(currentEndDate) > new Date(latest))
            ? currentEndDate
            : latest
        },
        null
      )
      reset({
        ...data?.data,
        endPlanDate: latestEndDate ? latestEndDate : '',
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
        planDescribe: data?.data?.planDescribe?.map(
          (item: any, index: number) => ({
            ...item,
            planDescribeMaintenance: item?.planDescribeMaintenance?.map(
              (item1: any, index1: number) => ({
                ...item1,
                productName: item1?.product?.name,
              })
            ),
          })
        ),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data?.data])

  return [
    {
      methodForm,
      isLoading,
      isLoadingSubmit,
      id,
      router,
    },
    {
      t,
      onSubmit,
      onCancel,
      onReject,
      watch,
      setValue,
    },
  ] as const
}
