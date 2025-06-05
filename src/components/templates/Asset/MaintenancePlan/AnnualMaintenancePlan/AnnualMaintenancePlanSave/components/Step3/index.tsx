import CoreInput from '@/components/atoms/CoreInput'
import { Grid } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useStep3 } from './useStep3'
import TableStep3 from './TableStep3'
import { WeeklyMaintenancePlanSave } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/type'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getRoles } from '@/service/asset/maintenance/selfMaintenance/SelfMaintenanceForm/list'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'

export default function StepThree(props: { isView: boolean }) {
  const { control, watch } = useFormContext<WeeklyMaintenancePlanSave>()
  const [values, handles] = useStep3(props)
  const {} = values
  const { t } = handles
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
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name={`planDescribe.${index}.frequencyRecommendation`}
                label={t('table.frequencyRecommendation')}
                isViewProp
                value={
                  watch(`planDescribe.${index}.frequencyRecommendation`)
                  // + " " + watch(`planDescribe.${index}.frequencyType`)
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name={`planDescribe.${index}.frequencyReality`}
                label={t('table.frequencyReality')}
                isViewProp
                value={
                  watch(`planDescribe.${index}.frequencyReality`)
                  // + " " + watch(`planDescribe.${index}.frequencyType`)
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name={`planDescribe.${index}.responsiblePerson`}
                label={t('table.responsiblePerson')}
                isViewProp
                value={watch(`planDescribe.${index}.responsiblePerson.name`)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name={`planDescribe.${index}.startDate`}
                label={t('table.startDate')}
                isViewProp
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name={`planDescribe.${index}.endDate`}
                label={t('table.endDate')}
                isViewProp
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name={`planDescribe.${index}.auditRoleFirst`}
                label={t('table.auditRoleFirst')}
                placeholder={t('placeholder.auditRoleFirst')}
                fetchDataFn={getRoles}
                required
                rules={{ required: t('common:validation.required') }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name={`planDescribe.${index}.auditRoleSecond`}
                label={t('table.auditRoleSecond')}
                placeholder={t('placeholder.auditRoleSecond')}
                fetchDataFn={getRoles}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TableStep3 index={index} isView={isView} />
            </Grid>
          </Grid>
        )
      })}
    </>
  )
}
