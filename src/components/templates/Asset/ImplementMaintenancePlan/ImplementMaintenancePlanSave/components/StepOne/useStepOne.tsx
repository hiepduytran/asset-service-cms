import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { ImplementMaintenancePlanDetail } from '@/service/asset/implementMaintenancePlan/action/type'
import { Typography } from '@mui/material'
import { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const useStepOne = () => {
  const methods = useFormContext<ImplementMaintenancePlanDetail>()
  const { t } = useTranslation(TRANSLATE.IMPLEMENT_MAINTENANCE_PLAN)
  const { control, getValues, watch, trigger } = methods

  const isViewProp = getValues('status') === 'FINISH'

  const { fields: planDescribeMaintenanceFields } = useFieldArray({
    control,
    name: 'planDescribeMaintenance',
    keyName: 'key',
  })

  const convertDateTime = (date: string) => {
    const dateNew = new Date(date)

    const hours =
      dateNew.getHours() < 10 ? '0' + dateNew.getHours() : dateNew.getHours()
    const minutes =
      dateNew.getMinutes() < 10
        ? '0' + dateNew.getMinutes()
        : dateNew.getMinutes()

    const day =
      dateNew.getDate() < 10 ? '0' + dateNew.getDate() : dateNew.getDate()
    const month =
      dateNew.getMonth() + 1 < 10
        ? '0' + (dateNew.getMonth() + 1)
        : dateNew.getMonth() + 1
    const year = dateNew.getFullYear()

    return `${hours}:${minutes} - ${day}/${month}/${year}`
  }

  const columnsAccessory = useMemo(() => {
    return [
      {
        header: t('table.asset_name'),
        fieldName: 'asset.name',
      },
      {
        header: t('table.uom_name'),
        fieldName: 'uom.name',
      },
      {
        header: t('table.quantity'),
        fieldName: 'quantity',
      },
      {
        header: t('table.problem'),
        fieldName: 'problem',
      },
      {
        header: t('table.chooseType'),
        fieldName: 'chooseType',
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]) as ColumnProps[]
  const columnsPlanDescribeMaintenance = useMemo(() => {
    return [
      {
        header: t('table.product_name_list'),
        fieldName: 'product.name',
      },
      {
        header: t('table.maintenanceEndDate'),
        fieldName: 'maintenanceEndDate',
      },
      {
        header: t('table.content'),
        fieldName: 'content',
      },
      {
        header: t('table.implementer'),
        fieldName: 'implementer',
      },
      {
        header: t('table.supportPerson'),
        fieldName: 'supportPerson',
      },
      {
        header: t('table.numberResources'),
        fieldName: 'numberResources',
      },
      {
        header: t('table.startDate'),
        fieldName: 'startDate',
      },
      {
        header: t('table.endDate_2'),
        fieldName: 'endDate',
      },
      {
        header: t('table.actualEndDate'),
        fieldName: 'actualEndDate',
      },
      {
        header: t('table.actualQuantityDate'),
        fieldName: 'actualQuantityDate',
      },
      {
        header: t('table.actualTotalPersonnel'),
        fieldName: 'actualTotalPersonnel',
      },
      {
        header: t('table.note'),
        fieldName: 'note',
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]) as ColumnProps[]
  const columnsPlanGeneral = useMemo(() => {
    return [
      {
        header: t('table.product_name'),
        fieldName: 'product.name',
      },
      {
        header: t('table.uom_name_2'),
        fieldName: 'uom.name',
      },
      {
        header: t('table.receivedQuantity'),
        fieldName: 'receivedQuantity',
      },
      {
        header: t('table.usedQuantity'),
        fieldName: 'usedQuantity',
      },
      {
        header: t('table.remaining'),
        fieldName: 'remaining',
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]) as ColumnProps[]

  const convertChooseType = (chooseType: string) => {
    if (chooseType === 'INTERNAL_REPAIR') {
      return `${t('text.INTERNAL_REPAIR')}`
    } else if (chooseType === 'REPLACE') {
      return `${t('text.REPLACE')}`
    } else if (chooseType === 'OUTSOURCED_REPAIR') {
      return `${t('text.OUTSOURCED_REPAIR')}`
    } else {
      return ''
    }
  }

  const tableAccessory = (getValues('accessories') ?? []).map((item, index) => {
    return {
      ...item,
      chooseType: <Typography>{convertChooseType(item.chooseType)}</Typography>,
    }
  })

  const tablePlanDescribeMaintenance = (
    planDescribeMaintenanceFields ?? []
  ).map((item, index) => {
    return {
      ...item,
      actualEndDate: (
        <CoreDatePicker
          name={`planDescribeMaintenance.${index}.actualEndDate`}
          control={control}
          isViewProp={isViewProp}
          required={true}
          rules={{
            required: t('common:validation.required'),
          }}
          minDate={item.startDate}
          trigger={trigger}
        />
      ),
      actualQuantityDate: (
        <CoreInput
          name={`planDescribeMaintenance.${index}.actualQuantityDate`}
          control={control}
          placeholder={t('placeholder.actualQuantityDate')}
          type='number'
          isViewProp={isViewProp}
          required={true}
          rules={{
            required: t('common:validation.required'),
          }}
          disableNegative={true}
          disableDecimal={true}
          disableZero={true}
          maxLength={2}
        />
      ),
      actualTotalPersonnel: (
        <CoreInput
          name={`planDescribeMaintenance.${index}.actualTotalPersonnel`}
          control={control}
          placeholder={t('placeholder.actualTotalPersonnel')}
          type='number'
          isViewProp={isViewProp}
          required={true}
          rules={{
            required: t('common:validation.required'),
          }}
          disableNegative={true}
          disableDecimal={true}
          disableZero={true}
          maxLength={2}
        />
      ),

      note: (
        <CoreInput
          name={`planDescribeMaintenance.${index}.note`}
          control={control}
          placeholder={t('placeholder.note')}
          isViewProp={isViewProp}
          inputProps={{
            maxLength: 1000,
          }}
        />
      ),
    }
  })

  const tableReplacementMaterial = (
    getValues('planGeneral.replacementMaterial') ?? []
  ).map((item, index) => {
    const usedQuantity = watch(
      `planGeneral.replacementMaterial.${index}.usedQuantity`
    )
    return {
      ...item,
      usedQuantity: (
        <CoreInput
          name={`planGeneral.replacementMaterial.${index}.usedQuantity`}
          control={control}
          placeholder={t('placeholder.usedQuantity')}
          isViewProp={isViewProp}
          required={true}
          rules={{
            required: t('common:validation.required'),
          }}
          type='number'
          disableNegative={true}
          disableDecimal={true}
          disableZero={true}
          maxLength={2}
        />
      ),

      remaining: (
        <Typography
          style={{
            color: `${
              item.receivedQuantity - usedQuantity >= 0 ? '' : '#FF4956'
            }`,
          }}
        >
          {item.receivedQuantity - usedQuantity}
        </Typography>
      ),
    }
  })

  const tableConsumable = (getValues('planGeneral.consumable') ?? []).map(
    (item, index) => {
      const usedQuantity = watch(`planGeneral.consumable.${index}.usedQuantity`)
      return {
        ...item,
        usedQuantity: (
          <CoreInput
            name={`planGeneral.consumable.${index}.usedQuantity`}
            control={control}
            placeholder={t('placeholder.usedQuantity')}
            isViewProp={isViewProp}
            required={true}
            rules={{
              required: t('common:validation.required'),
            }}
            type='number'
            disableNegative={true}
            disableDecimal={true}
            disableZero={true}
            maxLength={2}
          />
        ),
        remaining: (
          <Typography
            style={{
              color: `${
                item.receivedQuantity - usedQuantity >= 0 ? '' : '#FF4956'
              }`,
            }}
          >
            {item.receivedQuantity - usedQuantity}
          </Typography>
        ),
      }
    }
  )

  return [
    {
      methods,
      columnsAccessory,
      columnsPlanDescribeMaintenance,
      columnsPlanGeneral,
      tableAccessory,
      tablePlanDescribeMaintenance,
      tableReplacementMaterial,
      tableConsumable,
    },
    { t, convertDateTime },
  ] as const
}
