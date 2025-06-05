import { ColumnProps } from '@/components/organism/CoreTable'
import { toastError } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/asset/asset/getList/type'
import { getMaintenanceAccessoryParameter } from '@/service/asset/maintenanceAccessory/getList/getMaintenanceAccessoryParameter'
import { MaintenanceAccessoryParameter } from '@/service/asset/maintenanceAccessory/getList/getMaintenanceAccessoryParameter/type'
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
  const { t } = useTranslation(TRANSLATE.MAINTENANCE_ACCESSORY)
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
  const [
    listMaintenanceAccessoryParameter,
    setListMaintenanceAccessoryParameter,
  ] = useState<MaintenanceAccessoryParameter[]>([])
  const [open, setOpen] = useState(false)

  const columns = useMemo(
    () =>
      [
        {
          header: t('maintenanceAccessoryTableParamerter.maintenanceAccessory'),
          fieldName: 'maintenanceAccessory',
        },
        {
          header: t('maintenanceAccessoryTableParamerter.quantity'),
          fieldName: 'quantity',
        },
        {
          header: t('maintenanceAccessoryTableParamerter.unit'),
          fieldName: 'uomType',
        },
      ] as ColumnProps[],
    [t]
  )

  const tableData = useMemo(() => {
    return listMaintenanceAccessoryParameter?.map((item) => ({
      maintenanceAccessory: item?.product?.name,
      quantity: item?.quantity,
      uomType: item?.uomType ?? '',
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, listMaintenanceAccessoryParameter])

  const getListMaintenanceAccessoryParameter = async (id: number) => {
    try {
      await getMaintenanceAccessoryParameter({ accessoryId: id }).then(
        (res) => {
          setListMaintenanceAccessoryParameter(res?.data?.content)
        }
      )
    } catch (error) {
      toastError(error)
    }
  }

  const handleOpen = (event: any) => {
    event.stopPropagation()
    getListMaintenanceAccessoryParameter(id)
    setOpen(!open)
  }
  return [
    {
      methodForm,
      columns,
      open,
      tableData: tableData ?? [],
    },
    { t, setOpen, handleOpen },
  ] as const
}
