import { TRANSLATE } from '@/routes'
import { DetailMaintenancesCard } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceFollow/detail/type'
import { useRouter } from 'next/router'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function useStep1() {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormContext<DetailMaintenancesCard>()
  const { control } = methods
  const { handleSubmit, getValues } = methods
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const { fields: standardApplicableLineFields } = useFieldArray({
    control,
    name: 'standardApplicableLine',
    keyName: 'key',
  })

  const onCancel = () => {}

  const onDraft = () => {}
  return [
    { methods, isView, isUpdate, standardApplicableLineFields },
    { t, onCancel, onDraft },
  ] as const
}
