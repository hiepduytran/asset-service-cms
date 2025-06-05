import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import CoreLoading from '@/components/molecules/CoreLoading'
import { CoreTable } from '@/components/organism/CoreTable'
import { convertWareHouse } from '@/enum'
import { StockPickingWarehouseReceipt } from '@/service/asset/recovery/getList/type'
import { Grid, Typography } from '@mui/material'
import DialogDelivery from '../DialogWarehouseReceipt'
import useAssetWarehouseReceipt from './useAssetWarehouseReceipt'

export default function AssetWarehouseReceipt(props: {
  dataStockPickingWarehouseReceipt: StockPickingWarehouseReceipt[]
}) {
  const { dataStockPickingWarehouseReceipt } = props
  const [
    {
      methods,
      columnsChild,
      tableData,
      isLoadingStockPickingWarehouseReceiptDetail,
    },
    { t, textColor },
  ] = useAssetWarehouseReceipt(props)
  const { control, getValues } = methods
  const { showDialog } = useDialog()
  return isLoadingStockPickingWarehouseReceiptDetail ? (
    <CoreLoading />
  ) : (
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
      <Grid item xs={12}>
        <Typography
          sx={{
            marginBottom: 2,
            fontWeight: 700,
          }}
        >
          {t('text.stockedAssetInformation')}
        </Typography>
        <CoreTable
          tableName='asset'
          columns={columnsChild}
          data={tableData}
          onRowClick={(id, row) => {
            getValues('state') === 'DONE' &&
              showDialog(
                <DialogDelivery
                  productId={row.product.id}
                  cardId={dataStockPickingWarehouseReceipt[0]?.id}
                />
              )
          }}
          paginationHidden
        />
      </Grid>
      <Grid item xs={12}>
        <div className='flex gap-2'>
          <Typography
            sx={{
              marginBottom: 2,
            }}
          >
            {t('text.importReceiptStatus')}:
          </Typography>
          <Typography
            sx={{
              marginBottom: 2,
            }}
          >
            {convertWareHouse(getValues('state'))}
          </Typography>
        </div>
      </Grid>
    </Grid>
  )
}
