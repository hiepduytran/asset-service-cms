import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import CoreInput from '@/components/atoms/CoreInput'
import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { ImplementMaintenancePlanDetail } from '@/service/asset/implementMaintenancePlan/action/type'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type Props = {
  index: number
}

export const useTableTask = ({ index }: Props) => {
  const methods = useFormContext<ImplementMaintenancePlanDetail>()
  const { t } = useTranslation(TRANSLATE.IMPLEMENT_MAINTENANCE_PLAN)
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isView = actionType === 'VIEW'

  const isUpdate = !!id
  const { watch, control, getValues } = methods
  const { fields: taskFields, append: appendTask } = useFieldArray({
    control,
    name: `task.taskLineResponses.${index}.task`,
    keyName: 'key',
  })
  const isViewProp = getValues('status') === 'FINISH'

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
        <Box className='ml-20'>
          <CoreCheckbox
            control={control}
            label=''
            name={`task.taskLineResponses.${index}.task.${index2}.isCheck`}
            isViewProp={isViewProp}
          />
        </Box>
      ),
    }
  })
  return [
    { columns, dataTable, isView, isViewProp },
    { appendTask, t },
  ] as const
}
