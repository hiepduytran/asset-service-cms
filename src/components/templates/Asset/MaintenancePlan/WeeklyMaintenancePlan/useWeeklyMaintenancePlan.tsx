import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { WeeklyMaintenancePlanSave } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/type'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { incidentList, planType } from '../IncidentList/recoil'
import { useRecoilValue } from 'recoil'
import {
  postMaintenancePlan,
  postMaintenancePlanAriseWeek,
} from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save'
import {
  getIncidentListDangerousDetail,
  getIncidentListDetail,
} from '@/service/asset/maintenancePlan/incidentList/getDetail'
import { useDate } from '@/components/hooks/date/useDate'

const defaultValues = {
  code: '',
  name: '',
  plantType: '',
  planDate: '',
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

export const useWeeklyMaintenancePlan = () => {
  const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)
  const router = useRouter()
  const assets = useRecoilValue(incidentList)
  const planTypeValue = useRecoilValue(planType)
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
      if (isValid) {
        setStep(val)
      }
    }
  }

  const [accessoryList, setAccessoryList] = useState<any[]>([])

  const fetchListAccessory = async () => {
    const accessoryResults = await Promise.all(
      assets.map(async (item) => {
        const assetId = item?.asset?.id
        const cardId = item?.card?.id
        const currentShiftId = item?.currentShift?.id
        if (assetId && cardId) {
          const data =
            planTypeValue === 'WEEK'
              ? await getIncidentListDetail({ assetId, cardId })
              : planTypeValue === 'WEEKLY_INCIDENT'
              ? await getIncidentListDangerousDetail({
                  assetId,
                  cardId,
                  currentShiftId,
                })
              : await getIncidentListDetail({ assetId, cardId })
          return (
            data?.data?.content.map((accessory: any) => ({
              ...accessory,
              dic: item?.asset?.code,
              cardId: item?.card?.id,
            })) || []
          )
        }
        return null
      })
    )

    setAccessoryList(
      accessoryResults.flat().filter((result) => result !== null)
    )
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    watch('plantType') === 'WEEK'
      ? postMaintenancePlan
      : postMaintenancePlanAriseWeek,
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
        }
      },
      onError: (error) => {
        toastError(error)
      },
    }
  )

  useEffect(() => {
    if (assets.length > 0) {
      fetchListAccessory()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    reset({
      ...defaultValues,
      plantType: planTypeValue,
      timeOccurred: assets[0]?.errorDangerDate,
      planLine: assets.map((item) => ({
        ...item,
        department: item?.department,
        asset: item?.asset,
        assetName: item?.asset?.name,
        card: item?.card,
        currentShiftId: item?.currentShift?.id,
        scheduleId: item?.id,
      })),
      planConfig: assets.map((item) => {
        const accessories = accessoryList.filter(
          (accessory) =>
            accessory.dic === item?.asset?.code &&
            accessory.cardId === item?.card?.id
        )

        return {
          asset: item?.asset,
          department: item?.department,
          planConfigMaintenance: accessories.map((item2) => ({
            ...item2,
            maintenanceAccessory: {
              ...item2?.accessory,
              id: item2?.productId,
              accessoryId: item2?.accessory?.id,
              name: item2?.accessory?.name,
            },
            maintenanceAccessoryName: item2?.accessory?.name,
            uom: item2?.uom,
            uomName: item2?.uom?.name,
            quantity: 1,
            problem: item2?.status,
          })),
        }
      }),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessoryList, assets, planTypeValue])

  const onSubmit = handleSubmit(async (data) => {
    mutate({ ...data, approveEnum: 'PENDING' })
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
  return [
    {
      methodForm,
      step,
      isLoadingSubmit,
    },
    {
      t,
      onSubmit,
      onCancel,
      onDraft,
      watch,
      setValue,
      handleChangeStep,
      setStep,
    },
  ] as const
}
