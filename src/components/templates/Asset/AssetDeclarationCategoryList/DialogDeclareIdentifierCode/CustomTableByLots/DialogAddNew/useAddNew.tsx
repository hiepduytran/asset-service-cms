import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog2 } from '@/components/hooks/dialog/useDialog'
import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { getListPartner } from '@/service/resource/getPartner'
import { getListCountry } from '@/service/resource/countries'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo } from 'react'
import { getListProducer } from '@/service/product/getListProducer'
import { REGEX } from '@/helper/regex'
import { generateCode } from '@/service/asset/initialAllocatedAssets/save/generateCode'
import { toastError } from '@/toast'

export const useAddNew = (props: any) => {
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    quantityIdentified,
    index,
    index1,
    index2,
    productId,
    productCategory,
    uomId,
    sku,
  } = props
  const { t } = useTranslation(TRANSLATE.ASSET_DECLARATION_CATEGORY_LIST)
  const { hideDialog2 } = useDialog2()
  const columns = useMemo(
    () =>
      [
        {
          header: t('table.serialAndIdentifierCode'),
          fieldName: 'serialAndIdentifierCode',
        },
        {
          header: t('table.origin'),
          fieldName: 'origin',
        },
        {
          header: t('table.manufacturer'),
          fieldName: 'manufacturer',
        },
        {
          header: t('table.supplier'),
          fieldName: 'supplier',
        },
        {
          header: t('table.dateOfPurchase'),
          fieldName: 'dateOfPurchase',
        },
        {
          header: t('table.dateOfUse'),
          fieldName: 'dateOfUse',
        },
      ] as ColumnProps[],
    [t]
  )

  useEffect(() => {
    Array.from({
      length: quantityIdentified,
    }, (_, index3) => {
      setValue(
        `pickIn.${index}.locationLot.${index1}.lot.${index2}.asset.${index3}.product`, { id: productId })
      setValue(
        `pickIn.${index}.locationLot.${index1}.lot.${index2}.asset.${index3}.category`, productCategory)
      setValue(
        `pickIn.${index}.locationLot.${index1}.lot.${index2}.asset.${index3}.uom`, {
        id: uomId
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, index1, index2, productCategory, productId, quantityIdentified]);

  const dataTable = Array.from(
    {
      length: quantityIdentified,
    },
    (_, index3) => {
      return {
        serialAndIdentifierCode: (
          <CoreInput
            control={control}
            name={`pickIn.${index}.locationLot.${index1}.lot.${index2}.asset.${index3}.code`}
            label=''
            placeholder={t('placeholder.serialAndIdentifierCode')}
            required
            rules={{
              required: t('common:validation.required'),
              pattern: {
                value: REGEX.CODE_NEW,
                message: t('common:validation.code_new'),
              },
            }}
            inputProps={{
              maxLength: 50,
            }}
          />
        ),
        origin: (
          <CoreAutoCompleteAPI
            control={control}
            name={`pickIn.${index}.locationLot.${index1}.lot.${index2}.asset.${index3}.country`}
            label=''
            placeholder={t('placeholder.origin')}
            fetchDataFn={getListCountry}
          />
        ),
        manufacturer: (
          <CoreAutoCompleteAPI
            control={control}
            name={`pickIn.${index}.locationLot.${index1}.lot.${index2}.asset.${index3}.partner`}
            label=''
            placeholder={t('placeholder.manufacturer')}
            fetchDataFn={getListPartner}
          />
        ),
        supplier: (
          <CoreAutoCompleteAPI
            control={control}
            name={`pickIn.${index}.locationLot.${index1}.lot.${index2}.asset.${index3}.producer`}
            label=''
            placeholder={t('placeholder.supplier')}
            fetchDataFn={getListProducer}
            params={{
              productId: productId
            }}
          />
        ),
        dateOfPurchase: (
          <CoreDatePicker
            control={control}
            name={`pickIn.${index}.locationLot.${index1}.lot.${index2}.asset.${index3}.orderDate`}
            label=''
            placeholder={`${t('placeholder.dateOfPurchase')}`}
          />
        ),
        dateOfUse: (
          <CoreDatePicker
            control={control}
            name={`pickIn.${index}.locationLot.${index1}.lot.${index2}.asset.${index3}.startDate`}
            label=''
            placeholder={`${t('placeholder.dateOfUse')}`}
            minDate={watch(`pickIn.${index}.locationLot.${index1}.lot.${index2}.asset.${index3}.orderDate`)}
          />
        ),
      }
    }
  )

  const onSubmit = handleSubmit(async () => {
    setValue(`pickIn.${index}.locationLot.${index1}.lot.${index2}.isSubmit`, true)
    hideDialog2()
  })

  const onCancel = () => {
    // setValue(`pickIn.${index}.locationLot.${index1}.lot.${index2}.asset`, [])
    hideDialog2()
  }

  const autoGen = async () => {
    try {
      const res = await generateCode({
        sku,
        lot: watch(`pickIn.${index}.locationLot.${index1}.lot.${index2}.code`),
        length: quantityIdentified,
        checkingType: 'LOTS',
        isInitialAsset: false,
      })
      Array.from({ length: quantityIdentified }, (_, index3) => {
        setValue(
          `pickIn.${index}.locationLot.${index1}.lot.${index2}.asset.${index3}.code`, res?.data?.lot?.[index3]?.code)
      })
    } catch (error) {
      toastError(error)
    }
  }

  return [
    {
      columns,
      dataTable,
    },
    { t, onSubmit, onCancel, autoGen },
  ] as const
}
