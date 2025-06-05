import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import CoreRadioGroup from '@/components/atoms/CoreRadioGroup'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { textColor } from '@/enum'
import { MENU_URL } from '@/routes'
import {
  getAllDepartment,
  getAllOrg,
  getProductInternalRequest,
} from '@/service/asset/requestAllocation/getList'
import { getEmployeeListByDepartmentId } from '@/service/resource/getEmployeeListByDepartmentId'
import { Grid, Typography } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import TableDelivery from './components/TableAssetDelivery'
import { useTrackAllocationRequestSave } from './useTrackAllocationRequestSave'

export default function TrackAllocationRequestSave() {
  const [
    {
      router,
      id,
      methods,
      t,
      isLoadingGetRequestAllocationDetail,
      isView,
      columns,
      dataTable,
      dataStockPickingDeliver,
      isLoadingStockPickingDeliver,
    },
  ] = useTrackAllocationRequestSave()
  const { control, watch, getValues } = methods

  return (
    <PageContainer
      title={
        <div className='flex justify-between items-center'>
          <CoreBreadcrumbs
            breadcrumbs={[
              {
                title: t('title'),
                pathname: MENU_URL.TRACK_ALLOCATION_REQUEST,
              },
              {
                title: t('text.view'),
              },
            ]}
          />
        </div>
      }
    >
      <CoreNavbar
        breadcrumbs={[
          {
            title: t('text.view'),
            content: isLoadingGetRequestAllocationDetail || isLoadingStockPickingDeliver ? (
              <CoreLoading />
            ) : (
              <FormProvider {...methods}>
                <form className='block rounded-xl mx-auto'>
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        control={control}
                        name='code'
                        label={t('table.requestCode')}
                        isViewProp={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreDatePicker
                        control={control}
                        name='requestDate'
                        label={t('label.requestDate')}
                        isViewProp={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreDatePicker
                        control={control}
                        name='updateDate'
                        label={t('label.desiredDate')}
                        isViewProp={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutocomplete
                        control={control}
                        name='planType'
                        label={t('label.planType')}
                        options={[
                          {
                            label: `${t('text.INCIDENT')}`,
                            value: 'INCIDENT',
                          },
                          {
                            label: `${t('text.PLANED')}`,
                            value: 'PLANED',
                          },
                        ]}
                        returnValueType='enum'
                      />
                    </Grid>
                    {((!isView && watch('planType') === 'PLANED') ||
                      (!isView && !!getValues('plan'))) && (
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <CoreAutoCompleteAPI
                            control={control}
                            name='plan'
                            label={t('label.plan')}
                            placeholder={`${t('placeholder.plan')}`}
                            fetchDataFn={getProductInternalRequest}
                            params={{
                              search: 'APPROVED',
                            }}
                          />
                        </Grid>
                      )}
                    <Grid item xs={12}>
                      <div className='flex items-center gap-30'>
                        <Typography sx={{ fontWeight: 700 }}>
                          {`${t('text.allocation_for')}`}
                        </Typography>
                        <CoreRadioGroup
                          name='allocationChooseType'
                          control={control}
                          disabled={isView}
                          options={[
                            {
                              value: 'ORGANIZATION',
                              label: `${t('text.ORGANIZATION')}`,
                            },
                            {
                              value: 'DEPARTMENT',
                              label: `${t('text.DEPARTMENT')}`,
                            },
                            {
                              value: 'EMPLOYEE',
                              label: `${t('text.EMPLOYEE')}`,
                            },
                          ]}
                        />
                      </div>
                    </Grid>
                    {watch('allocationChooseType') === 'ORGANIZATION' && (
                      <Grid item xs={4}>
                        <CoreAutoCompleteAPI
                          name='org'
                          control={control}
                          placeholder={t('placeholder.organization')}
                          label={t('label.organization')}
                          fetchDataFn={getAllOrg}
                          isViewProp={true}
                          required={true}
                          rules={{
                            required: t('common:validation.required'),
                          }}
                        />
                      </Grid>
                    )}
                    {(watch('allocationChooseType') === 'DEPARTMENT' ||
                      watch('allocationChooseType') === 'EMPLOYEE') && (
                        <Grid item xs={4}>
                          <CoreAutoCompleteAPI
                            name='department'
                            control={control}
                            fetchDataFn={getAllDepartment}
                            placeholder={t('placeholder.department')}
                            label={t('label.department')}
                            required={true}
                            rules={{
                              required: t('common:validation.required'),
                            }}
                          />
                        </Grid>
                      )}
                    {watch('allocationChooseType') === 'EMPLOYEE' && (
                      <Grid item xs={4}>
                        <CoreAutoCompleteAPI
                          name='employee'
                          control={control}
                          fetchDataFn={getEmployeeListByDepartmentId}
                          params={{
                            departmentIds: [watch('department')?.id],
                          }}
                          placeholder={t('placeholder.employee')}
                          label={t('label.employee')}
                          disabled={!watch('department')}
                          required={true}
                          rules={{
                            required: t('common:validation.required'),
                          }}
                        />
                      </Grid>
                    )}
                    {(!isView || (isView && getValues('note'))) && (
                      <Grid item xs={12}>
                        <Grid item xs={12}>
                          <CoreInput
                            control={control}
                            name='note'
                            label={t('label.note')}
                            multiline
                            inputProps={{
                              maxLength: 1000,
                            }}
                            isViewProp={isView}
                          />
                        </Grid>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <Typography
                        sx={{
                          marginBottom: 2,
                          fontWeight: 700,
                        }}
                      >
                        {`${t('text.info_register')}`}
                      </Typography>
                      <CoreTable
                        tableName='asset'
                        columns={columns}
                        data={dataTable}
                        paginationHidden={true}
                      />
                      <div className='flex gap-3 items-center mt-8'>
                        <Typography>{`${t('text.status')}`}</Typography>
                        <Typography>
                          {textColor(watch('allocationStatus') ?? '')}
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </form>
              </FormProvider>
            ),
            rightAction: (
              <TopAction
                actionList={['copy']}
                onCopyAction={() => {
                  router.push({
                    pathname: `${MENU_URL.REQUEST_ALLOCATION}/[id]`,
                    query: {
                      id,
                      actionType: 'COPY',
                    },
                  })
                }}
              />
            ),
          },

          ...(getValues('cardId') && dataStockPickingDeliver?.[0]?.state !== 'WAITING'
            ? [
              {
                title: t('text.delivery'),
                content: (
                  <TableDelivery
                    id={getValues('id')}
                    cardId={getValues('cardId')}
                  />
                ),
                minWidthTabItem: 120,
              },
            ]
            : []),
        ]}
      />
    </PageContainer>
  )
}
