import CoreInput from '@/components/atoms/CoreInput'
import { Fragment } from 'react'
import { FormProvider } from 'react-hook-form'

import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { MENU_URL } from '@/routes'
import { getAssetList } from '@/service/asset/assetPeriod/save/getAssetList'
import { Box, Grid, InputAdornment, Typography } from '@mui/material'
import Image from 'next/image'
import { DialogDelete } from './DialogDelete'
import { useAssetPeriodSave } from './useAssetPeriodSave'

export default function AssetPeriodSave() {
  const [values, handles] = useAssetPeriodSave()

  const {
    methodForm,
    isView,
    fields,
    t,
    isUpdate,
    dataDetail,
    router,
    id,
    isLoadingDetail,
    isLoadingSubmit,
  } = values

  const { onSubmit, handleChangeProduct } = handles

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
                title: t('title.asset_period'),
                pathname: MENU_URL.ASSET_PERIOD,
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
                pathname: `${MENU_URL.ASSET_PERIOD}/[id]`,
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
                      pathname: MENU_URL.ASSET_PERIOD,
                    })
                  }}
                />
              )
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
                  label={t('label.productCode')}
                  placeholder={t('placeholder.asset')}
                  valuePath='id'
                  labelPath='sku'
                  name='product'
                  fetchDataFn={getAssetList}
                  isViewProp={isView}
                  required={true}
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
              <Grid item xs={12}>
                <Typography fontSize={'14px'} marginTop={1} fontWeight={700}>
                  Ảnh tài sản
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box className='flex gap-10 mb-10'>
                  {!!watch('product') &&
                    watch('product')?.imageUrls?.map((item, index) => (
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
                <CoreInput
                  className={!isView ? '' : 'hidden'}
                  control={control}
                  name='period'
                  label={t('label.period')}
                  required={!isView}
                  type='number'
                  disableDecimal
                  disableNegative
                  rules={{
                    required: t('common:validation.required'),
                    validate: {
                      isPositive: (v: any) =>
                        v > 0 ||
                        `${t('label.period')} ${t('text.more_than_0')}`,
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <CoreAutocomplete
                          readOnly={isView}
                          style={{ borderBottom: 0, minWidth: '80px' }}
                          control={control}
                          name='periodType'
                          disableClearable
                          valuePath='value'
                          labelPath='label'
                          defaultValue={'MONTH'}
                          options={[
                            {
                              value: 'MONTH',
                              label: `${t('text.month')}`,
                            },
                            {
                              value: 'YEAR',
                              label: `${t('text.year')}`,
                            },
                          ]}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <CoreInput
                  className={isView ? '' : 'hidden'}
                  control={control}
                  label={t('label.period')}
                  name=''
                  value={`${watch('period')} ${
                    watch('periodType') === 'MONTH'
                      ? `${t('text.month')}`
                      : `${t('text.year')}`
                  }`}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreInput
                  className={!isView ? '' : 'hidden'}
                  control={control}
                  name='frequency'
                  label={t('label.frequency')}
                  required={!isView}
                  rules={{
                    required: t('common:validation.required'),
                    validate: {
                      isPositive: (v: any) =>
                        v > 0 ||
                        `${t('label.frequency')} ${t('text.more_than_0')}`,
                    },
                  }}
                  disableDecimal
                  disableNegative
                  type='number'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <CoreAutocomplete
                          readOnly={isView}
                          style={{ borderBottom: 0, minWidth: '70px' }}
                          control={control}
                          name='frequencyType'
                          disableClearable
                          valuePath='value'
                          labelPath='label'
                          defaultValue={'HOUR'}
                          options={[
                            {
                              value: 'HOUR',
                              label: `${t('text.hour')}`,
                            },
                          ]}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <CoreInput
                  className={isView ? '' : 'hidden'}
                  control={control}
                  label={t('label.frequency')}
                  name=''
                  value={`${watch('frequency')} ${
                    watch('frequencyType') === 'HOUR' ? `${t('text.hour')}` : ''
                  }`}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  fontSize={'14px'}
                  marginTop={2}
                  marginBottom={3}
                  fontWeight={700}
                >
                  {`${t('text.asset_period')}`}
                </Typography>
              </Grid>
              {fields.map((field, index) => {
                return (
                  <Fragment key={'key' + index}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        control={control}
                        name=''
                        label={t('label.accessory')}
                        defaultValue={
                          watch(`assetPeriodLines.${index}`)?.assetAccessoryLine
                            ?.name
                        }
                        isViewProp={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        className={!isView ? '' : 'hidden'}
                        control={control}
                        name={`assetPeriodLines.${index}.period`}
                        label={t('label.period')}
                        required={!isView}
                        rules={{
                          required: t('common:validation.required'),
                          validate: {
                            isPositive: (v: any) =>
                              v > 0 ||
                              `${t('label.period')} ${t('text.more_than_0')}`,
                          },
                        }}
                        type='number'
                        disableDecimal
                        disableNegative
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <CoreAutocomplete
                                readOnly={isView}
                                style={{ borderBottom: 0, minWidth: '80px' }}
                                control={control}
                                name={`assetPeriodLines.${index}.periodType`}
                                disableClearable
                                valuePath='value'
                                labelPath='label'
                                defaultValue={'MONTH'}
                                options={[
                                  {
                                    value: 'MONTH',
                                    label: `${t('text.month')}`,
                                  },
                                  {
                                    value: 'YEAR',
                                    label: `${t('text.year')}`,
                                  },
                                ]}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <CoreInput
                        className={isView ? '' : 'hidden'}
                        control={control}
                        label={t('label.period')}
                        name=''
                        value={`${watch(`assetPeriodLines.${index}.period`)} ${
                          watch(`assetPeriodLines.${index}.periodType`) ===
                          'MONTH'
                            ? `${t('text.month')}`
                            : `${t('text.year')}`
                        }`}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        className={!isView ? '' : 'hidden'}
                        control={control}
                        name={`assetPeriodLines.${index}.frequency`}
                        label={t('label.frequency')}
                        required={!isView}
                        rules={{
                          required: t('common:validation.required'),
                          validate: {
                            isPositive: (v: any) =>
                              v > 0 ||
                              `${t('label.frequency')} ${t(
                                'text.more_than_0'
                              )}`,
                          },
                        }}
                        disableDecimal
                        disableNegative
                        type='number'
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <CoreAutocomplete
                                readOnly={isView}
                                style={{ borderBottom: 0, minWidth: '70px' }}
                                control={control}
                                name={`assetPeriodLines.${index}.frequencyType`}
                                disableClearable
                                valuePath='value'
                                labelPath='label'
                                defaultValue={'HOUR'}
                                options={[
                                  {
                                    value: 'HOUR',
                                    label: `${t('text.hour')}`,
                                  },
                                ]}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <CoreInput
                        className={isView ? '' : 'hidden'}
                        control={control}
                        label={t('label.frequency')}
                        name=''
                        value={`${watch(
                          `assetPeriodLines.${index}.frequency`
                        )} ${
                          watch(`assetPeriodLines.${index}.frequencyType`) ===
                          'HOUR'
                            ? `${t('text.hour')}`
                            : ''
                        }`}
                      />
                    </Grid>
                  </Fragment>
                )
              })}
            </Grid>

            {!isView && (
              <div className='space-x-12 text-center mt-10'>
                <CoreButton
                  theme='cancel'
                  onClick={() => {
                    router.push(`${MENU_URL.ASSET_PERIOD}`)
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
