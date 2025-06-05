import { TRANSLATE } from '@/routes'
import { DetailMaintenancesCard } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceFollow/detail/type'
import { useRouter } from 'next/router'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function useStep2() {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormContext<DetailMaintenancesCard>()
  const { handleSubmit, control } = methods
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const { fields: maintenanceCardLinesFields } = useFieldArray({
    control,
    name: 'maintenanceCardLines',
    keyName: 'key',
  })
  return [
    { methods, isView, isUpdate, maintenanceCardLinesFields },
    { t },
  ] as const
}
