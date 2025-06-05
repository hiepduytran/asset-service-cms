import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid } from '@mui/material'
import CoreInput from '@/components/atoms/CoreInput'
import TableStep2 from './TableStep2'
import { WeeklyMaintenancePlanSave } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/type'
import { useTranslation } from 'react-i18next'
import { TRANSLATE } from '@/routes'

export default function StepTwo(props: { isView: boolean }) {
  const { control, watch, setValue } =
    useFormContext<WeeklyMaintenancePlanSave>()
  const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)
  useEffect(() => {
    watch(`planLine`).forEach((item: any, index: number) => {
      setValue(`planConfig.${index}.asset`, item.asset)
      setValue(`planConfig.${index}.department`, item.department)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { isView } = props

  return (
    <>
      {watch(`planLine`).map((item: any, index: number) => {
        return (
          <Grid
            container
            spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            key={'key' + index}
          >
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name=''
                label={t('table.identifierCode')}
                isViewProp
                value={watch(`planLine.${index}.asset.code`)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name=''
                label={t('table.department')}
                isViewProp
                value={watch(`planLine.${index}.department.name`)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TableStep2 index={index} isView={isView} />
            </Grid>
          </Grid>
        )
      })}
    </>
  )
}
