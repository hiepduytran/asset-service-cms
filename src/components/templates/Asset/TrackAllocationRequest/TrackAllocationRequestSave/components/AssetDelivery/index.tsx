import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { Grid, Typography } from '@mui/material'
import React from 'react'
import useAssetDelivery from './useAssetDelivery'
import DialogDelivery from '../DialogDelivery'
import { CoreTable } from '@/components/organism/CoreTable'
import { StockPickingDelivery } from '@/service/asset/trackAllocationRequest/getList/type'
import CoreLoading from '@/components/molecules/CoreLoading'
import { convertWareHouse } from '@/enum'
import { FormProvider } from 'react-hook-form'

export default function AssetDelivery(props: {
  dataStockPickingDeliver: StockPickingDelivery[]
}) {
  const { dataStockPickingDeliver } = props
  const [
    {
      methods,
      columnsChild,
      tableData,
      isLoadingStockPickingDeliveryDetail,
      isShowDialog,
      isFirstDialog,
    },
    { t, setIsShowDialog, hideDialog, changeIsFirstDialog },
  ] = useAssetDelivery(props)
  const { control, getValues } = methods
  return isLoadingStockPickingDeliveryDetail ? (
    <CoreLoading />
  ) : (
    <FormProvider {...methods}>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={12} md={4}>
          <CoreInput
            name='code'
            control={control}
            label={t('label.code')}
            placeholder={''}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <CoreDatePicker
            name='doneDate'
            control={control}
            label={t('label.doneDate')}
            placeholder={''}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <CoreInput
            name='employee.fullName'
            control={control}
            label={t('label.fullName')}
            placeholder={''}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <CoreInput
            name='warehouse.name'
            control={control}
            label={t('label.name')}
            placeholder={''}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <CoreInput
            name='sourceDocument'
            control={control}
            label={t('label.sourceDocument')}
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
            {t('text.info_delivery')}
          </Typography>
          <CoreTable
            tableName='asset'
            columns={columnsChild}
            data={tableData}
            onRowClick={(id, row) => {
              setIsShowDialog({
                isShow: true,
                productId: row?.product?.id,
              })
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
              {`${t('text.status_delivery')}`}
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

        {getValues('state') === 'DONE' && isShowDialog.isShow && (
          <DialogDelivery
            hideDialog={hideDialog}
            productId={isShowDialog.productId ?? 0}
            cardId={dataStockPickingDeliver[0]?.id}
            isFirstDialog={isFirstDialog}
            changeIsFirstDialog={changeIsFirstDialog}
          />
        )}
      </Grid>
    </FormProvider>
  )
}
