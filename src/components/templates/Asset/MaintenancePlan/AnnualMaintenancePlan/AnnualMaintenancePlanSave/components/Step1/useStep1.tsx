import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { getAssetListByProductId } from '@/service/asset/allocation/save/getListAsset'
import { getDepartmentList } from '@/service/resource/getDepartmentList'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Box, IconButton } from '@mui/material'
import Image from 'next/image'
import { WeeklyMaintenancePlanSave } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/type'
import { getListAssetByDepartment } from '@/service/asset/allocation/save/getListAssetByDepartment'

export const useStep1 = (props: { isView: boolean }) => {
  const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)
  const { control, watch, setValue } =
    useFormContext<WeeklyMaintenancePlanSave>()
  const { isView } = props
  const {
    fields: fieldsStep1,
    append: appendStep1,
    remove: removeStep1,
  } = useFieldArray({
    control,
    name: 'planLine',
    keyName: 'keyStep1',
  })
  const columnsStep1 = useMemo(
    () => {
      const baseColumns = [
        {
          header: t('table.department'),
          fieldName: 'department',
        },
        {
          header: 'DIC',
          fieldName: 'dic',
        },
        {
          header: t('table.assetName'),
          fieldName: 'assetName',
        },
        {
          header: '',
          fieldName: 'deleteProduct',
        },
      ]

      if (watch('plantType') === 'YEAR') {
        baseColumns.splice(1, 0, {
          header: 'SKU',
          fieldName: 'sku',
        })
        baseColumns.splice(4, 0, {
          header: t('table.note'),
          fieldName: 'note',
        })
      }

      if (watch('plantType') === 'EMERGENCY_TROUBLESHOOTING') {
        baseColumns.splice(1, 0, {
          header: 'SKU',
          fieldName: 'sku',
        })
      }

      return baseColumns as ColumnProps[]
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, watch('plantType')]
  )

  const dataTableStep1 = fieldsStep1.map((item: any, index: number) => {
    return {
      key: item.keyStep1,
      department: (
        <CoreAutoCompleteAPI
          control={control}
          label=''
          name={`planLine.${index}.department`}
          placeholder={t('placeholder.selectDepartment')}
          fetchDataFn={getDepartmentList}
          isViewProp={
            isView ||
            watch('plantType') === 'WEEK' ||
            watch('plantType') === 'WEEKLY_INCIDENT'
          }
          onChangeValue={(value) => {
            setValue(`planLine.${index}.sku`, null)
            setValue(`planLine.${index}.asset`, null)
            setValue(`planLine.${index}.assetName`, '')
          }}
          required
          rules={{ required: t('common:validation.required') }}
        />
      ),
      sku: (
        <CoreAutoCompleteAPI
          control={control}
          label=''
          name={`planLine.${index}.sku`}
          placeholder={t('placeholder.selectSKU')}
          fetchDataFn={getListAssetByDepartment}
          params={{
            departmentIds: [watch(`planLine.${index}.department`)?.id],
          }}
          disabled={!watch(`planLine.${index}.department`)}
          onChangeValue={(value) => {
            setValue(`planLine.${index}.asset`, null)
            setValue(`planLine.${index}.assetName`, '')
          }}
          required
          rules={{ required: t('common:validation.required') }}
          valuePath='asset.id'
          labelPath='asset.name'
          labelPathDisplay={['asset.code', 'asset.name']}
        />
      ),
      dic: (
        <CoreAutoCompleteAPI
          control={control}
          label=''
          name={`planLine.${index}.asset`}
          placeholder={t('placeholder.selectDIC')}
          fetchDataFn={getAssetListByProductId}
          params={{
            productId: watch(`planLine.${index}.sku`)?.productId,
            notIn: fieldsStep1.map(
              (item, i) => watch(`planLine.${i}.asset`)?.id
            ),
          }}
          labelPath='name'
          labelPathDisplay={['name', 'code']}
          valuePath='id'
          onChangeValue={(value) => {
            if (value) {
              setValue(`planLine.${index}.assetName`, value?.name)
            } else {
              setValue(`planLine.${index}.assetName`, '')
            }
          }}
          isViewProp={
            isView ||
            watch('plantType') === 'WEEK' ||
            watch('plantType') === 'WEEKLY_INCIDENT'
          }
          disabled={!watch(`planLine.${index}.sku`)}
          required
          rules={{ required: t('common:validation.required') }}
        />
      ),
      assetName: (
        <CoreInput
          control={control}
          name={`planLine.${index}.assetName`}
          isViewProp
        />
      ),
      note: (
        <CoreInput
          control={control}
          name={`planLine.${index}.note`}
          placeholder={t('placeholder.enterNote')}
          inputProps={{
            maxLength: 1000,
          }}
        />
      ),
      deleteProduct: (
        <Box sx={{ textAlign: 'end' }}>
          {isView ||
            watch('plantType') === 'WEEK' ||
            watch('plantType') === 'WEEKLY_INCIDENT' ? null : (
            <IconButton
              onClick={() => {
                removeStep1(index)
              }}
            >
              <Image
                src={require('@/assets/svg/action/delete.svg')}
                alt='delete'
                width={16}
                height={16}
              />
            </IconButton>
          )}
        </Box>
      ),
    }
  })

  return [
    {
      columnsStep1,
      dataTableStep1,
    },
    { t, appendStep1 },
  ] as const
}
