import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { Box, Collapse, Grid, IconButton, Typography } from '@mui/material'
import { useDeclareIdentifierCode } from './useDeclareIdentifierCode'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreLoading from '@/components/molecules/CoreLoading'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import CustomTableByLots from './CustomTableByLots'
import CustomTableDefault from './CustomTableDefault'
import { FormProvider } from 'react-hook-form'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'

export const DialogDeclareIdentifierCode = (props: any) => {
  const { hideDialog } = useDialog()
  const [values, handles] = useDeclareIdentifierCode(props)
  const {
    methodForm,
    openStates,
    isLoadingReceipt,
    isLoadingSerialLot,
    isLoadingDetail,
    isLoadingSubmit,
    setIndexes,
    totalQuantity,
    setTotalQuantity,
  } = values
  const { t, onSubmit, handleOpen, handleAutoGen } = handles
  const { control, watch } = methodForm
  const {
    productId,
    checkingType,
    sku,
    name,
    quantityUnidentified,
    productCategory,
    quantityIdentified,
    uomName,
    uomId,
  } = props
  return (
    <CoreDialog
      onClose={hideDialog}
      width={1200}
      title={t('declareIdentifier')}
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
                  label={t('table.undeclared')}
                  name=''
                  value={`${quantityUnidentified} ${uomName}`}
                  isViewProp
                />
              </Grid>
            </Grid>
          </Box>
          {isLoadingReceipt || isLoadingDetail ? (
            <CoreLoading />
          ) : (
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              {watch('pickIn')?.map((item: any, index: number) => (
                <Grid item xs={12} sm={12} md={12} lg={12} key={'key' + index}>
                  <Box className='p-8 text-[14px] font-bold w-full bg-[#DFE0EB]/25 border-2 border-solid border-[#DFE0EB] flex items-center justify-between'>
                    {t('importVoucherCode')}: {item?.code} ({item?.quantity}{' '}
                    {uomName})
                    <IconButton
                      sx={{ padding: 0 }}
                      onClick={(e) => handleOpen(item?.id)}
                    >
                      {openStates[item?.id] ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </Box>
                  <Collapse in={openStates[item?.id]}>
                    {checkingType === 'LOTS' ? (
                      <CustomTableByLots
                        index={index}
                        productId={productId}
                        productCategory={productCategory}
                        isLoadingSerialLot={isLoadingSerialLot[item?.id]}
                        quantityUnidentified={quantityUnidentified}
                        uomName={uomName}
                        uomId={uomId}
                        sku={sku}
                      />
                    ) : (
                      <>
                        <CoreCheckbox
                          className='px-20 pt-10'
                          control={control}
                          name={`pickIn.${index}.autoGen`}
                          label={`${t('automatic_code_generation')}`}
                          onChangeValue={(value: boolean) => {
                            if (value) {
                              handleAutoGen()
                            }
                          }}
                        />
                        <CustomTableDefault
                          index={index}
                          productId={productId}
                          productCategory={productCategory}
                          isLoadingSerialLot={isLoadingSerialLot[item?.id]}
                          setIndexes={setIndexes}
                          totalQuantity={totalQuantity}
                          setTotalQuantity={setTotalQuantity}
                          quantityUnidentified={quantityUnidentified}
                          uomName={uomName}
                          uomId={uomId}
                        />
                      </>
                    )}
                  </Collapse>
                </Grid>
              ))}
            </Grid>
          )}
          <Box className='px-20 py-10'>
            <Typography>
              {t('identifiedAssetQuantity')}:
              <span className='font-bold ml-2'>
                {quantityIdentified} {uomName}
              </span>
            </Typography>
          </Box>
          <Box className='flex justify-center gap-10 py-20'>
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
            >
              {t('common:btn.confirm')}
            </CoreButton>
          </Box>
        </form>
      </FormProvider>
    </CoreDialog>
  )
}
