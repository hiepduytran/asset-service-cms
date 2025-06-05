import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useDetailMaintenancesCard } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceFollow/detail'
import {
  createStandardMaintenanceCard,
  updateStandardMaintenanceCard,
} from '@/service/asset/maintenance/selfMaintenance/SelfMaintenanceForm/action'
import { getStandardByIds } from '@/service/asset/maintenance/selfMaintenance/SelfMaintenanceForm/list'
import { DetailMaintenancesCard } from '@/service/asset/maintenance/selfMaintenance/SelfMaintenanceForm/list/type'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { dateEnum } from '../enum'

const defaultValues = {
  isMon: false,
  isTue: false,
  isWed: false,
  isThu: false,
  isFri: false,
  isSat: false,
  isSun: false,
}

export default function useSelfMaintenanceFormAction() {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormCustom<DetailMaintenancesCard>({ defaultValues })
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    setValue,
    setError,
    trigger,
    watch,
    clearErrors,
  } = methods
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const [step, setStep] = useState<number>(0)
  const [isLoadingGetStandardByIds, setIsLoadingGetStandardByIds] =
    useState(false)

  const { mutate: mutate, isLoading: loadingSubmit } = useMutation(
    isUpdate ? updateStandardMaintenanceCard : createStandardMaintenanceCard,
    {
      onSuccess: (data) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_FORM}/[id]`,
          query: { id: data.data.id, actionType: 'VIEW' },
        })
      },
      onError: (error) => {
        toastError(error)
      },
    }
  )
  const [isStepFirst, setIsStepFirst] = useState(true)

  const {
    data: dataDetailMaintenancesCard,
    isLoading: isLoadingDetailMaintenancesCard,
  } = useDetailMaintenancesCard(
    {
      maintenanceCardId: Number(id),
    },
    { enabled: isUpdate }
  )

  const [isMon, isTue, isWed, isThu, isFri, isSat, isSun] = watch([
    'isMon',
    'isTue',
    'isWed',
    'isThu',
    'isFri',
    'isSat',
    'isSun',
  ])

  const handleChangeStep = async (val: number) => {
    let { product, standardMethodGroups } = getValues()
    if (standardMethodGroups) {
      const standardGroupIds = standardMethodGroups
        .filter((item) => {
          return item.check
        })
        .map((item) => item.standardGroup)
      if (standardGroupIds.length > 0 && product && getValues('name')) {
        try {
          setStep(val)
          if (step === 0 && isStepFirst) {
            setIsLoadingGetStandardByIds(true)
            const result = await getStandardByIds({
              id: product.assetId,
              groupStandardIds: standardGroupIds,
            })
            setValue('maintenanceCardLines', result.data.standardMethodGroups)
            setIsLoadingGetStandardByIds(false)
            setIsStepFirst(false)
            
            // Lấy ra các length của standardMaintenanceLines
            result.data.standardMethodGroups.forEach(
              (maintenanceCardLine, index) => {
                setValue(
                  `maintenanceCardLines.${index}.standardMaintenanceLinesLength`,
                  maintenanceCardLine?.standardMaintenanceLines?.length ?? 0
                )
              }
            )
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        trigger()
      }
    }
  }

  const onSubmit = handleSubmit((data) => {
    const {
      standardMethodGroups,
      applicableDayOfWeeks,
      maintenanceCardLines,
      ...rest
    } = data

    const standardApplicableLine = (
      standardMethodGroups ? standardMethodGroups : []
    )
      .filter((standard) => {
        return standard?.check
      })
      .map((item) => item.standardGroup)

    const valApplicableDayOfWeeks = [
      ...(isMon ? ['MON'] : []),
      ...(isTue ? ['TUE'] : []),
      ...(isWed ? ['WED'] : []),
      ...(isThu ? ['THU'] : []),
      ...(isFri ? ['FRI'] : []),
      ...(isSat ? ['SAT'] : []),
      ...(isSun ? ['SUN'] : []),
    ]
    if (valApplicableDayOfWeeks.length <= 0) {
      setError('applicableDayOfWeeks', {
        type: 'custom',
        message: `${t('common:validation.required')}`,
      })
    } else {
      clearErrors('applicableDayOfWeeks')
      mutate({
        ...rest,
        standardApplicableLine: standardApplicableLine,
        maintenanceCardLines: maintenanceCardLines.map(
          (maintenanceCardLine, _) => {
            return {
              ...maintenanceCardLine,
              standardMaintenanceLines:
                maintenanceCardLine.standardMaintenanceLines.map(
                  (item: any, _) => {
                    return {
                      ...item,
                      product: {
                        ...item.product,
                        sku: item.product.code,
                      },
                      frequency: Number(item.frequency),
                      frequencyType: 'TIMES',
                    }
                  }
                ),
            }
          }
        ),
        applicableDayOfWeeks: valApplicableDayOfWeeks,
        state: 'PENDING',
      })
    }
  })

  const convertApplicableDayOfWeeks = (
    dataEnum: { label: string; value: string; valueE: string }[],
    applicableDayOfWeeks: string[]
  ) => {
    return dataEnum.reduce((acc: any, item) => {
      if (applicableDayOfWeeks.includes(item.valueE)) {
        acc[item.value] = true
      }
      return acc
    }, {})
  }

  useEffect(() => {
    if (dataDetailMaintenancesCard) {
      reset({
        ...dataDetailMaintenancesCard.data,
        ...convertApplicableDayOfWeeks(
          dateEnum,
          dataDetailMaintenancesCard.data.applicableDayOfWeeks
        ),
        product: {
          ...dataDetailMaintenancesCard.data.product,
          assetId: dataDetailMaintenancesCard.data.standardMaintenanceId,
        },
        productName: dataDetailMaintenancesCard.data.product.name,
        productImageUrls: dataDetailMaintenancesCard.data.product.imageUrls,
        standardMethodGroups:
          dataDetailMaintenancesCard.data.standardApplicableLine.map((item) => {
            return {
              standardGroup: item,
              check: true,
            }
          }),
        maintenanceCardLines:
          dataDetailMaintenancesCard.data.maintenanceCardLines.map(
            (maintenanceCardLine, _) => {
              return {
                ...maintenanceCardLine,
                standardMaintenanceLines:
                  maintenanceCardLine.standardMaintenanceLines.map(
                    (item: any, _) => {
                      return {
                        ...item,
                        product: {
                          ...item.product,
                          code: item.product.sku,
                        },
                      }
                    }
                  ),
              }
            }
          ),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDetailMaintenancesCard])

  return [
    {
      id,
      router,
      methods,
      isView,
      isUpdate,
      step,
      isLoadingDetailMaintenancesCard,
      isLoadingGetStandardByIds,
      loadingSubmit,
    },
    { t, handleChangeStep, onSubmit },
  ] as const
}
