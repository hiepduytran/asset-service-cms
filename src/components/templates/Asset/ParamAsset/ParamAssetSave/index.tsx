import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import CoreInput from '@/components/atoms/CoreInput'
import { useParamAssetSave } from './useParamAssetSave'
import PageContainer from '@/components/organism/PageContainer'
import CoreNavbar from '@/components/organism/CoreNavbar'
import { getParamAsset } from '@/service/asset/paramAsset/save/getListParamAsset'
import { FormProvider } from 'react-hook-form'
import TableParamAsset from './components/CustomTableParamAsset'
import { TopAction } from '@/components/molecules/TopAction'
import { DialogDeleteParamAsset } from '../DialogDeleteParamAsset'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import { TrackAssetLine } from '@/service/asset/paramAsset/save/type'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreLoading from '@/components/molecules/CoreLoading'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getListDICByProductId } from '@/service/asset/paramAsset/save/getListDICByProductId'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'

export default function ParamAssetSave() {
  const [values, handles] = useParamAssetSave()
  const router = useRouter()
  const {
    methodForm,
    t,
    isView,
    isUpdate,
    isCopy,
    isLoadingSubmit,
    id,
    assetColumns,
    dataLength,
    isLoading,
  } = values
  const { onSubmit, handleDataReceive, handleDataCheck, onCancel } = handles
  const { control, setValue, watch, trigger } = methodForm
  const { showDialog } = useDialog()

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('text.parameter_asset'),
              pathname: `${MENU_URL.PARAM_ASSET}`,
            },
            {
              title: getTitleBreadcrumbs(t, isView, isUpdate, isCopy),
            },
          ]}
        />
      }
    >
      <CoreNavbar
        breadcrumbs={[
          {
            title: 'Chi tiết',
            content: isLoading ? (
              <CoreLoading />
            ) : (
              <FormProvider {...methodForm}>
                <form className='block rounded-xl mx-auto' onSubmit={onSubmit}>
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                      <SelectBoxCustom
                        columns={assetColumns}
                        control={control}
                        name='product'
                        valuePath='id'
                        labelPath='code'
                        label={t('label.sku')}
                        placeholder={`${t('placeholder.sku')}`}
                        fetchDataFn={getParamAsset}
                        onChangeValue={(val) => {
                          if (val) {
                            setValue('assetName', val.name)
                            setValue('categoryName', val?.category?.name)
                            handleDataCheck(val?.informationData)
                            setValue(
                              'trackAssetLine',
                              handleDataReceive(
                                val.informationData
                              ) as TrackAssetLine[]
                            )
                          } else {
                            setValue('assetName', '')
                            setValue('categoryName', '')
                            handleDataCheck([])
                            setValue('trackAssetLine', [])
                          }
                          setValue('asset', null)
                        }}
                        trigger={trigger}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                      <CoreAutoCompleteAPI
                        control={control}
                        name='asset'
                        label={t('label.product')}
                        placeholder=''
                        fetchDataFn={getListDICByProductId}
                        valuePath='id'
                        labelPath='code'
                        params={{
                          productId: watch('product')?.id
                        }}
                        disabled={!watch('product')?.id}
                        isViewProp={isView || !watch('product')?.id}
                        required
                        rules={{
                          required: t('common:validation.required'),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                      <CoreInput
                        control={control}
                        name='assetName'
                        label={t('label.name')}
                        isViewProp
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                      <CoreInput
                        control={control}
                        name='categoryName'
                        label={t('table.productCategory')}
                        isViewProp
                      />
                    </Grid>
                    <Typography
                      style={{
                        margin: '25px 0 0 25px',
                        fontWeight: 600,
                        fontSize: '15px',
                      }}
                    >
                      {`${t('text.config_follow')}`}
                    </Typography>
                    <Grid item xs={12}>
                      <TableParamAsset
                        trackAssetLine={watch('trackAssetLine') ?? []}
                        dataLength={dataLength}
                      />
                    </Grid>
                  </Grid>

                  {!isView && (
                    <div className='space-x-12 text-center mt-10'>
                      <CoreButton theme='cancel' onClick={onCancel}>
                        {t('common:btn.cancel')}
                      </CoreButton>
                      <CoreButton
                        theme='submit'
                        type='submit'
                        loading={isLoadingSubmit}
                      >
                        {isUpdate
                          ? t('common:btn.save_change')
                          : t('common:btn.add')}
                      </CoreButton>
                    </div>
                  )}
                </form>
              </FormProvider>
            ),
            rightAction: isView && (
              <TopAction
                actionList={['edit', 'delete', 'copy']}
                onEditAction={() => {
                  router.replace({
                    pathname: `${MENU_URL.PARAM_ASSET}/[id]`,
                    query: {
                      id: Number(id),
                    },
                  })
                }}
                onDeleteAction={() =>
                  showDialog(
                    <DialogDeleteParamAsset
                      id={Number(id)}
                      refetch={() =>
                        router.push({
                          pathname: `${MENU_URL.PARAM_ASSET}`,
                        })
                      }
                    />
                  )
                }
                onCopyAction={() => {
                  router.push({
                    pathname: `${MENU_URL.PARAM_ASSET}/[id]`,
                    query: {
                      id,
                      actionType: 'COPY',
                    },
                  })
                }}
              />
            ),
          },
        ]}
      />
    </PageContainer>
  )
}
