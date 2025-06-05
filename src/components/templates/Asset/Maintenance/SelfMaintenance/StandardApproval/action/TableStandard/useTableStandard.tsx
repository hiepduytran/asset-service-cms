import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { getAccessoryByProductId } from '@/service/asset/maintenance/selfMaintenance/standardApproval/action/getAccessoryByProductId'
import { getAllStandardMethod } from '@/service/asset/maintenance/selfMaintenance/standardApproval/action/getAllStandardMethod'
import { StandardApproval } from '@/service/asset/maintenance/selfMaintenance/standardApproval/action/type'
import { IconButton } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type Props = {
  index: number
}

export const useTableStandard = ({ index }: Props) => {
  const { watch, control, setValue } = useFormContext<StandardApproval>()
  const { t } = useTranslation(TRANSLATE.STANDARD_APPROVAL)
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const {
    fields,
    append: appendMaintenancePart,
    remove: removeMaintenancePart,
  } = useFieldArray({
    control,
    name: `standardMethodGroups.${index}.standardMaintenanceLines`,
    keyName: 'key',
  })

  const columns = useMemo(
    () =>
      [
        {
          header: t('standardTable.product'),
          fieldName: 'product',
        },
        {
          header: t('standardTable.method'),
          fieldName: 'standardMethods',
        },
        {
          header: t('standardTable.result'),
          fieldName: 'result',
        },
      ] as ColumnProps[],
    [t]
  )

  const dataTable = fields.map((item: any, index2) => {
    return {
      product: (
        <CoreAutoCompleteAPI
          name={`standardMethodGroups.${index}.standardMaintenanceLines.${index2}.product`}
          control={control}
          label=''
          placeholder={t(
            'self_maintenance.standard_declare.product.placeholder'
          )}
          fetchDataFn={getAccessoryByProductId}
          params={{
            productId: watch('product')?.id,
          }}
          disabled={!watch('product')}
          labelPath='name'
          valuePath='id'
          rules={{
            required: t('common:validation.required'),
          }}
        />
      ),
      standardMethods: (
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
          multiple
          rules={{
            required: t('common:validation.required'),
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
            required: t('common:validation.required'),
          }}
        />
      ),
    }
  })

  return {
    columns,
    dataTable,
    isView,
    appendMaintenancePart,
  }
}
