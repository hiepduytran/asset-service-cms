import { TRANSLATE } from '@/routes'
import { WeeklyMaintenancePlanSave } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'


export const useTableStep2 = (props: {
  index: number
}) => {
  const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)
  const { control, watch } = useFormContext<WeeklyMaintenancePlanSave>()
  const { index } = props
  const { fields: fieldsConfigMaintenance, append: appendConfigMaintenance, remove: removeConfigMaintenance } = useFieldArray({
    control,
    name: `planConfig.${index}.planConfigMaintenance`,
    keyName: 'keyConfigMaintenance'
  })
  useEffect(() => {
    if (watch(`planConfig.${index}.planConfigMaintenance`).length === 0) {
      appendConfigMaintenance({
        id: null,
        accessoryId: null,
        uomName: '',
        maintenanceAccessory: null,
        uom: null,
        quantity: 0,
        problem: '',
        chooseType: null,
        planConfigLine: []
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [
    { fieldsConfigMaintenance },
    {
      t,
      appendConfigMaintenance,
      removeConfigMaintenance,
    },
  ] as const
}
