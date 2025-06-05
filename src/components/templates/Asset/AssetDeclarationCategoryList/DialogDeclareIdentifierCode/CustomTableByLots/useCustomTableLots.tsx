import { TRANSLATE } from '@/routes'
import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const useCustomTableByLots = (props: any) => {
  const { t } = useTranslation(TRANSLATE.ASSET_DECLARATION_CATEGORY_LIST)
  const { index } = props
  const { control } = useFormContext()
  const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({})

  const handleOpen = (index: number) => {
    setOpenStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const [totalIdentifiedQuantity, setTotalIdentifiedQuantity] = useState(0);

  const locationLot = useWatch({
    control,
    name: `pickIn.${index}.locationLot`,
  });

  useEffect(() => {
    if (!locationLot) return;

    const total = locationLot.reduce((acc: any, loc: any) => {
      return (
        acc +
        (loc?.lot?.reduce((subAcc: any, lot: any) => {
          return subAcc + (Number(lot.identifiedQuantity) || 0);
        }, 0) || 0)
      );
    }, 0);

    setTotalIdentifiedQuantity(total);
  }, [locationLot]);

  return [
    { openStates, totalIdentifiedQuantity },
    { handleOpen, t }] as const
}
