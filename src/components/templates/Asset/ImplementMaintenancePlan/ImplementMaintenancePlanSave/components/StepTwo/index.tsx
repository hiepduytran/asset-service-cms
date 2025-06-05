import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import PlusIcon from '@/components/icons/PlusIcon'
import { assessmentType, optionRequest } from '@/enum'
import { PRIMARY } from '@/helper/colors'
import { Box, Grid, Typography } from '@mui/material'
import { Fragment } from 'react'
import { DialogAddAccessory } from './DialogAddAccessory'
import TableTask from './TableTask'
import { useStepTwo } from './useStepTwo'

const StepTwo = () => {
  const [
    { methods, taskLineResponsesFields, isViewProp },
    { t, taskLineResponsesAppend },
  ] = useStepTwo()
  const { control, getValues, trigger } = methods

  const { showDialog } = useDialog()

  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
      {taskLineResponsesFields.map((taskLineResponsesField, index) => (
        <Fragment key={taskLineResponsesField.key}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreInput
              control={control}
              name={`task.taskLineResponses.${index}.product.name`}
              label='Phụ tùng'
              isViewProp={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreInput
              name={`task.taskLineResponses.${index}.request`}
              control={control}
              label='Yêu cầu'
              isViewProp={true}
              value={optionRequest(
                getValues(`task.taskLineResponses.${index}.request`),
                t
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <CoreInput
              control={control}
              name={`task.taskLineResponses.${index}.note`}
              label={'Ghi chú'}
              multiline={true}
              inputProps={{
                maxLength: 1000,
              }}
              isViewProp={isViewProp}
            />
          </Grid>
          <Grid item xs={12}>
            <Box className='mb-10'>
              <TableTask index={index} />
            </Box>
          </Grid>
        </Fragment>
      ))}
      {!isViewProp && (
        <Grid item xs={12}>
          <div
            className='flex items-center cursor-pointer mb-15'
            onClick={() =>
              showDialog(
                <DialogAddAccessory
                  taskLineResponsesFields={taskLineResponsesFields}
                  taskLineResponsesAppend={taskLineResponsesAppend}
                  assetAccessoryId={getValues('assetAccessoryId')}
                />
              )
            }
          >
            <PlusIcon color={PRIMARY} />
            <Typography color={PRIMARY}>{`${t(
              'text.spare_parts_generation'
            )}`}</Typography>
          </div>
        </Grid>
      )}

      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreDatePicker
          name='task.doneDate'
          control={control}
          label={t('label.doneDate')}
          required={true}
          rules={{
            required: t('common:validation.required'),
          }}
          isViewProp={isViewProp}
          trigger={trigger}
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
          required
          rules={{
            required: t('common:validation.required'),
          }}
          isViewProp={isViewProp}
        />
      </Grid>
      <Grid item xs={12}>
        <CoreInput
          name='task.note'
          control={control}
          label={'Ghi chú'}
          multiline
          inputProps={{
            maxLength: 1000,
          }}
          isViewProp={isViewProp}
        />
      </Grid>
    </Grid>
  )
}

export default StepTwo
