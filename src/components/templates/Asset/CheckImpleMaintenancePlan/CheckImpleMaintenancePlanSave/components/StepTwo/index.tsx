import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { assessmentType } from '@/enum'
import { Box, Grid, Typography } from '@mui/material'
import { Fragment } from 'react'
import TableTask from './TableTask'
import { useStepTwo } from './useStepTwo'

const StepTwo = () => {
  const [
    { methods, taskLineResponsesFields, is_Level_1, is_passed_1, is_passed_2 },
    { t, convertChooseType },
  ] = useStepTwo()
  const { control, getValues, trigger } = methods

  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
      {taskLineResponsesFields.map((taskLineResponsesField, index) => (
        <Fragment key={taskLineResponsesField.key}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreInput
              control={control}
              name={`task.taskLineResponses.${index}.product.name`}
              label={t('label.product')}
              isViewProp={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreInput
              name={`task.taskLineResponses.${index}.request`}
              control={control}
              label={t('label.request')}
              isViewProp={true}
              value={convertChooseType(
                getValues(`task.taskLineResponses.${index}.request`)
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <CoreInput
              control={control}
              name={`task.taskLineResponses.${index}.note`}
              label={t('label.note')}
              multiline
              isViewProp={true}
            />
          </Grid>
          <Grid item xs={12}>
            <Box className='mb-10'>
              <TableTask index={index} />
            </Box>
          </Grid>
        </Fragment>
      ))}
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreDatePicker
          name='task.doneDate'
          control={control}
          label={t('label.doneDate')}
          placeholder=''
          required
          isViewProp={true}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreAutocomplete
          name='task.assessmentType'
          options={assessmentType(t)}
          labelPath='label'
          valuePath='value'
          control={control}
          label={t('label.assessmentType')}
          placeholder=''
          required
          isViewProp={true}
        />
      </Grid>
      <Grid item xs={12}>
        <CoreInput
          name='task.note'
          control={control}
          label={t('label.note')}
          multiline
          isViewProp={true}
        />
      </Grid>

      {/* Người kiểm tra 1 */}
      {!!(getValues('task.checkFirst.assessmentType') || !!is_Level_1) && (
        <Fragment>
          <Grid item xs={12}>
            <Typography fontSize={14} fontWeight={700} mb={1} mt={2}>
              {t('text.people_check_first')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreAutocomplete
              name='task.checkFirst.assessmentType'
              options={assessmentType(t)}
              labelPath='label'
              valuePath='value'
              control={control}
              label={t('label.assessmentType')}
              required
              rules={{
                required: t('common:validation.required'),
              }}
              isViewProp={!is_Level_1 || is_passed_1 || is_passed_2}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreDatePicker
              name='task.checkFirst.checkDate'
              control={control}
              label={t('label.doneDate')}
              required={true}
              rules={{
                required: t('common:validation.required'),
              }}
              disableFuture
              isViewProp={!is_Level_1 || is_passed_1 || is_passed_2}
              trigger={trigger}
            />
          </Grid>
          <Grid item xs={12}>
            <CoreInput
              name='task.checkFirst.note'
              control={control}
              label={t('label.note')}
              multiline
              isViewProp={!is_Level_1 || is_passed_1 || is_passed_2}
              inputProps={{
                maxLength: 1000,
              }}
            />
          </Grid>
        </Fragment>
      )}

      {/* Người kiểm tra 2 */}
      {!!(getValues('task.checkSecond.assessmentType') || !is_Level_1) && (
        <Fragment>
          <Grid item xs={12}>
            <Typography fontSize={14} fontWeight={700} mb={1} mt={2}>
              {t('text.people_check_second')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreAutocomplete
              name='task.checkSecond.assessmentType'
              options={assessmentType(t)}
              labelPath='label'
              valuePath='value'
              control={control}
              label={t('label.assessmentType')}
              required
              rules={{
                required: t('common:validation.required'),
              }}
              isViewProp={is_Level_1 || is_passed_2}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreDatePicker
              name='task.checkSecond.checkDate'
              control={control}
              label={t('label.doneDate')}
              required={true}
              rules={{
                required: t('common:validation.required'),
              }}
              disableFuture
              isViewProp={is_Level_1 || is_passed_2}
              trigger={trigger}
            />
          </Grid>
          <Grid item xs={12}>
            <CoreInput
              name='task.checkSecond.note'
              control={control}
              label={t('label.note')}
              multiline
              isViewProp={is_Level_1 || is_passed_2}
              inputProps={{
                maxLength: 1000,
              }}
            />
          </Grid>
        </Fragment>
      )}
    </Grid>
  )
}

export default StepTwo
