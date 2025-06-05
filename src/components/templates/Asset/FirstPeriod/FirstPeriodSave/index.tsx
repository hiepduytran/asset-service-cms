import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import CoreLoading from '@/components/molecules/CoreLoading'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { BLUE } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { getAssetList } from '@/service/asset/firstPeriod/save/getAssetList'
import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { Fragment } from 'react'
import { FormProvider } from 'react-hook-form'
import { useFirstPeriodSave } from './useFirstPeriodSave'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'

export default function FirstPeriodSave() {
  const [values, handles] = useFirstPeriodSave()

  const {
    methodForm,
    isView,
    fields,
    t,
    isUpdate,
    router,
    isLoadingDetail,
    isLoadingSubmit,
  } = values

  const { onSubmit, handleChangeProduct } = handles

  const { watch, control, setValue } = methodForm

  return (
    <PageWithDetail
      title={
        <div className='flex justify-between items-center'>
          <CoreBreadcrumbs
            breadcrumbs={[
              {
                title: <Typography>Bảo dưỡng</Typography>,
              },
              {
                title: <Typography>Cấu hình</Typography>,
              },
              {
                title: <Typography color={BLUE}>Khai báo đầu kì</Typography>,
                pathname: MENU_URL.FIRST_PERIOD,
              },
              {
                title: getTitleBreadcrumbs(t, isView, isUpdate),
              },
            ]}
          />
        </div>
      }
      tabName={'Chi tiết'}
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
                  label={t('label.productCode')}
                  placeholder={t('placeholder.asset')}
                  valuePath='id'
                  labelPath='code'
                  name='asset'
                  fetchDataFn={getAssetList}
                  required={true}
                  isViewProp={isView}
                  rules={{
                    required: t('common:validation.required'),
                  }}
                  onChangeValue={(val) => {
                    setValue('assetName', val?.product.name ?? '')
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
              <Grid item xs={12}>
                <Typography fontSize={'14px'} marginTop={1} fontWeight={700}>
                  Ảnh tài sản
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box className='flex gap-10 mb-10'>
                  {!!watch('asset') &&
                    watch('asset')?.images?.map((item, index) => (
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
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreDatePicker
                  control={control}
                  name='lastMaintenanceDate'
                  label={t('label.lastMaintenanceDate')}
                  disableFuture
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}></Grid>

              <Grid item xs={12}>
                <Typography
                  fontSize={'14px'}
                  marginTop={2}
                  marginBottom={3}
                  fontWeight={700}
                >
                  Chi tiết phụ tùng
                </Typography>
              </Grid>
              {fields.map((field, index) => {
                return (
                  <Fragment key={'key' + index}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <Box className='mb-10'>
                        <CoreInput
                          control={control}
                          name=''
                          label={t('label.accessory')}
                          defaultValue={
                            watch(`assetFirstPeriodLines.${index}`)?.name
                          }
                          isViewProp={true}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreDatePicker
                        control={control}
                        name={`assetFirstPeriodLines.${index}.lastMaintenanceDate`}
                        label={t('label.lastMaintenanceDate')}
                        disableFuture
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}></Grid>
                  </Fragment>
                )
              })}
            </Grid>

            {!isView && (
              <div className='space-x-12 text-center mt-10'>
                <CoreButton
                  theme='cancel'
                  onClick={() => {
                    router.push(`${MENU_URL.FIRST_PERIOD}`)
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
