import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { Box, Grid, Typography } from '@mui/material'
import useStep1 from './useStep1'
import Image from 'next/image'

type Props = {
  handleChangeStep: (val: number) => void
}
export default function Step1(props: Props) {
  const { handleChangeStep } = props
  const [
    { methods, isView, isUpdate, standardApplicableLineFields },
    { t, onCancel, onDraft },
  ] = useStep1()
  const { control, watch } = methods
  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12}>
        <Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 3 }}>
          {`${t(
            'self_maintenance.standard_declare.info_standard'
          ).toUpperCase()}`}
        </Typography>
        <div className='flex gap-10'>
          <Grid item xs={12} sm={12} md={4}>
            <CoreInput
              name='code'
              control={control}
              label={t(
                'self_maintenance.self_maintenance_perform.maintenanceCard.label'
              )}
              placeholder={t(
                'self_maintenance.self_maintenance_perform.maintenanceCard.placeholder'
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CoreInput
              name='name'
              control={control}
              label={t(
                'self_maintenance.self_maintenance_perform.nameCard.label'
              )}
              placeholder={t(
                'self_maintenance.self_maintenance_perform.nameCard.placeholder'
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CoreDatePicker
              name='startDate'
              control={control}
              label={t('table.startDate')}
              placeholder='DD/MM/YYYY'
            />
          </Grid>
        </div>
      </Grid>

      <Grid item>
        <Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 3 }}>
          {t('self_maintenance.self_maintenance_form.info_asset').toUpperCase()}
        </Typography>
        <div className='flex gap-10'>
          <Grid xs={12} sm={12} md={4}>
            <CoreInput
              name='product.sku'
              control={control}
              label={t('self_maintenance.standard_declare.productSKU.label')}
              placeholder={''}
            />
          </Grid>
          <Grid xs={12} sm={12} md={4}>
            <CoreInput
              name='product.name'
              control={control}
              label={t(
                'self_maintenance.self_maintenance_perform.product.label'
              )}
              placeholder={t(
                'self_maintenance.self_maintenance_perform.product.placeholder'
              )}
            />
          </Grid>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography fontSize={'14px'} marginTop={1} fontWeight={700}>
          Ảnh tài sản
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box className='flex gap-10 mb-5'>
          {watch('product')?.imageUrls?.map((item, index) => (
            <div
              className='flex justify-center items-center p-2 border-[1px] border-solid border-[#DFE0EB] rounded-sm'
              key={'key' + index}
            >
              <Image
                width={100}
                height={100}
                alt=''
                className='rounded-sm'
                src={item ?? ''}
              />
            </div>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 600,
            marginBottom: 3,
            marginTop: 3,
          }}
        >
          {`${t(
            'self_maintenance.self_maintenance_form.applicable_standard'
          )}`.toUpperCase()}
        </Typography>
        <div className='flex flex-wrap'>
          {standardApplicableLineFields.map((item, index) => {
            return (
              <CoreCheckbox
                key={item.key}
                control={control}
                name={`standardApplicableLine.${index}`}
                label={item.name}
                disabled={true}
              />
            )
          })}
        </div>
      </Grid>
    </Grid>
  )
}
