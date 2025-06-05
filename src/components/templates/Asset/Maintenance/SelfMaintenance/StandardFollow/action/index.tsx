import React from 'react'
import useStandardFollowAction from './useStandardFollowAction'
import PageContainer from '@/components/organism/PageContainer'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { Box, Grid, Typography } from '@mui/material'
import { MENU_URL } from '@/routes'
import CoreNavbar from '@/components/organism/CoreNavbar'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { FormProvider } from 'react-hook-form'
import CoreLoading from '@/components/molecules/CoreLoading'
import { getAllAssetAccessory } from '@/service/asset/maintenance/selfMaintenance/standardDeclare/list'
import TableCustom from '../../StandardDeclare/components/TableCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { stateTypes } from '../../utils'
import Image from 'next/image'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'

export default function StandardFollowAction() {
  const [
    {
      methods,
      isView,
      isUpdate,
      columns,
      groupStandardFields,
      isLoadingDetailStandardDeclare,
      isLoadingGroupStandardData,
    },
    { t, onSubmit },
  ] = useStandardFollowAction()

  const { control, setValue, watch } = methods
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            { title: t('title') },
            { title: t('self_maintenance.title') },

            {
              title: t('self_maintenance.standard_follow.title'),
              pathname: MENU_URL.MAINTENANCE.SELF_MAINTENANCE.STANDARD_FOLLOW,
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
                      <CoreAutoCompleteAPI
                        name='product'
                        control={control}
                        label={t('table.sku')}
                        placeholder={t(
                          'self_maintenance.standard_declare.product.placeholder'
                        )}
                        labelPath='sku'
                        valuePath='id'
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
                            groupStandardFields.forEach((_, index) => {
                              return setValue(
                                `standardMethodGroups.${index}.standardMaintenanceLines`,
                                []
                              )
                            })
                            return
                          }
                          setValue('product', null)
                          setValue('productName', '')
                          groupStandardFields.forEach((_, index) => {
                            setValue(
                              `standardMethodGroups.${index}.standardMaintenanceLines`,
                              []
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
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                      <CoreAutocomplete
                        name='state'
                        control={control}
                        options={stateTypes}
                        valuePath='value'
                        labelPath='label'
                        label={t('table.state')}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography
                        fontSize={'14px'}
                        marginTop={1}
                        fontWeight={700}
                      >
                        {t('self_maintenance.standard_declare.image')}
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
                        {t(
                          'self_maintenance.standard_declare.information_standard'
                        )}
                      </Typography>
                    </div>
                    {isLoadingGroupStandardData ? (
                      <CoreLoading />
                    ) : (
                      groupStandardFields.map((item, index) => {
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
                </form>
              </FormProvider>
            ),
          },
        ]}
      />
    </PageContainer>
  )
}
