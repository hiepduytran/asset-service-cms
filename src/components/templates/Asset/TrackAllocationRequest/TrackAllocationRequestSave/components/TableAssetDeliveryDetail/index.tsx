import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { Grid, Typography } from '@mui/material'
import useAssetDeliveryDetail from './useAssetDeliveryDetail'

export default function AssetDeliveryDetail(props: any) {
  const [{ methods }, { t }] = useAssetDeliveryDetail(props)
  const { control, getValues } = methods

  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} sm={12} md={4}>
        <CoreInput
          name='code'
          control={control}
          label='Mã phiếu nhập'
          placeholder={''}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <CoreDatePicker
          name='doneDate'
          control={control}
          label='Ngày xuất kho'
          placeholder={''}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <CoreInput
          name='employee'
          control={control}
          label='Người xuất kho'
          placeholder={''}
          value={`${getValues('employee.lastName')} ${getValues(
            'employee.firstName'
          )}`}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <CoreInput
          name='warehouse.name'
          control={control}
          label='Xuất vào kho'
          placeholder={''}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <CoreInput
          name='sourceDocument'
          control={control}
          label='Nguồn đơn'
          placeholder={''}
        />
      </Grid>
      <Grid item xs={12}>
        <CoreInput
          name='note'
          control={control}
          label='Ghi chú'
          placeholder={''}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography
          sx={{
            fontWeight: 700,
            marginBottom: 2,
          }}
        >
          {t('Thông tin tài sản xuất kho')}
        </Typography>
      </Grid>
    </Grid>
  )
}
