import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { getListTopAction } from '@/helper/getListTopAction'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'
import { MENU_URL } from '@/routes'
import { Grid, InputLabel, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'
import DialogJobDeclaration from './components/Dialog'
import TableJobDeclarationMachineDetail from './components/MaintenanceRepair/Table'
import TableMaintenanceWork from './components/MaintenanceWork'
import useJobDeclarationAction from './useJobDeclarationAction'
import { getList2Product } from '@/service/product/getList2Product'
import { getListAssetSKU } from '@/service/asset/jobDeclaration/list'

export default function JobDeclarationAction() {
  const [
    {
      methods,
      id,
      isUpdate,
      isView,
      isLoadingJobDeclaration,
      isLoadingGetJobDeclaration,
      defaultValues,
    },
    { t, onSubmit, showDialog },
  ] = useJobDeclarationAction()
  const { control, watch, setValue, getValues, reset } = methods
  const router = useRouter()
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title'),
              pathname: MENU_URL.JOB_DECLARATION,
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
            title: t('common:detail'),
            content: isLoadingGetJobDeclaration ? (
              <CoreLoading />
            ) : (
              <FormProvider {...methods}>
                <form className='flex flex-col' onSubmit={onSubmit}>
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <CoreAutoCompleteAPI
                        name='product'
                        control={control}
                        label={t('SKU')}
                        labelPath='code'
                        placeholder={t('Chọn SKU')}
                        fetchDataFn={getListAssetSKU}
                        required
                        rules={{
                          required: t('common:validation.required'),
                        }}
                        onChangeValue={(value) => {
                          reset({
                            ...defaultValues,
                            typeDeclaration: getValues('typeDeclaration'),
                          })
                          if (value) {
                            setValue('product', {
                              id: value?.id,
                              code: value?.code,
                              name: value?.name,
                            })
                          } else {
                            setValue('product', null)
                          }
                        }}
                        isViewProp={isView || isUpdate}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <InputLabel>Tên tài sản</InputLabel>
                      <Typography
                        sx={{
                          marginTop: '10px',
                        }}
                      >
                        {watch('product.name')}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <CoreAutocomplete
                        name='typeDeclaration'
                        control={control}
                        label={t('Khai báo công việc theo')}
                        placeholder={`${t('Chọn khai báo công việc')}`}
                        options={[
                          {
                            label: 'Tổng quan và chi tiết máy',
                            value: 'ALL',
                          },
                          {
                            label: 'Tổng quan',
                            value: 'OVERVIEW',
                          },
                          {
                            label: 'Chi tiết máy',
                            value: 'MACHINE_DETAILS',
                          },
                        ]}
                        returnValueType='enum'
                        onChangeValue={(value: any) => {
                          if (value === 'OVERVIEW') {
                            setValue(
                              'maintenanceWorkOverview.maintenanceWorkDetails',
                              [
                                {
                                  content: '',
                                  standardTime: null,
                                },
                              ]
                            )
                            setValue(
                              'maintenanceWorkRepair.maintenanceWorkDetails',
                              [
                                {
                                  content: '',
                                  standardTime: null,
                                },
                              ]
                            )
                            setValue('detailsWorkOverview', [])
                            setValue('detailsWorkRepair', [])
                          }
                          if (value === 'MACHINE_DETAILS') {
                            setValue('detailsWorkOverview', [
                              {
                                product: null,
                                repairWorkDetails: [],
                              },
                            ])
                            setValue('detailsWorkRepair', [
                              {
                                product: null,
                                repairWorkDetails: [],
                              },
                            ])

                            setValue('maintenanceWorkOverview', null)
                            setValue('maintenanceWorkRepair', null)
                          }
                          if (value === 'ALL') {
                            setValue(
                              'maintenanceWorkOverview.maintenanceWorkDetails',
                              [
                                {
                                  content: '',
                                  standardTime: null,
                                },
                              ]
                            )
                            setValue(
                              'maintenanceWorkRepair.maintenanceWorkDetails',
                              [
                                {
                                  content: '',
                                  standardTime: null,
                                },
                              ]
                            )
                            setValue('detailsWorkOverview', [
                              {
                                product: null,
                                repairWorkDetails: [],
                              },
                            ])
                            setValue('detailsWorkRepair', [
                              {
                                product: null,
                                repairWorkDetails: [],
                              },
                            ])
                          }
                        }}
                        required
                        rules={{
                          required: t('common:validation.required'),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CoreInput
                        name='note'
                        control={control}
                        multiline
                        label={t('Ghi chú')}
                      />
                    </Grid>

                    {(watch('typeDeclaration') === 'ALL' ||
                      watch('typeDeclaration') === 'OVERVIEW') && (
                      <Grid item xs={12}>
                        <TableMaintenanceWork
                          title='THEO TỔNG QUAN - CÔNG VIỆC BẢO DƯỠNG'
                          name='maintenanceWorkOverview.maintenanceWorkDetails'
                        />
                        <TableMaintenanceWork
                          title='THEO TỔNG QUAN - CÔNG VIỆC SỬA CHỮA'
                          name='maintenanceWorkRepair.maintenanceWorkDetails'
                        />
                      </Grid>
                    )}
                    {(watch('typeDeclaration') === 'ALL' ||
                      watch('typeDeclaration') === 'MACHINE_DETAILS') && (
                      <Grid item xs={12}>
                        <TableJobDeclarationMachineDetail
                          title='THEO CHI TIẾT MÁY - CÔNG VIỆC BẢO DƯỠNG'
                          name='detailsWorkOverview'
                        />
                        <TableJobDeclarationMachineDetail
                          title='THEO CHI TIẾT MÁY - CÔNG VIỆC SỬA CHỮA'
                          name='detailsWorkRepair'
                        />
                      </Grid>
                    )}
                  </Grid>

                  {!isView && (
                    <div className='flex justify-center mt-20 gap-10'>
                      <CoreButton theme='cancel'>
                        {t('common:btn.destroy')}
                      </CoreButton>
                      <CoreButton
                        theme='submit'
                        type='submit'
                        loading={isLoadingJobDeclaration}
                      >
                        {isUpdate ? t('common:btn.save') : t('common:btn.add')}
                      </CoreButton>
                    </div>
                  )}
                </form>
              </FormProvider>
            ),
            rightAction: (
              <TopAction
                actionList={getListTopAction(isView, isUpdate)}
                onEditAction={() => {
                  router.push({
                    pathname: `${MENU_URL.JOB_DECLARATION}/[id]`,
                    query: {
                      id: id,
                    },
                  })
                }}
                onDeleteAction={() => {
                  showDialog(<DialogJobDeclaration />)
                }}
              />
            ),
          },
        ]}
      />
    </PageContainer>
  )
}
