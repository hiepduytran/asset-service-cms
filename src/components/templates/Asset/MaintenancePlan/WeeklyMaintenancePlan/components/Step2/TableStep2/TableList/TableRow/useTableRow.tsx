import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Box, IconButton } from '@mui/material'
import Image from 'next/image'
import CoreInput from '@/components/atoms/CoreInput'
import { getMaintenanceAccessoryParameter } from '@/service/asset/maintenanceAccessory/getList/getMaintenanceAccessoryParameter'
import { WeeklyMaintenancePlanSave } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/type'
import AutoCompleteAPIStep2 from '@/components/templates/Asset/MaintenancePlan/AnnualMaintenancePlan/AnnualMaintenancePlanSave/components/Step2/AutoCompleteAPIStep2'


export const useTableRow = ({ index, index1 }: {
  index: number, index1: number
}) => {
  const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)

  const [open, setOpen] = useState(false)
  const { control, watch, setValue } = useFormContext<WeeklyMaintenancePlanSave>()
  const columns = useMemo(
    () =>
      [
        {
          header: t('table.productMaintenance'),
          fieldName: 'product',
        },
        {
          header: t('table.attribute'),
          fieldName: 'uom',
        },
        {
          header: t('table.quantity'),
          fieldName: 'quantity',
        },
        {
          header: '',
          fieldName: 'deleteProduct',
        },
      ] as ColumnProps[],
    [t]
  )

  const handleOpen = () => {
    setOpen(!open);
  };

  const { fields: fieldsConfigLine, append: appendConfigLine, remove: removeConfigLine } = useFieldArray({
    control,
    name: `planConfig.${index}.planConfigMaintenance.${index1}.planConfigLine`,
    keyName: 'keyConfigLine'
  })

  const tableData = fieldsConfigLine.map((item: any, index2: number) => {
    return {
      key: item.keyConfigLine,
      product: <AutoCompleteAPIStep2
        control={control}
        label=''
        name={`planConfig.${index}.planConfigMaintenance.${index1}.planConfigLine.${index2}.product`}
        placeholder={t('placeholder.chooseMaintenanceAccessory')}
        fetchDataFn={getMaintenanceAccessoryParameter}
        params={{ accessoryId: watch(`planConfig.${index}.planConfigMaintenance.${index1}.maintenanceAccessory.accessoryId`) }}
        onChangeValue={(data) => {
          setValue(`planConfig.${index}.planConfigMaintenance.${index1}.planConfigLine.${index2}.product`, data?.product)
          setValue(`planConfig.${index}.planConfigMaintenance.${index1}.planConfigLine.${index2}.uomName`, data?.uom?.name)
          setValue(`planConfig.${index}.planConfigMaintenance.${index1}.planConfigLine.${index2}.uom`, data?.uom)
          setValue(`planConfig.${index}.planConfigMaintenance.${index1}.planConfigLine.${index2}.type`, data?.type)
          setValue(`planConfig.${index}.planConfigMaintenance.${index1}.planConfigLine.${index2}.factoryQty`, data?.factoryQty)
          setValue(`planConfig.${index}.planConfigMaintenance.${index1}.planConfigLine.${index2}.internalQty`, data?.internalQty)
        }}
      />,
      uom: <CoreInput
        control={control}
        name={`planConfig.${index}.planConfigMaintenance.${index1}.planConfigLine.${index2}.uomName`}
        isViewProp
      />,
      quantity: <CoreInput
        control={control}
        name={`planConfig.${index}.planConfigMaintenance.${index1}.planConfigLine.${index2}.quantity`}
        placeholder={t('placeholder.enterQuantity')}
        type='number'
        disableDecimal
        disableNegative
        disableZero
        inputProps={{
          maxLength: 2,
        }}
      />,
      deleteProduct:
        <Box style={{ textAlign: 'end' }}>
          <IconButton
            onClick={() => {
              removeConfigLine(index2)
              if (fieldsConfigLine.length <= 1) {
                setOpen(false)
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
        </Box>
    }

  })
  return [
    {
      columns,
      tableData,
      open,
      fieldsConfigLine
    },
    { t, handleOpen, appendConfigLine, removeConfigLine },
  ] as const
}
