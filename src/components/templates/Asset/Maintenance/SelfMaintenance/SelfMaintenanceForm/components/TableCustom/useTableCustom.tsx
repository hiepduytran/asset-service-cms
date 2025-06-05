import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import {
  getRoles,
  getShifts,
  getStandardMethods,
} from '@/service/asset/maintenance/selfMaintenance/SelfMaintenanceForm/list'
import { DetailMaintenancesCard } from '@/service/asset/maintenance/selfMaintenance/SelfMaintenanceForm/list/type'
import { Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { getAccessoryByStandardId } from '@/service/asset/maintenance/selfMaintenance/SelfMaintenanceForm/action/getAccessoryByStandardId'
import CoreAutoCompleteAPIAccessory from '../CoreAutoCompleteAPIAccessory'

type Props = {
  index: number
}
export default function useTableCustomSelfMaintenanceForm(props: Props) {
  const { index } = props
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormContext<DetailMaintenancesCard>()
  const { control, handleSubmit, getValues, watch, setValue, reset } = methods
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const {
    fields: fieldsStandardMaintenanceLines,
    append: appendStandardMaintenanceLines,
    remove: removeStandardMaintenanceLines,
  } = useFieldArray({
    control,
    name: `maintenanceCardLines.${index}.standardMaintenanceLines`,
    keyName: 'key',
  })

  const onDelete = (index: number) => {
    removeStandardMaintenanceLines(index)
  }

  const tableData = fieldsStandardMaintenanceLines.map(
    (fieldStandardMaintenanceLines, index2) => {
      return {
        product: (
          <CoreAutoCompleteAPIAccessory
            name={`maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.product`}
            control={control}
            label=''
            placeholder={t(
              'self_maintenance.standard_declare.product.placeholder'
            )}
            fetchDataFn={getAccessoryByStandardId}
            params={{
              id: watch('product')?.assetId,
              standardGroupId: watch(
                `maintenanceCardLines.${index}.standardGroup`
              )?.id,
              removeId: watch(
                `maintenanceCardLines.${index}.standardMaintenanceLines`
              )
                ?.map((item) => item.product?.id)
                .filter((item) => !!item),
            }}
            labelPath='name'
            valuePath='id'
            rules={{
              required: t('common:validation.required'),
            }}
            onChangeValue={(val: any) => {
              if (val) {
                setValue(
                  `maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.product`,
                  val.product
                )
                setValue(
                  `maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.result`,
                  val.result
                )
                setValue(
                  `maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.standardMethods`,
                  val.standardMethods
                )
              } else {
                setValue(
                  `maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.product`,
                  null
                )
                setValue(
                  `maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.result`,
                  ''
                )
                setValue(
                  `maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.standardMethods`,
                  null
                )
              }
            }}
            isViewProp={fieldStandardMaintenanceLines.isView ?? true}
          />
        ),
        result: (
          <CoreInput
            name={`maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.result`}
            control={control}
            placeholder={t(
              'self_maintenance.standard_declare.result.placeholder'
            )}
            isViewProp={true}
          />
        ),
        standardMethods: (
          <CoreAutoCompleteAPI
            name={`maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.standardMethods`}
            control={control}
            label=''
            placeholder={t(
              'self_maintenance.standard_declare.standardMethods.placeholder'
            )}
            fetchDataFn={getStandardMethods}
            labelPath='name'
            valuePath='id'
            multiple
            isViewProp={true}
          />
        ),
        groupStaff: (
          <CoreAutoCompleteAPI
            name={`maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.groupStaff`}
            control={control}
            label=''
            placeholder={t(
              'self_maintenance.self_maintenance_form.groupStaff.placeholder'
            )}
            fetchDataFn={getRoles}
            labelPath='name'
            valuePath='id'
            // rules={{
            //   required: t('common:validation.required'),
            // }}
          />
        ),
        auditGroupStaffFirst: (
          <CoreAutoCompleteAPI
            name={`maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.auditGroupStaffFirst`}
            control={control}
            label=''
            placeholder={t(
              'self_maintenance.self_maintenance_form.auditGroupStaffFirst.placeholder'
            )}
            fetchDataFn={getRoles}
            labelPath='name'
            // rules={{
            //   required: t('common:validation.required'),
            // }}
          />
        ),
        auditGroupStaffSecond: !!watch(
          `maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.auditGroupStaffFirst`
        ) ? (
          <CoreAutoCompleteAPI
            name={`maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.auditGroupStaffSecond`}
            control={control}
            label=''
            placeholder={t(
              'self_maintenance.self_maintenance_form.auditGroupStaffSecond.placeholder'
            )}
            fetchDataFn={getRoles}
            labelPath='name'
            disabled={
              !watch(
                `maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.auditGroupStaffFirst`
              )
            }
            rules={{
              validate: {
                isReq: () =>
                  !!watch(
                    `maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.auditGroupStaffFirst`
                  ) ||
                  !!watch(
                    `maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.auditGroupStaffSecond`
                  ) ||
                  t('common:validation.required'),
              },
            }}
          />
        ) : (
          <></>
        ),
        shifts: (
          <CoreAutoCompleteAPI
            name={`maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.shifts`}
            control={control}
            label=''
            placeholder={t(
              'self_maintenance.self_maintenance_form.shifts.placeholder'
            )}
            fetchDataFn={getShifts}
            labelPath='name'
            multiple
            // rules={{
            //   required: t('common:validation.required'),
            // }}
            isIconCheck={true}
          />
        ),
        frequency: (
          <CoreInput
            name={`maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.frequency`}
            control={control}
            placeholder={t(
              'self_maintenance.self_maintenance_form.frequency.placeholder'
            )}
            sx={{
              width: '100%',
            }}
            type='number'
            disableDecimal
            disableNegative
            InputProps={{
              endAdornment: (
                <Typography sx={{ paddingLeft: '6px' }} variant='body1'>
                  {`${t(
                    'self_maintenance.self_maintenance_form.frequency.text'
                  )}`}
                </Typography>
              ),
            }}
            rules={{
              required: t('common:validation.required'),
              validate: {
                isReq: (v: number) =>
                  v <= 5 || t('common:validation.number_max', { max: '5' }),
              },
            }}
          />
        ),
        note: (
          <CoreInput
            name={`maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.note`}
            control={control}
            placeholder={t(
              'self_maintenance.self_maintenance_form.note.placeholder'
            )}
          />
        ),
        action: !isView ? (
          <Image
            src={require('@/assets/svg/action/delete.svg')}
            alt='delete'
            width={16}
            height={16}
            onClick={() => {
              onDelete(index2)
            }}
          />
        ) : (
          <></>
        ),
      }
    }
  )

  const columns = useMemo(() => {
    return [
      {
        header: t('table.product'),
        fieldName: 'product',
      },
      {
        header: t('table.result'),
        fieldName: 'result',
      },
      {
        header: t('table.standardMethods'),
        fieldName: 'standardMethods',
      },
      {
        header: t('table.groupStaff'),
        fieldName: 'groupStaff',
      },
      {
        header: t('table.auditGroupStaffFirst'),
        fieldName: 'auditGroupStaffFirst',
      },
      {
        header: t('table.auditGroupStaffSecond'),
        fieldName: 'auditGroupStaffSecond',
      },
      {
        header: t('table.shifts'),
        fieldName: 'shifts',
      },
      {
        header: t('table.frequency'),
        fieldName: 'frequency',
      },
      {
        header: t('table.note'),
        fieldName: 'note',
      },
      ...(!isView
        ? [
            {
              header: '',
              fieldName: 'action',
            },
          ]
        : []),
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]) as ColumnProps[]
  return [
    { methods, tableData, isView, isUpdate, columns },
    { t, appendStandardMaintenanceLines },
  ] as const
}
