import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import CoreLoading from '@/components/molecules/CoreLoading'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { CoreTable } from '@/components/organism/CoreTable'
import { Grid } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import useDialogDelivery from './useDialogDelivery'
type Prop = {
  productId: number
  cardId: number
  hideDialog: () => void
  isFirstDialog: boolean
  changeIsFirstDialog: () => void
}
export default function DialogDelivery(props: Readonly<Prop>) {
  const { hideDialog } = props
  const [
    {
      methods,
      isLoadingSubmit,
      columns,
      dataTable,
      isLoadingAllocationRequestAssetList,
    },
    { t, onSubmit },
  ] = useDialogDelivery(props)
  const { control, getValues, watch } = methods

  return (
    <CoreDialog
      title={`${t('text.list_allocation')}`}
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
              <Grid item xs={12} sm={4} md={4}>
                <CoreInput
                  name='asset.code'
                  control={control}
                  label={'Mã tài sản'}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <CoreInput
                  name='asset.name'
                  control={control}
                  label={'Tên tài sản'}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <CoreInput
                  name='asset.quantity'
                  control={control}
                  label={t('label.quantity_allocation')}
                  value={`${getValues('asset.quantity')}  ${getValues(
                    'asset.uom.name'
                  )}`}
                />
              </Grid>
              <Grid item xs={12}>
                <CoreTable
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
                  disabled={(watch('asset.asset') ?? []).every(
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
