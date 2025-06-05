import { toastError } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/asset/asset/getList/type'
import { getAccessoryParameter } from '@/service/asset/maintenanceAccessory/getList/getAccessoryParameter'
import { AccessoryParameter } from '@/service/asset/maintenanceAccessory/getList/getAccessoryParameter/type'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

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
  const [listAccessoryParameter, setListAccessoryParameter] = useState<
    AccessoryParameter[]
  >([])
  const [open, setOpen] = useState(false)

  const getListAccessoryParameter = async (id: number) => {
    try {
      await getAccessoryParameter({ maintenanceAccessoryId: id }).then(
        (res) => {
          setListAccessoryParameter(res?.data?.content)
        }
      )
    } catch (error) {
      toastError(error)
    }
  }

  const handleOpen = (event: any) => {
    event.stopPropagation()
    getListAccessoryParameter(id)
    setOpen(!open)
  }
  return [
    {
      methodForm,
      open,
      tableData: listAccessoryParameter ?? [],
    },
    { t, setOpen, handleOpen },
  ] as const
}
