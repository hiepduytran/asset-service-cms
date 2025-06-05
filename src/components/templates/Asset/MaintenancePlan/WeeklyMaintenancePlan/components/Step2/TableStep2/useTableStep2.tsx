import { TRANSLATE } from '@/routes'
import { WeeklyMaintenancePlanSave } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useFieldArray, useFormContext } from 'react-hook-form'


export const useTableStep2 = (props: {
  index: number
}) => {
  const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)
  const { control } = useFormContext<WeeklyMaintenancePlanSave>()
  const { index } = props
  const { fields: fieldsConfigMaintenance, append: appendConfigMaintenance, remove: removeConfigMaintenance } = useFieldArray({
    control,
    name: `planConfig.${index}.planConfigMaintenance`,
    keyName: 'keyConfigMaintenance'
  })

  return [
    { fieldsConfigMaintenance },
    {
      t,
      appendConfigMaintenance,
      removeConfigMaintenance,
    },
  ] as const
}
