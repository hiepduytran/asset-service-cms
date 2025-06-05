import React from 'react'
import useStandardDeclareAction from './useStandardDeclareAction'
import PageContainer from '@/components/organism/PageContainer'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreNavbar from '@/components/organism/CoreNavbar'
import { MENU_URL } from '@/routes'
import { Box, Grid, Typography } from '@mui/material'
import CoreInput from '@/components/atoms/CoreInput'

import { getAllAssetAccessory } from '@/service/asset/maintenance/selfMaintenance/standardDeclare/list'
import { FormProvider } from 'react-hook-form'
import TableCustom from '../components/TableCustom'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import AutoCompleteAPICustomStandardDeclare2 from '../components/AutoCompleteAPICustom2'
import { CoreButton } from '@/components/atoms/CoreButton'
import Image from 'next/image'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'

export default function StandardDeclareAction() {
  const [
    {
      id,
      methods,
      router,
      isView,
      isUpdate,
      columns,
      standardMethodGroups,
      loadingSubmit,
      loadingDraft,
      isLoadingDetailStandardDeclare,
      isLoadingGroupStandardData,
    },
    { t, onSubmit, onCancel, onDraft },
  ] = useStandardDeclareAction()

  const { control, setValue, reset, watch } = methods

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            { title: t('title') },
            { title: t('self_maintenance.title') },
            {
              title: t('self_maintenance.standard_declare.title'),
              pathname: MENU_URL.MAINTENANCE.SELF_MAINTENANCE.STANDARD_DECLARE,
            },
            {
              title: getTitleBreadcrumbs(t, isView, isUpdate),
            },
          ]}
        />
      }
    >
      <CoreNavbar
        breadcrumbs={[
          {
            title: isView ? t('view') : isUpdate ? t('edit') : t('add'),
            content: isLoadingDetailStandardDeclare ? (
              <CoreLoading />
            ) : (
              <FormProvider {...methods}>
                <form onSubmit={onSubmit}>
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <AutoCompleteAPICustomStandardDeclare2
                        name='product'
                        control={control}
                        label={t('table.sku')}
                        placeholder={t(
                          'self_maintenance.standard_declare.productSKU.placeholder'
                        )}
                        labelPath='code'
                        fetchDataFn={getAllAssetAccessory}
                        rules={{
                          required: t('common:validation.required'),
                        }}
                        required
                        onChangeValue={async (val) => {
                          if (val) {
                            setValue('productName', val.name)
                            setValue('product.imageUrls', val.imageUrls)
                            setValue('productId', val.productId)
                            standardMethodGroups.forEach((_, index) => {
                              setValue(
                                `standardMethodGroups.${index}.standardMaintenanceLines`,
                                [
                                  {
                                    id: null,
                                    product: null,
                                    standardMethods: null,
                                    result: null,
                                  },
                                ]
                              )
                            })
                            return
                          }
                          setValue('product', null)
                          setValue('productName', '')
                          standardMethodGroups.forEach((_, index) => {
                            setValue(
                              `standardMethodGroups.${index}.standardMaintenanceLines`,
                              [
                                {
                                  id: null,
                                  product: null,
                                  standardMethods: null,
                                  result: null,
                                },
                              ]
                            )
                          })
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <CoreInput
                        name='productName'
                        control={control}
                        label={t('table.nameProduct')}
                        placeholder={t(
                          'self_maintenance.standard_declare.productName.placeholder'
                        )}
                        isViewProp={true}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography
                        fontSize={'14px'}
                        marginTop={1}
                        fontWeight={700}
                      >
                        {`${t('self_maintenance.standard_declare.image')}`}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className='flex gap-10 mb-5'>
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
                  </Grid>

                  <div className='flex flex-col'>
                    <div className='bg-[#f0f3f7] px-16 -mx-16 py-6 mt-18'>
                      <Typography variant='h6' sx={{ fontWeight: '700' }}>
                        {`${t(
                          'self_maintenance.standard_declare.info_standard'
                        )}`}
                      </Typography>
                    </div>
                    {isLoadingGroupStandardData ? (
                      <CoreLoading />
                    ) : (
                      standardMethodGroups.map((item, index) => {
                        return (
                          <div key={item.key}>
                            <Typography
                              sx={{
                                fontWeight: '600',
                                margin: '36px 0 20px 0',
                                fontSize: '15px',
                              }}
                            >
                              {item?.standardGroup?.name}
                            </Typography>
                            <TableCustom columns={columns} index={index} />
                          </div>
                        )
                      })
                    )}
                  </div>

                  {!isView ? (
                    isUpdate ? (
                      <div className='flex justify-center mt-15'>
                        <div className='m-5'>
                          <CoreButton theme='reset' onClick={onCancel}>
                            {t('common:btn.cancel')}
                          </CoreButton>
                        </div>
                        <div className='m-5'>
                          <CoreButton
                            theme='submit'
                            type='submit'
                            loading={loadingSubmit}
                          >
                            {t('common:btn.send_approval')}
                          </CoreButton>
                        </div>
                      </div>
                    ) : (
                      <div className='flex justify-center mt-15'>
                        <div className='m-5'>
                          <CoreButton theme='reset' onClick={onCancel}>
                            {t('common:btn.cancel')}
                          </CoreButton>
                        </div>
                        <div className='m-5'>
                          <CoreButton
                            theme='submit'
                            onClick={onDraft}
                            loading={loadingDraft}
                          >
                            {t('common:btn.draft')}
                          </CoreButton>
                        </div>
                        <div className='m-5'>
                          <CoreButton
                            theme='submit'
                            type='submit'
                            loading={loadingSubmit}
                          >
                            {t('common:btn.send_approval')}
                          </CoreButton>
                        </div>
                      </div>
                    )
                  ) : null}
                </form>
              </FormProvider>
            ),
            rightAction: (
              <TopAction
                actionList={
                  watch('state') === 'PENDING' || watch('state') === 'DRAFT'
                    ? ['edit']
                    : []
                }
                onEditAction={() => {
                  router.push({
                    pathname:
                      MENU_URL.MAINTENANCE.SELF_MAINTENANCE.STANDARD_DECLARE +
                      '/[id]',
                    query: { id },
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
