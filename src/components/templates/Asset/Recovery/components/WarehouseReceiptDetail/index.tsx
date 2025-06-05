import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { Grid, Typography } from '@mui/material'
import useWarehouseReceiptDetail from './useWarehouseReceiptDetail'

export default function WarehouseReceiptDetail(props: any) {
  const { dataChild } = props
  const [{ methods }, { t }] = useWarehouseReceiptDetail(props)
  const { control } = methods

  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} sm={12} md={4}>
        <CoreInput
          name='code'
          control={control}
          label={t('label.importReceiptCode')}
          placeholder={''}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <CoreDatePicker
          name='doneDate'
          control={control}
          label={t('label.stockedDate')}
          placeholder={''}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <CoreInput
          name='employee.fullName'
          control={control}
          label={t('label.stockedBy')}
          placeholder={''}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <CoreInput
          name='warehouse.name'
          control={control}
          label={t('label.stockIn')}
          placeholder={''}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <CoreInput
          name='sourceDocument'
          control={control}
          label={t('label.orderSource')}
          placeholder={''}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <CoreInput
          name='note'
          control={control}
          label={t('label.note')}
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
          {t('text.stockedAssetInformation')}
        </Typography>
      </Grid>
    </Grid>
  )
}
