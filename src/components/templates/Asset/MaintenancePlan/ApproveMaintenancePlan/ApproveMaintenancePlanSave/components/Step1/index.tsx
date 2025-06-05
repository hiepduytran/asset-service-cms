import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import { CoreDateTimePicker } from '@/components/atoms/CoreDateTimePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { planTypeOfMaintenancePlan } from '@/enum'
import { WeeklyMaintenancePlanSave } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/type'
import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useStep1 } from './useStep1'

export default function StepOne() {
  const { control, watch } = useFormContext<WeeklyMaintenancePlanSave>()
  const [values, handles] = useStep1()
  const {} = values
  const { t } = handles
  return (
    <>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <CoreInput
            control={control}
            name='code'
            label={t('table.code')}
            isViewProp
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <CoreInput
            control={control}
            name='name'
            label={t('table.name')}
            isViewProp
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <CoreAutocomplete
            control={control}
            name='plantType'
            label={t('table.planType')}
            options={planTypeOfMaintenancePlan}
            isViewProp
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <CoreDatePicker
            control={control}
            name='planDate'
            label={t('table.planDate')}
            isViewProp
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <CoreDatePicker
            control={control}
            name='endPlanDate'
            label={t('table.endPlanDate')}
            isViewProp
          />
        </Grid>
        {(watch('plantType') === 'WEEKLY_INCIDENT' ||
          watch('plantType') === 'EMERGENCY_TROUBLESHOOTING') && (
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreDateTimePicker
              control={control}
              name='timeOccurred'
              label={t('table.timeOccurred')}
              isViewProp
            />
          </Grid>
        )}
      </Grid>
    </>
  )
}
