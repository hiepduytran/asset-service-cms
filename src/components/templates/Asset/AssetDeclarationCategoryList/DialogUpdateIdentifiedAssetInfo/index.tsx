import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { Box, Collapse, Grid, IconButton, Typography } from '@mui/material'
import { useUpdateIdentifiedAssetInfo } from './useUpdateIdentifiedAssetInfo'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreLoading from '@/components/molecules/CoreLoading'
import CustomTable from './CustomTable'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { FormProvider } from 'react-hook-form'

export const DialogUpdateIdentifiedAssetInfo = (props: any) => {
  const { hideDialog } = useDialog()
  const [values, handles] = useUpdateIdentifiedAssetInfo(props)
  const {
    methodForm,
    isLoadingReceipt,
    isLoadingDetail,
    isLoadingSubmit,
    totalQuantity,
    openStates,
    isLoadingSerialLot,
    dataDetail,
  } = values
  const { t, onSubmit, handleOpen } = handles
  const { productId, sku, name, checkingType, uomName } = props
  const { control, watch } = methodForm

  return (
    <CoreDialog
      onClose={hideDialog}
      width={1200}
      title={`${t('updateIdentifiedAssetInformation')}`}
    >
      <FormProvider {...methodForm}>
        <form>
          <Box className='p-15'>
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreInput
                  control={control}
                  label={t('table.assetCode')}
                  name=''
                  value={sku}
                  isViewProp
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreInput
                  control={control}
                  label={t('table.assetName')}
                  name=''
                  value={name}
                  isViewProp
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreInput
                  control={control}
                  label={t('table.quantity')}
                  name=''
                  value={`${totalQuantity} ${uomName}`}
                  isViewProp
                />
              </Grid>
            </Grid>
          </Box>
          {isLoadingReceipt || isLoadingDetail ? (
            <CoreLoading />
          ) : (
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              {watch('pickIns')?.map((item: any, index: number) => (
                <Grid item xs={12} sm={12} md={12} lg={12} key={'key' + index}>
                  <Box className='p-8 text-[14px] font-bold w-full bg-[#DFE0EB]/25 border-2 border-solid border-[#DFE0EB] flex items-center justify-between'>
                    {t('importVoucherCode')}: {item?.code} ({item?.quantity}{' '}
                    {uomName})
                    <IconButton
                      sx={{ padding: 0 }}
                      onClick={() => handleOpen(item?.id)}
                    >
                      {openStates[item?.id] ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </Box>
                  <Collapse in={openStates[item?.id]}>
                    <CustomTable
                      productId={productId}
                      checkingType={checkingType}
                      index={index}
                      isLoadingSerialLot={isLoadingSerialLot[item?.id]}
                    />
                  </Collapse>
                </Grid>
              ))}
            </Grid>
          )}
          <Box className='px-20 py-10'>
            <Typography>
              {t('updatedAssetQuantity')}:
              <span className='font-bold ml-2'>
                {dataDetail?.pickIns?.[0]?.quantity ?? 0} {uomName}
              </span>
            </Typography>
          </Box>
          <div className='flex justify-center gap-10 py-10'>
            <CoreButton theme='cancel' onClick={hideDialog}>
              {t('common:btn.cancel')}
            </CoreButton>
            <CoreButton
              theme='submit'
              onClick={onSubmit}
              loading={isLoadingSubmit}
            >
              {t('common:btn.update')}
            </CoreButton>
          </div>
        </form>
      </FormProvider>
    </CoreDialog>
  )
}
