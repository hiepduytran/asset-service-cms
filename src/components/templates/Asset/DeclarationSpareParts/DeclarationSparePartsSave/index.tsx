import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { MENU_URL } from '@/routes'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import CoreInput from '@/components/atoms/CoreInput'
import { FormProvider, useWatch } from 'react-hook-form'
import { TopAction } from '@/components/molecules/TopAction'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { DialogDelete } from '../DialogDelete'
import { CoreTable } from '@/components/organism/CoreTable'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import useDeclarationSparePartsSave from './useDeclarationSparePartsSave'
import Image from 'next/image'
import { getListProductSKU } from '@/service/asset/declarationSpareParts/save/getListProductSKU'
import { CoreButton } from '@/components/atoms/CoreButton'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'

export default function DeclarationSparePartsSave() {
  const { showDialog } = useDialog()
  const [values, handles] = useDeclarationSparePartsSave()
  const {
    router,
    methodForm,
    isView,
    isUpdate,
    id,
    data,
    isLoading,
    isLoadingSubmit,
    columns,
    tableData,
  } = values
  const { control, setValue, watch } = methodForm
  const { t, onSubmit, append, replace } = handles
  const watchedImageUrls = watch('imageUrls') || data?.imageUrls || []

  const productWatch = useWatch({
    control,
    name: 'product',
  })

  return (
    <PageWithDetail
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('navigation.maintenance'),
            },
            {
              title: t('navigation.config'),
            },
            {
              title: t('title'),
              pathname: `${MENU_URL.DECLARATION_SPARE_PARTS}`,
            },
            {
              title: getTitleBreadcrumbs(t, isView, isUpdate),
            },
          ]}
        />
      }
      topAction={
        !!id && (
          <TopAction
            actionList={['edit', 'delete']}
            onEditAction={() => {
              router.replace({
                pathname: `${MENU_URL.DECLARATION_SPARE_PARTS}/[id]`,
                query: {
                  id,
                },
              })
            }}
            onDeleteAction={() =>
              showDialog(
                <DialogDelete
                  assetAccessoryId={id}
                  backFn={() => {
                    router.push({
                      pathname: MENU_URL.DECLARATION_SPARE_PARTS,
                    })
                  }}
                />
              )
            }
          />
        )
      }
    >
      <FormProvider {...methodForm}>
        <form className='block rounded-xl mx-auto' onSubmit={onSubmit}>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='product'
                label={t('table.assetCode')}
                placeholder=''
                fetchDataFn={getListProductSKU}
                params={{
                  isAsset: true,
                }}
                isViewProp={isView || isUpdate}
                labelPath='sku'
                valuePath='id'
                searchLabel='sku'
                onChangeValue={(value) => {
                  if (value) {
                    setValue('productName', value?.name)
                    setValue('imageUrls', value?.imageUrls)
                  } else {
                    setValue('productName', '')
                    setValue('imageUrls', [])
                  }
                  replace([
                    {
                      product: null,
                      productName: '',
                      quantity: null,
                      uom: null,
                      uomName: '',
                    },
                  ])
                }}
                required
                rules={{ required: t('common:validation.required') }}
                inputProps={{
                  maxLength: 50,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='productName'
                label={t('table.assetName')}
                isViewProp
              />
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight='bold'>{t('table.assetImage')}</Typography>
              <Box className='flex gap-10 my-8'>
                {watchedImageUrls.map((url: string, index: number) => (
                  <Box
                    className='flex justify-center items-center p-2 border-[1px] border-solid border-[#DFE0EB] rounded'
                    key={'key' + index}
                  >
                    <Image
                      width={90}
                      height={90}
                      alt=''
                      src={url ?? ''}
                      className='rounded'
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight='bold'>{t('info')}</Typography>
            </Grid>
            <Grid item xs={12}>
              <CoreTable
                key={productWatch?.id}
                columns={columns}
                data={tableData}
                paginationHidden
                isLoading={isLoading}
                isShowColumnStt
                actionTable={
                  !isView ? (
                    // getValues('accessoryLines')[
                    //   getValues('accessoryLines').length - 1
                    // ].product &&
                    // getValues('accessoryLines').length <
                    // (getValues('accessoryLinesLength') ?? 0) ?
                    <ActionTable
                      action={t('button.addAccessory')}
                      columns={columns}
                      append={append}
                      defaultValueLine={{
                        product: null,
                        productName: '',
                        quantity: null,
                        uom: null,
                        uomName: '',
                      }}
                    />
                  ) : (
                    <></>
                  )
                }
              />
            </Grid>
          </Grid>
          {!isView && (
            <div className='space-x-12 text-center mt-10'>
              <CoreButton
                theme='cancel'
                onClick={() => {
                  router.push(`${MENU_URL.DECLARATION_SPARE_PARTS}`)
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
    </PageWithDetail>
  )
}
