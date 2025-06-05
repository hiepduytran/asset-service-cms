import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/asset/asset/getList/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

export const useTableRow = () => {
  const { t } = useTranslation(TRANSLATE.FIRST_PERIOD)
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const [open, setOpen] = useState(false)

  const columns = useMemo(
    () =>
      [
        {
          header: t('accessoryPeriodDetail.accessoryCode'),
          fieldName: 'sku',
        },
        {
          header: t('accessoryPeriodDetail.accessory'),
          fieldName: 'name',
        },
        {
          header: t('accessoryPeriodDetail.lastMaintenanceDate'),
          fieldName: 'lastMaintenanceDate',
        },
      ] as ColumnProps[],
    [t]
  )

  const handleOpen = (event: any) => {
    event.stopPropagation()
    setOpen(!open)
  }
  return [
    {
      methodForm,
      open,
      columns,
    },
    { t, setOpen, handleOpen },
  ] as const
}
