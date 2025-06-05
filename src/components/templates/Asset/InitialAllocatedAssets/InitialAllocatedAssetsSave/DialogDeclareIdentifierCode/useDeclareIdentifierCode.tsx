import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { getListPartner } from '@/service/resource/getPartner'
import { getListCountry } from '@/service/resource/countries'
import { useQueryListAssetByType } from '@/service/product/getListAsset'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo } from 'react'
import { REGEX } from '@/helper/regex'
import { getListProducer } from '@/service/product/getListProducer'
import { generateCode } from '@/service/asset/initialAllocatedAssets/save/generateCode'
import { toastError } from '@/toast'

export const useDeclareIdentifierCode = (props: any) => {
  const { control, setValue, handleSubmit, watch, index, requestQuantity, productId, categoryId } = props
  const { t } = useTranslation(TRANSLATE.INITIAL_ALLOCATED_ASSETS)
  const { hideDialog } = useDialog()
  const { data, isLoading } = useQueryListAssetByType(
    {
      type: 'ASSET',
      ids: [productId],
    },
    { enabled: (!!productId && requestQuantity > 0) })
  const checkingType = data?.data?.content[0]?.checkingType ?? 'DEFAULT'
  const columns = useMemo(
    () => {
      const baseColumns = [
        {
          header: t('table.identifierCode'),
          fieldName: 'identifierCode',
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
      ]
      if (checkingType === 'SERIAL') {
        baseColumns.splice(0, 1, {
          header: t('table.serialAndIdentifierCode'),
          fieldName: 'serialAndIdentifierCode',
        });
      }
      if (checkingType === 'ALL') {
        baseColumns.splice(0, 1, {
          header: t('table.lot'),
          fieldName: 'lot',
        });
        baseColumns.splice(1, 0, {
          header: t('table.serialAndIdentifierCode'),
          fieldName: 'serialAndIdentifierCode',
        });
      }
      return baseColumns as ColumnProps[]
    },
    [checkingType, t]
  )
  useEffect(() => {
    Array.from({ length: requestQuantity }, (_, index1) => {
      setValue(`assetAllocationLine.${index}.allocationLineMap.${index1}.asset.product`, {
        id: productId,
      })
    })
  }, [index, productId, requestQuantity, setValue])
  const dataTable = Array.from({ length: requestQuantity }, (_, index1) => {
    return ({
      identifierCode: (
        <CoreInput
          control={control}
          name={`assetAllocationLine.${index}.allocationLineMap.${index1}.asset.code`}
          label=""
          placeholder={t('placeholder.identifierCode')}
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
      serialAndIdentifierCode: (
        <CoreInput
          control={control}
          name={`assetAllocationLine.${index}.allocationLineMap.${index1}.asset.code`}
          label=""
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
      lot: (
        <CoreInput
          control={control}
          name={`assetAllocationLine.${index}.allocationLineMap.${index1}.asset.lotName`}
          label=""
          placeholder={t('placeholder.lot')}
          required
          rules={{ required: t('common:validation.required') }}
          onChangeValue={(value) => {
            setValue(`assetAllocationLine.${index}.allocationLineMap.${index1}.asset.lot`, {
              id: 1,
              name: value,
            })
          }}
        />
      ),
      origin: (
        <CoreAutoCompleteAPI
          control={control}
          name={`assetAllocationLine.${index}.allocationLineMap.${index1}.asset.country`}
          label=""
          placeholder={t('placeholder.origin')}
          fetchDataFn={getListCountry}
        />
      ),
      manufacturer: (
        <CoreAutoCompleteAPI
          control={control}
          name={`assetAllocationLine.${index}.allocationLineMap.${index1}.asset.partner`}
          label=""
          placeholder={t('placeholder.manufacturer')}
          fetchDataFn={getListPartner}
        />
      ),
      supplier: (
        <CoreAutoCompleteAPI
          control={control}
          name={`assetAllocationLine.${index}.allocationLineMap.${index1}.asset.producer`}
          label=""
          placeholder={t('placeholder.supplier')}
          fetchDataFn={getListProducer}
          params={{
            productId: productId,
          }}
        />
      ),
      dateOfPurchase: (
        <CoreDatePicker
          control={control}
          name={`assetAllocationLine.${index}.allocationLineMap.${index1}.asset.orderDate`}
          label=""
          placeholder='dd/mm/yyyy'
        />
      ),
      dateOfUse: (
        <CoreDatePicker
          control={control}
          name={`assetAllocationLine.${index}.allocationLineMap.${index1}.asset.startDate`}
          label=""
          placeholder='dd/mm/yyyy'
        />
      ),
    })
  })

  const onSubmit = handleSubmit(async () => {
    setValue(`assetAllocationLine.${index}.quantity`, requestQuantity)
    setValue(`assetAllocationLine.${index}.checkingType`, checkingType)
    setValue(`assetAllocationLine.${index}.category`, {
      id: categoryId
    })
    hideDialog()
  })

  const onCancel = () => {
    // setValue(`assetAllocationLine.${index}.allocationLineMap`, []);
    hideDialog();
  };

  const autoGen = async () => {
    if (checkingType === 'DEFAULT') {
      try {
        const res = await generateCode({
          sku: watch(`assetAllocationLine.${index}.sku`),
          length: requestQuantity,
          checkingType: 'DEFAULT',
          isInitialAsset: true,
        })
        Array.from({ length: requestQuantity }, (_, index1) => {
          setValue(`assetAllocationLine.${index}.allocationLineMap.${index1}.asset.code`, res?.data?.serial?.[index1]?.code)
        })
      } catch (error) {
        toastError(error)
      }
    }
    else if (checkingType === 'SERIAL') {
      try {
        const res = await generateCode({
          sku: watch(`assetAllocationLine.${index}.sku`),
          length: requestQuantity,
          checkingType: 'SERIAL',
          isInitialAsset: true,
        })
        Array.from({ length: requestQuantity }, (_, index1) => {
          setValue(`assetAllocationLine.${index}.allocationLineMap.${index1}.asset.code`, res?.data?.serial?.[index1]?.code)
        })
      } catch (error) {
        toastError(error)
      }
    }
    else if (checkingType === 'LOTS') {
      try {
        const res = await generateCode({
          sku: watch(`assetAllocationLine.${index}.sku`),
          lot: 'LODK',
          length: requestQuantity,
          checkingType: 'LOTS',
          isInitialAsset: true,
        })
        Array.from({ length: requestQuantity }, (_, index1) => {
          setValue(`assetAllocationLine.${index}.allocationLineMap.${index1}.asset.code`, res?.data?.lot?.[index1]?.code)
        })
      } catch (error) {
        toastError(error)
      }
    }
    else {
      try {
        const res = await generateCode({
          sku: watch(`assetAllocationLine.${index}.sku`),
          lot: 'LODK',
          length: requestQuantity,
          checkingType: 'ALL',
          isInitialAsset: true,
        })
        Array.from({ length: requestQuantity }, (_, index1) => {
          setValue(`assetAllocationLine.${index}.allocationLineMap.${index1}.asset.code`, res?.data?.serial?.[index1]?.code)
        })

        Array.from({ length: requestQuantity }, (_, index1) => {
          setValue(`assetAllocationLine.${index}.allocationLineMap.${index1}.asset.lotName`, (res?.data?.lot?.[index1]?.code))
          setValue(`assetAllocationLine.${index}.allocationLineMap.${index1}.asset.lot`, {
            id: 1,
            name: watch(`assetAllocationLine.${index}.allocationLineMap.${index1}.asset.lotName`),
          })
          setValue(`assetAllocationLine.${index}.allocationLineMap.${index1}.asset.code`, (res?.data?.serial?.[index1]?.code))
        })
      } catch (error) {
        toastError(error)
      }
    }
  }

  return [
    {
      columns,
      dataTable,
      control,
      isLoading,
    },
    { t, onSubmit, onCancel, autoGen },
  ] as const
}
