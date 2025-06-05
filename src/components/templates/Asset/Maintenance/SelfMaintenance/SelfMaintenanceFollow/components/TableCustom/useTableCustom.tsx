import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import Image from 'next/image'
import { InputAdornment, Typography } from '@mui/material'
import {
  getAllAccessory,
  getAllStandardMethod,
} from '@/service/asset/maintenance/selfMaintenance/standardDeclare/list'
import { DetailMaintenancesCard } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceFollow/detail/type'
import {
  getShifts,
  getStandardMethods,
} from '@/service/asset/maintenance/selfMaintenance/SelfMaintenanceForm/list'
type Props = {
  index: number
}
export default function useTableCustom(props: Props) {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const { index } = props
  const methods = useFormContext<DetailMaintenancesCard>()
  const { control, getValues, watch } = methods
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const {
    fields: standardMaintenanceLinesFields,
    append: appendStandardMaintenanceLine,
  } = useFieldArray({
    control,
    name: `maintenanceCardLines.${index}.standardMaintenanceLines`,
    keyName: 'key',
  })

  const tableData = standardMaintenanceLinesFields.map((item, index2) => {
    return {
      ...item,
      standardMethods: (
        <CoreAutoCompleteAPI
          name={`maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.standardMethods`}
          control={control}
          label=''
          placeholder='Chọn phương pháp'
          fetchDataFn={getStandardMethods}
          labelPath='name'
          valuePath='id'
          multiple
          rules={{
            required: t('common:validation.required'),
          }}
        />
      ),
      shifts: (
        <CoreAutoCompleteAPI
          name={`maintenanceCardLines.${index}.standardMaintenanceLines.${index2}.shifts`}
          control={control}
          label=''
          placeholder='Ca áp dụng'
          fetchDataFn={getShifts}
          labelPath='name'
          valuePath='id'
          multiple
          rules={{
            required: t('common:validation.required'),
          }}
        />
      ),
    }
  })

  const columns = useMemo(() => {
    return [
      {
        header: t('table.product'),
        fieldName: 'product.name',
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
        fieldName: 'groupStaff.name',
      },
      {
        header: t('table.auditGroupStaffFirst'),
        fieldName: 'auditGroupStaffFirst.name',
      },
      {
        header: t('table.auditGroupStaffSecond'),
        fieldName: 'auditGroupStaffSecond.name',
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
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]) as ColumnProps[]

  return [
    {
      isView,
      isUpdate,
      tableData,
      columns,
    },
    { t, appendStandardMaintenanceLine },
  ] as const
}
