import { TRANSLATE } from '@/routes'
import { useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const useRowItem = (props: any) => {
  const { t } = useTranslation(TRANSLATE.ASSET_DECLARATION_CATEGORY_LIST)
  const { control, setValue } = useFormContext()
  const { index, index1, setIndexes, productId, productCategory, setTotalQuantity, uomId } = props
  const { fields, append, remove } = useFieldArray({
    control,
    name: `pickIn.${index}.locationLot.${index1}.lot.${0}.asset`,
    keyName: 'uniqueKey',
  })

  useEffect(() => {
    setIndexes({ index, index1, fieldsLength: fields.length });
    setValue(`pickIn.${index}.locationLot.${index1}.lot.${0}`, {
      id: 1,
      asset: []
    })
    fields.forEach((_, index2) => {
      setValue(
        `pickIn.${index}.locationLot.${index1}.lot.${0}.asset.${index2}.product`, { id: productId })
      setValue(
        `pickIn.${index}.locationLot.${index1}.lot.${0}.asset.${index2}.category`, productCategory)
      setValue(
        `pickIn.${index}.locationLot.${index1}.lot.${0}.asset.${index2}.uom`, {
        id: uomId
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields, index, index1, productCategory, productId]);


  const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({})

  const handleOpen = (index: number) => {
    setOpenStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const handleAppend = () => {
    setTotalQuantity((prev: number) => prev + 1)
    append({
      id: null,
      code: '',
      entity: null,
      serial: null,
      country: null,
      partner: null,
      producer: null,
      orderDate: '',
      startDate: '',
      expiredLabel: '',
      lot: null,
      product: null,
      uom: null,
      category: null,
      quantityIdentified: 0,
      quantityUnidentified: 0,
      quantityPickIn: 0,
      quantity: 0,
      quantityAsset: 0
    })
  }

  return [
    { fields, openStates },
    { append, remove, t, handleOpen, handleAppend },
  ] as const
}
