import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import CoreInput from '@/components/atoms/CoreInput'
import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { ImplementMaintenancePlanCheckDetail } from '@/service/asset/checkImpleMaintenancePlan/action/type'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type Props = {
  index: number
}

export const useTableTask = ({ index }: Props) => {
  const methods = useFormContext<ImplementMaintenancePlanCheckDetail>()
  const { t } = useTranslation(TRANSLATE.CHECK_IMPLEMENT_MAINTENANCE_PLAN)
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const { watch, control, getValues } = methods
  const { fields: taskFields } = useFieldArray({
    control,
    name: `task.taskLineResponses.${index}.task`,
    keyName: 'key',
  })
  const is_level_1 = getValues('currentLevel') === 'LEVEL_1'
  const is_passed_1 = getValues('checkStatus') === 'PASSED_FIRST'
  const is_passed_2 = getValues('checkStatus') === 'PASSED_SECOND'

  const columns = useMemo(
    () => {
      return [
        {
          header: t('table.name_work'),
          fieldName: 'name',
        },
        {
          header: t('table.isCheck'),
          fieldName: 'isCheck',
        },
        {
          header: t('table.checkFirst'),
          fieldName: 'checkFirst',
        },
        {
          header: t('table.checkSecond'),
          fieldName: 'checkSecond',
        },
      ]
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  ) as ColumnProps[]

  const dataTable = taskFields.map((item, index2) => {
    return {
      ...item,
      name: (
        <CoreInput
          control={control}
          name={`task.taskLineResponses.${index}.task.${index2}.name`}
          label=''
          isViewProp={true}
        />
      ),
      isCheck: (
        <div className='ml-10'>
          <CoreCheckbox
            control={control}
            label=''
            name={`task.taskLineResponses.${index}.task.${index2}.isCheck`}
            isViewProp={true}
            styles={{
              opacity: 0.4,
            }}
          />
        </div>
      ),
      checkFirst: (
        <div className='ml-10'>
          <CoreCheckbox
            control={control}
            label=''
            name={`task.taskLineResponses.${index}.task.${index2}.checkFirst`}
            isViewProp={!is_level_1 || is_passed_1 || is_passed_2}
            styles={
              is_level_1
                ? null
                : {
                    opacity: 0.4,
                  }
            }
          />
        </div>
      ),
      checkSecond: (
        <div className='ml-10'>
          <CoreCheckbox
            control={control}
            name={`task.taskLineResponses.${index}.task.${index2}.checkSecond`}
            label=''
            isViewProp={is_level_1 || is_passed_2}
            styles={
              is_level_1
                ? {
                    opacity: 0.4,
                  }
                : null
            }
          />
        </div>
      ),
    }
  })
  return [{ columns, dataTable }, { t }] as const
}
