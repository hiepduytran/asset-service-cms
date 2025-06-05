import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { getAccessoryCategory } from '@/service/product/getAccessoryCategory'
import { getProductsByCategory } from '@/service/product/getProductsByCategory'
import { IconButton } from '@mui/material'
import { map } from 'lodash'
import { reportWebVitals } from 'next/dist/build/templates/pages'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { RequestBody } from '@/service/asset/maintenanceAccessory/save/type'

type Props = {
  index: number
}

export const useTableMaintenanceAccessory = ({ index }: Props) => {
  const { watch, control, setValue } = useFormContext<RequestBody['POST']>()
  const { t } = useTranslation(TRANSLATE.MAINTENANCE_ACCESSORY)
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const {
    fields: maintenanceAccessoryFields,
    append: appendMaintenancePart,
    remove: removeMaintenancePart,
  } = useFieldArray({
    control,
    name: `maintenanceItems.${index}.maintenanceAccessoryChilds`,
    keyName: 'key',
  })

  const columns = useMemo(
    () =>
      [
        {
          header: 'STT',
          fieldName: 'stt',
          styleCell: {
            style: {
              width: '20px',
            },
          },
        },
        {
          header: t('label.maintenanceAccessoryType'),
          fieldName: 'category',
        },
        {
          header: t('label.maintenanceAccessory'),
          fieldName: 'product',
        },
        {
          header: t('label.quantity'),
          fieldName: 'quantity',
        },
        {
          header: '',
          fieldName: 'deleteRow',
        },
      ] as ColumnProps[],
    [t]
  )

  const dataTable = maintenanceAccessoryFields.map((item: any, index2) => {
    const category = watch(
      `maintenanceItems.${index}.maintenanceAccessoryChilds.${index2}.category`
    )

    const exceptValuesProduct = (
      watch(`maintenanceItems.${index}.maintenanceAccessoryChilds`) ?? []
    ).map((item: any) => {
      return {
        id: item?.product?.id,
        name: item?.product?.name,
      }
    })

    return {
      stt: index2 + 1,
      category: (
        <CoreAutoCompleteAPI
          control={control}
          name={`maintenanceItems.${index}.maintenanceAccessoryChilds.${index2}.category`}
          label=''
          fetchDataFn={getAccessoryCategory}
          placeholder={t('placeholder.category')}
          labelPath='name'
          valuePath='id'
          onChangeValue={() =>
            setValue(
              `maintenanceItems.${index}.maintenanceAccessoryChilds.${index2}.product`,
              null as any
            )
          }
          required={!isView}
          rules={{
            validate: {
              isRe: (v: any) =>
                !(
                  (!!watch(
                    `maintenanceItems.${index}.maintenanceAccessoryChilds.${index2}.quantity`
                  ) ||
                    !!watch(
                      `maintenanceItems.${index}.maintenanceAccessoryChilds.${index2}.product`
                    )) &&
                  !watch(
                    `maintenanceItems.${index}.maintenanceAccessoryChilds.${index2}.category`
                  )
                ) || t('common:validation.required'),
            },
          }}
        />
      ),
      product: (
        <CoreAutoCompleteAPI
          control={control}
          name={`maintenanceItems.${index}.maintenanceAccessoryChilds.${index2}.product`}
          label=''
          fetchDataFn={getProductsByCategory}
          placeholder={t('placeholder.product')}
          disabled={!category}
          params={{
            productCategoryIds: [category?.id],
          }}
          required={!isView}
          labelPath='name'
          valuePath='id'
          exceptValues={exceptValuesProduct}
          rules={{
            validate: {
              isRe: (v: any) =>
                !(
                  (!!watch(
                    `maintenanceItems.${index}.maintenanceAccessoryChilds.${index2}.quantity`
                  ) ||
                    !!watch(
                      `maintenanceItems.${index}.maintenanceAccessoryChilds.${index2}.category`
                    )) &&
                  !watch(
                    `maintenanceItems.${index}.maintenanceAccessoryChilds.${index2}.product`
                  )
                ) || t('common:validation.required'),
            },
          }}
        />
      ),
      quantity: (
        <CoreInput
          control={control}
          name={`maintenanceItems.${index}.maintenanceAccessoryChilds.${index2}.quantity`}
          label=''
          placeholder={t('placeholder.quantity')}
          type='number'
          disableNegative
          disableDecimal
          inputProps={{
            maxLength: 250,
          }}
          disableZero
          rules={{
            validate: {
              isRe: (v: any) =>
                !(
                  (!!watch(
                    `maintenanceItems.${index}.maintenanceAccessoryChilds.${index2}.category`
                  ) ||
                    !!watch(
                      `maintenanceItems.${index}.maintenanceAccessoryChilds.${index2}.product`
                    )) &&
                  !watch(
                    `maintenanceItems.${index}.maintenanceAccessoryChilds.${index2}.quantity`
                  )
                ) || t('common:validation.required'),
            },
          }}
        />
      ),
      deleteRow: !isView ? (
        <IconButton
          onClick={() => {
            removeMaintenancePart(index2)

            if (isUpdate) {
              setValue(
                'deleteItems',
                !!watch('deleteItems')
                  ? [...(watch('deleteItems') ?? []), item?.id]
                  : [item?.id]
              )
            }
          }}
        >
          <Image
            src={require('@/assets/svg/action/delete.svg')}
            alt='delete'
            width={16}
            height={16}
          />
        </IconButton>
      ) : (
        <></>
      ),
    }
  })

  return {
    columns,
    dataTable,
    isView,
    appendMaintenancePart,
    t,
  }
}
