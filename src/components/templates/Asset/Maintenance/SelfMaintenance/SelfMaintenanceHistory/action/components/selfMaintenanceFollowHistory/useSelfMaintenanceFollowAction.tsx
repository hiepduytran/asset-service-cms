import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useDetailMaintenancesCard } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceFollow/detail'
import { DetailMaintenancesCard } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceFollow/detail/type'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { dateEnum } from '../../../../SelfMaintenanceFollow/utils'

const defaultValues = {}
export default function useSelfMaintenanceFollowHistory() {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormCustom<DetailMaintenancesCard>({ defaultValues })
  const { handleSubmit, reset, getValues } = methods
  const router = useRouter()
  const { id, maintenanceCardId, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!maintenanceCardId
  const [step, setStep] = useState<number>(0)

  const {
    data: dataDetailMaintenancesCard,
    isLoading: isLoadingDetailMaintenancesCard,
  } = useDetailMaintenancesCard({
    maintenanceCardId: Number(maintenanceCardId),
  })
  const onSubmit = handleSubmit((data) => {})
  const handleChangeStep = (val: number) => {
    setStep(val)
  }

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
        standardMethodGroups:
          dataDetailMaintenancesCard.data.standardApplicableLine.map((item) => {
            return {
              standardGroup: item,
              check: true,
            }
          }),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDetailMaintenancesCard])

  return [
    { id, methods, isView, isUpdate, step, isLoadingDetailMaintenancesCard },
    { t, onSubmit, handleChangeStep },
  ] as const
}
