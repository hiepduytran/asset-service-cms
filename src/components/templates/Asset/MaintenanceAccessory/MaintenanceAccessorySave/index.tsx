import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { MENU_URL } from '@/routes'
import { getAssetList } from '@/service/asset/maintenanceAccessory/save/getAssetList'
import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { FormProvider } from 'react-hook-form'
import { DialogDelete } from './DialogDelete'
import TableMaintenanceAccessory from './TableMaintenanceAccessory'
import { useMaintenanceAccessorySave } from './useMaintenanceAccessorySave'

export default function MaintenanceAccessorySave() {
  const [values, handles] = useMaintenanceAccessorySave()

  const {
    methodForm,
    isView,
    maintenanceItemFields,
    isUpdate,
    dataDetail,
    isCreate,
    router,
    id,
    isLoadingDetail,
    isLoadingSubmit,
  } = values

  const { t, onSubmit, handleChangeProduct } = handles

  const { watch, control, setValue } = methodForm
  const { showDialog } = useDialog()

  return (
    <PageWithDetail
      title={
        <div className='flex justify-between items-center'>
          <CoreBreadcrumbs
            breadcrumbs={[
              {
                title: t('title.maintenance'),
              },
              {
                title: t('title.config'),
              },
              {
                title: t('title.maintenance_accessory'),
                pathname: MENU_URL.MAINTENANCE_ACCESSORY,
              },
              {
                title: (
                  <Typography>
                    {!!isView
                      ? t('text.view')
                      : isUpdate
                      ? t('text.edit')
                      : t('common:btn.add')}
                  </Typography>
                ),
              },
            ]}
          />
        </div>
      }
      tabName={`${t('text.view')}`}
      topAction={
        !!id && (
          <TopAction
            actionList={['edit', 'delete']}
            onEditAction={() => {
              router.replace({
                pathname: `${MENU_URL.MAINTENANCE_ACCESSORY}/[id]`,
                query: {
                  id,
                },
              })
            }}
            onDeleteAction={() =>
              showDialog(
                <DialogDelete
                  id={id}
                  backFn={() => {
                    router.push({
                      pathname: MENU_URL.MAINTENANCE_ACCESSORY,
                    })
                  }}
                />
              )
            }
            onCancelAction={() =>
              router.push({
                pathname: MENU_URL.MAINTENANCE_ACCESSORY,
              })
            }
          />
        )
      }
    >
      {isLoadingDetail ? (
        <CoreLoading />
      ) : (
        <FormProvider {...methodForm}>
          <form className='block rounded-xl mx-auto' onSubmit={onSubmit}>
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <CoreAutoCompleteAPI
                  control={control}
                  label={t('label.assetCode')}
                  placeholder={t('placeholder.asset')}
                  valuePath='id'
                  labelPath='sku'
                  name='product'
                  fetchDataFn={getAssetList}
                  searchLabel='sku'
                  required={true}
                  isViewProp={isUpdate}
                  rules={{
                    required: t('common:validation.required'),
                  }}
                  onChangeValue={(val) => {
                    setValue('assetName', val?.name ?? '')
                    handleChangeProduct()
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <CoreInput
                  control={control}
                  name='assetName'
                  label={t('label.assetName')}
                  isViewProp={true}
                />
              </Grid>

              {!!watch('product') && (
                <>
                  <Grid item xs={12}>
                    <Typography
                      fontSize={'14px'}
                      marginTop={1}
                      fontWeight={700}
                    >
                      {t('label.assetImage')}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box className='flex gap-10 mb-10'>
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
                </>
              )}

              <Grid item xs={12}>
                <Box className='space-y-15'>
                  {maintenanceItemFields.map((field, index) => {
                    return (
                      <Box key={'key' + index}>
                        <Box className='mb-10'>
                          <CoreInput
                            control={control}
                            name=''
                            label={t('label.accessory')}
                            value={
                              watch(`maintenanceItems.${index}`)?.accessory
                                ?.name
                            }
                            isViewProp={true}
                          />
                        </Box>
                        <TableMaintenanceAccessory index={index} />
                      </Box>
                    )
                  })}
                </Box>
              </Grid>
            </Grid>

            {!isView && (
              <div className='space-x-12 text-center mt-10'>
                <CoreButton
                  theme='cancel'
                  onClick={() => {
                    router.push(`${MENU_URL.MAINTENANCE_ACCESSORY}`)
                  }}
                >
                  {t('common:btn.cancel')}
                </CoreButton>
                <CoreButton
                  theme='submit'
                  type='submit'
                  loading={isLoadingSubmit}
                >
                  {isUpdate ? t('common:btn.save_change') : t('common:btn.add')}
                </CoreButton>
              </div>
            )}
          </form>
        </FormProvider>
      )}
    </PageWithDetail>
  )
}
