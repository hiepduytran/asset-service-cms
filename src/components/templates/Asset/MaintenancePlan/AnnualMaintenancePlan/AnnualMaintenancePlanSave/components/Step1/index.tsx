import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import { CoreDateTimePicker } from '@/components/atoms/CoreDateTimePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import { REGEX } from '@/helper/regex'
import { WeeklyMaintenancePlanSave } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/type'
import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useStep1 } from './useStep1'

export default function StepOne(props: { isView: boolean; isUpdate: boolean }) {
  const { control, watch } = useFormContext<WeeklyMaintenancePlanSave>()
  const [values, handles] = useStep1(props)
  const { columnsStep1, dataTableStep1 } = values
  const { t, appendStep1 } = handles
  const { isView, isUpdate } = props

  return (
    <>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <CoreInput
            control={control}
            name='code'
            label={t('table.code')}
            rules={{
              pattern: {
                value: REGEX.CODE_NEW,
                message: t('common:validation.code_new'),
              },
            }}
            inputProps={{
              maxLength: 50,
            }}
            isViewProp={isView || isUpdate}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <CoreInput
            control={control}
            name='name'
            label={t('table.name')}
            required={!isView}
            rules={{
              required: t('common:validation.required'),
              validate: {
                trimRequired: (v: any) => {
                  return v.trim().length > 0 || t('common:validation.required')
                },
              },
            }}
            inputProps={{
              maxLength: 250,
            }}
            isViewProp={isView || isUpdate}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <CoreAutocomplete
            control={control}
            name='plantType'
            label={t('table.planType')}
            options={[
              ...(watch('plantType') === 'WEEK' ||
                watch('plantType') === 'WEEKLY_INCIDENT'
                ? [
                  {
                    value: 'WEEK',
                    label: t('table.week'),
                  },
                  {
                    value: 'WEEKLY_INCIDENT',
                    label: t('table.weeklyIncident'),
                  },
                ]
                : []),
              {
                value: 'YEAR',
                label: t('table.year'),
              },
              {
                value: 'EMERGENCY_TROUBLESHOOTING',
                label: t('table.emergencyTroubleshooting'),
              },
            ]}
            required={!isView}
            rules={{ required: t('common:validation.required') }}
            isViewProp={
              isView ||
              watch('plantType') === 'WEEK' ||
              watch('plantType') === 'WEEKLY_INCIDENT'
            }
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
        {(watch('plantType') === 'WEEKLY_INCIDENT' ||
          watch('plantType') === 'EMERGENCY_TROUBLESHOOTING') && (
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDateTimePicker
                control={control}
                name='timeOccurred'
                label={t('table.timeOccurred')}
                isViewProp={isView || watch('plantType') === 'WEEKLY_INCIDENT'}
                required={!isView}
                rules={{ required: t('common:validation.required') }}
              />
            </Grid>
          )}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <CoreTable
            isShowColumnStt
            columns={columnsStep1}
            data={dataTableStep1}
            paginationHidden
            actionTable={
              isView ||
                watch('plantType') === 'WEEK' ||
                watch('plantType') === 'WEEKLY_INCIDENT' ? null : (
                <ActionTable
                  columns={columnsStep1}
                  append={appendStep1}
                  defaultValueLine={{
                    department: null,
                    sku: null,
                    asset: null,
                    assetName: '',
                    note: '',
                  }}
                  action={t('btn.addAsset')}
                />
              )
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <CoreInput
            multiline
            control={control}
            name='describeStatus'
            label={t('table.describeStatus')}
            inputProps={{
              maxLength: 1000,
            }}
          />
        </Grid>
        {watch('plantType') !== 'YEAR' && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CoreInput
              multiline
              control={control}
              name='propose'
              label={t('table.propose')}
              inputProps={{
                maxLength: 1000,
              }}
            />
          </Grid>
        )}
      </Grid>
    </>
  )
}
