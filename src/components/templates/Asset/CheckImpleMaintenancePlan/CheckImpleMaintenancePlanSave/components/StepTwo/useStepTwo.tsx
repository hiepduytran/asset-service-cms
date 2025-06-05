import { TRANSLATE } from '@/routes'
import { ImplementMaintenancePlanCheckDetail } from '@/service/asset/checkImpleMaintenancePlan/action/type'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const useStepTwo = () => {
  const methods = useFormContext<ImplementMaintenancePlanCheckDetail>()
  const { t } = useTranslation(TRANSLATE.CHECK_IMPLEMENT_MAINTENANCE_PLAN)
  const { control, getValues } = methods
  const { fields: taskLineResponsesFields } = useFieldArray({
    name: 'task.taskLineResponses',
    control,
    keyName: 'key',
  })

  const is_Level_1 = getValues('currentLevel') === 'LEVEL_1'
  const is_passed_1 = getValues('checkStatus') === 'PASSED_FIRST'
  const is_passed_2 = getValues('checkStatus') === 'PASSED_SECOND'

  const convertChooseType = (chooseType: string) => {
    if (chooseType === 'INTERNAL_REPAIR') {
      return `${t('text.INTERNAL_REPAIR')}`
    } else if (chooseType === 'REPLACE') {
      return `${t('text.REPLACE')}`
    } else if (chooseType === 'OUTSOURCED_REPAIR') {
      return `${t('text.OUTSOURCED_REPAIR')}`
    } else {
      return ''
    }
  }

  return [
    { methods, taskLineResponsesFields, is_Level_1, is_passed_1, is_passed_2 },
    { t, convertChooseType },
  ] as const
}
