import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import { convertPlanType } from '@/enum'
import { Box, Grid, Typography } from '@mui/material'
import { useStepOne } from './useStepOne'

const StepOne = () => {
  const [
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
  ] = useStepOne()

  const { control, getValues, watch } = methods

  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreInput
          control={control}
          name='code'
          label={t('label.code')}
          isViewProp={true}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreInput
          control={control}
          name='name'
          label={t('label.name')}
          isViewProp={true}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreInput
          control={control}
          name='plantType'
          label={t('label.planType')}
          isViewProp={true}
          value={convertPlanType(getValues('plantType'))}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreInput
          name='timeOccurred'
          control={control}
          label={t('label.timeOccurred')}
          value={convertDateTime(watch('timeOccurred'))}
          isViewProp={true}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreInput
          control={control}
          name='startDate'
          label={t('label.startDate')}
          placeholder=''
          isViewProp={true}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreInput
          control={control}
          name='doneDate'
          label={t('label.doneDate')}
          placeholder=''
          isViewProp={true}
        />
      </Grid>
      <Grid item xs={12}>
        <CoreInput
          control={control}
          name='reason'
          label={t('label.reason')}
          isViewProp={true}
        />
      </Grid>
      <Grid item xs={12}>
        <CoreInput
          control={control}
          name='describeStatus'
          label={t('label.describeStatus')}
          isViewProp={true}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreInput
          control={control}
          name='asset.code'
          label={t('label.asset_code')}
          isViewProp={true}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreInput
          control={control}
          name='asset.name'
          label={t('label.asset_name')}
          isViewProp={true}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreInput
          control={control}
          name='department.code'
          label={t('label.department_code')}
          isViewProp={true}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography fontSize={14} fontWeight={700} mb={2}>
          {t('text.list_accessory')}
        </Typography>
        <CoreTable
          isShowColumnStt
          columns={columnsAccessory}
          data={tableAccessory}
          paginationHidden={true}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography fontSize={14} fontWeight={700} my={2}>
          {t('text.list_assign_plan')}
        </Typography>
        <CoreTable
          isShowColumnStt
          columns={columnsPlanDescribeMaintenance}
          data={tablePlanDescribeMaintenance}
          paginationHidden={true}
        />
      </Grid>
      <Box className='w-[calc(100%+8px)] border-[1px] border-solid border-[#DFE0EB] -mx-4 bg-[#F6F7F9] mt-15 h-[50px] flex justify-between px-7 items-center'>
        <Typography color={'#242424'} fontWeight={700}>
          {t('text.list_accessory_maintenance')}
        </Typography>
      </Box>
      <Grid item xs={12}>
        <Typography fontSize={14} fontWeight={700} my={2}>
          {t('text.accessory_consumable')}
        </Typography>
        <CoreTable
          isShowColumnStt
          columns={columnsPlanGeneral}
          data={tableConsumable}
          paginationHidden={true}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography fontSize={14} fontWeight={700} my={2}>
          {t('text.maintenance_replacement')}
        </Typography>
        <CoreTable
          isShowColumnStt
          columns={columnsPlanGeneral}
          data={tableReplacementMaterial}
          paginationHidden={true}
        />
      </Grid>
    </Grid>
  )
}

export default StepOne
