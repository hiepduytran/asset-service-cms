import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import CoreLoading from '@/components/molecules/CoreLoading'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { CoreTable } from '@/components/organism/CoreTable'
import { Grid } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import useDialogWarehouseReceipt from './useDialogWarehouseReceipt'
type Prop = {
  productId: number
  cardId: number
}
export default function DialogWarehouseReceipt(props: Readonly<Prop>) {
  const [
    {
      methods,
      isLoadingSubmit,
      columns,
      dataTable,
      isLoadingAllocationRequestAssetList,
    },
    { t, hideDialog, onSubmit },
  ] = useDialogWarehouseReceipt(props)
  const { control, getValues, watch } = methods
  return (
    <CoreDialog
      title='DANH SÁCH TÀI SẢN THU HỒI'
      onClose={hideDialog}
      width={1000}
    >
      {isLoadingAllocationRequestAssetList ? (
        <div className='py-10'>
          <CoreLoading />
        </div>
      ) : (
        <FormProvider {...methods}>
          <form className='flex flex-col py-16 px-16'>
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} sm={12} md={4}>
                <CoreInput name='code' control={control} label={'Mã tài sản'} />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <CoreInput
                  name='name'
                  control={control}
                  label={'Tên tài sản'}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <CoreInput
                  name='quantity'
                  control={control}
                  label={t('Số lượng cấp phát')}
                  value={`${getValues('quantity')}  ${getValues('uom.name')}`}
                />
              </Grid>
              <Grid item xs={12}>
                <CoreTable
                  tableName='asset_dialog'
                  columns={columns}
                  data={dataTable}
                  isShowColumnStt
                  paginationHidden
                />
              </Grid>
            </Grid>
            {
              <div className='flex justify-center gap-10 mt-10'>
                <CoreButton
                  theme='cancel'
                  onClick={() => {
                    hideDialog()
                  }}
                >
                  {t('common:btn.cancel')}
                </CoreButton>
                <CoreButton
                  theme='submit'
                  onClick={onSubmit}
                  loading={isLoadingSubmit}
                  disabled={(watch('asset') ?? []).every(
                    (item: any) => !item.imageUrls
                  )}
                >
                  {t('common:btn.confirm')}
                </CoreButton>
              </div>
            }
          </form>
        </FormProvider>
      )}
    </CoreDialog>
  )
}
