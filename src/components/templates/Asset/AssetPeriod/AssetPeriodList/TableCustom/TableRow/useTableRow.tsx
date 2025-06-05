import { ColumnProps } from '@/components/organism/CoreTable'
import { toastError } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/asset/asset/getList/type'
import { getAssetPeriodParameter } from '@/service/asset/assetPeriod/getList/getAssetPeriodParameter'
import { AssetPeriodParameter } from '@/service/asset/assetPeriod/getList/getAssetPeriodParameter/type'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

type Props = {
  id: number
}

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

export const useTableRow = ({ id }: Props) => {
  const { t } = useTranslation(TRANSLATE.ASSET_PERIOD)
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
  const [listAssetPeriodParameter, setAssetPeriodParameter] = useState<
    AssetPeriodParameter[]
  >([])
  const [open, setOpen] = useState(false)

  const columns = useMemo(
    () =>
      [
        {
          header: t('accessoryPeriodDetail.accessoryCode'),
          fieldName: 'code',
        },
        {
          header: t('accessoryPeriodDetail.accessory'),
          fieldName: 'name',
        },
        {
          header: t('accessoryPeriodDetail.period'),
          fieldName: 'period',
        },
        {
          header: t('accessoryPeriodDetail.frequency'),
          fieldName: 'frequency',
        },
      ] as ColumnProps[],
    [t]
  )

  const tableData = useMemo(() => {
    return listAssetPeriodParameter?.map((item) => ({
      code: item?.code,
      name: item?.name,
      period:
        item?.period.split(' ')[1] === 'MONTH'
          ? `${item?.period.split(' ')[0]} ${t('text.month')}`
          : `${item?.period.split(' ')[0]} ${t('text.year')}`,
      frequency:
        item?.frequency.split(' ')[1] === 'HOUR'
          ? `${item?.frequency.split(' ')[0]} ${t('text.hour')}`
          : '',
    }))
  }, [t, listAssetPeriodParameter])

  const getListAssetPeriodParameter = async (id: number) => {
    try {
      await getAssetPeriodParameter({ assetPeriodId: id }).then((res) => {
        setAssetPeriodParameter(res?.data?.content)
      })
    } catch (error) {
      toastError(error)
    }
  }

  const handleOpen = (event: any) => {
    event.stopPropagation()
    getListAssetPeriodParameter(id)
    setOpen(!open)
  }
  return [
    {
      methodForm,
      open,
      tableData: tableData ?? [],
      columns,
    },
    { t, setOpen, handleOpen },
  ] as const
}
