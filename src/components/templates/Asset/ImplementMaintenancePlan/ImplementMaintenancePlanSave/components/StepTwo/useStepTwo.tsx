import { TRANSLATE } from '@/routes'
import { ImplementMaintenancePlanDetail } from '@/service/asset/implementMaintenancePlan/action/type'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const useStepTwo = () => {
  const methods = useFormContext<ImplementMaintenancePlanDetail>()
  const { t } = useTranslation(TRANSLATE.IMPLEMENT_MAINTENANCE_PLAN)
  const { control, getValues } = methods
  const { fields: taskLineResponsesFields, append: taskLineResponsesAppend } =
    useFieldArray({
      name: 'task.taskLineResponses',
      control,
      keyName: 'key',
    })

  const isViewProp = getValues('status') === 'FINISH'

  return [
    { methods, taskLineResponsesFields, isViewProp },
    { t, taskLineResponsesAppend },
  ] as const
}
