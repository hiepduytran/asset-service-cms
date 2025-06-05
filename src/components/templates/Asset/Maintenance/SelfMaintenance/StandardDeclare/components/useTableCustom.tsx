import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import {
  getAllAccessory,
  getAllStandardMethod,
} from '@/service/asset/maintenance/selfMaintenance/standardDeclare/list'
import Image from 'next/image'
import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

import AutoCompleteAPICustomStandardDeclare from './AutoCompleteAPICustom'

type Props = {
  columns: ColumnProps[]
  index: number
}

export default function useTableCustom(props: Props) {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const { index } = props
  const methods = useFormContext()
  const { control, getValues, watch, setValue } = methods
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const {
    fields,
    append: appendStandard,
    remove: removeStandard,
  } = useFieldArray({
    control,
    name: `standardMethodGroups.${index}.standardMaintenanceLines`,
    keyName: 'key',
  })

  const onDeleteClean = (index2: number) => {
    removeStandard(index2)
  }

  const tableData = fields.map((item, index2) => {
    return {
      ...item,
      accessory: (
        <AutoCompleteAPICustomStandardDeclare
          name={`standardMethodGroups.${index}.standardMaintenanceLines.${index2}.product`}
          control={control}
          label=''
          placeholder={t(
            'self_maintenance.standard_declare.product.placeholder'
          )}
          rules={{
            validate: {
              isRe: (v: any) =>
                !(
                  (!!watch(
                    `standardMethodGroups.${index}.standardMaintenanceLines.${index2}.standardMethods`
                  ) ||
                    !!watch(
                      `standardMethodGroups.${index}.standardMaintenanceLines.${index2}.result`
                    )) &&
                  !watch(
                    `standardMethodGroups.${index}.standardMaintenanceLines.${index2}.product`
                  )
                ) || t('common:validation.required'),
            },
          }}
          fetchDataFn={getAllAccessory}
          params={{
            productId: getValues('product')?.id,
            notIds: watch(
              `standardMethodGroups.${index}.standardMaintenanceLines`
            )
              .map((item: any) => item.product?.id)
              .filter((item: any) => !!item),
          }}
          disabled={!watch('product')}
          namePath='product'
          labelPath='name'
          valuePath='id'
          onChangeValue={(val) => {
            if (val) {
              setValue(
                `standardMethodGroups.${index}.standardMaintenanceLines.${index2}.product`,
                val
              )
            } else {
              setValue(
                `standardMethodGroups.${index}.standardMaintenanceLines.${index2}.product`,
                null
              )
            }
          }}
        />
      ),
      standardMethod: (
        <CoreAutoCompleteAPI
          name={`standardMethodGroups.${index}.standardMaintenanceLines.${index2}.standardMethods`}
          control={control}
          label=''
          placeholder={t(
            'self_maintenance.standard_declare.standardMethods.placeholder'
          )}
          fetchDataFn={getAllStandardMethod}
          labelPath='name'
          valuePath='id'
          isCheckboxOption
          multiple
          rules={{
            validate: {
              isRe: (v: any) =>
                !(
                  (!!watch(
                    `standardMethodGroups.${index}.standardMaintenanceLines.${index2}.product`
                  ) ||
                    !!watch(
                      `standardMethodGroups.${index}.standardMaintenanceLines.${index2}.result`
                    )) &&
                  !watch(
                    `standardMethodGroups.${index}.standardMaintenanceLines.${index2}.standardMethods`
                  )
                ) || t('common:validation.required'),
            },
          }}
        />
      ),
      result: (
        <CoreInput
          name={`standardMethodGroups.${index}.standardMaintenanceLines.${index2}.result`}
          control={control}
          placeholder={t(
            'self_maintenance.standard_declare.result.placeholder'
          )}
          rules={{
            validate: {
              isRe: (v: any) =>
                !(
                  (!!watch(
                    `standardMethodGroups.${index}.standardMaintenanceLines.${index2}.standardMethods`
                  ) ||
                    !!watch(
                      `standardMethodGroups.${index}.standardMaintenanceLines.${index2}.product`
                    )) &&
                  !watch(
                    `standardMethodGroups.${index}.standardMaintenanceLines.${index2}.result`
                  )
                ) || t('common:validation.required'),
            },
          }}
        />
      ),
      action: !isView ? (
        <Image
          src={require('@/assets/svg/action/delete.svg')}
          alt='delete'
          width={16}
          height={16}
          onClick={() => {
            onDeleteClean(index2)
          }}
        />
      ) : (
        <></>
      ),
    }
  })
  return [
    { methods, tableData: tableData ? tableData : [], isView, isUpdate },
    { t, appendStandard, removeStandard, onDeleteClean },
  ] as const
}
