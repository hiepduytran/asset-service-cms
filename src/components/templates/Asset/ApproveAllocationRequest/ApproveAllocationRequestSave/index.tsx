import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import { useApproveAllocationRequestSave } from './useApproveAllocationRequestSave'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreRadioGroup from '@/components/atoms/CoreRadioGroup'
import CoreLoading from '@/components/molecules/CoreLoading'
import { CoreTable } from '@/components/organism/CoreTable'
import { renderColorText } from '@/enum'
import {
  getAllDepartment,
  getAllEmployee,
  getAllOrg,
  getProductInternalRequest,
} from '@/service/asset/requestAllocation/getList'
import { useRouter } from 'next/router'

export default function ApproveAllocationRequestSave() {
  const router = useRouter()
  const [values, handles] = useApproveAllocationRequestSave()
  const {
    id,
    isView,
    methods,
    t,
    isLoading,
    isLoadingApprove,
    dataDetail,
    columns,
    dataTable,
  } = values
  const { handleChangeStatus } = handles

  const { control, watch, getValues } = methods

  return (
    <PageWithDetail
      title={
        <div className='flex justify-between items-center'>
          <CoreBreadcrumbs
            breadcrumbs={[
              {
                title: t('title'),
                pathname: MENU_URL.APPROVE_ALLOCATION_REQUEST,
              },
              {
                title: t('text.view'),
              },
            ]}
          />
        </div>
      }
      tabName={`${t('text.view')}`}
    >
      {isLoading ? (
        <CoreLoading />
      ) : (
        <FormProvider {...methods}>
          <form className='block rounded-xl mx-auto'>
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} sm={12} md={4}>
                <CoreInput
                  control={control}
                  name='code'
                  label={t('table.requestCode')}
                  isViewProp={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <CoreDatePicker
                  control={control}
                  name='requestDate'
                  label={t('label.requestDate')}
                  isViewProp={true}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <CoreDatePicker
                  control={control}
                  name='updateDate'
                  label={t('label.desiredDate')}
                  isViewProp={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
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
                  <Typography sx={{ fontWeight: 700 }}>{`${t(
                    'text.allocation_for'
                  )}`}</Typography>
                  <CoreRadioGroup
                    name='allocationChooseType'
                    control={control}
                    disabled={true}
                    defaultValue={watch('allocationChooseType')}
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
                <Grid item xs={12} sm={12} md={4}>
                  <CoreAutoCompleteAPI
                    name='org'
                    control={control}
                    label={t('label.organization')}
                    placeholder={t('placeholder.organization')}
                    fetchDataFn={getAllOrg}
                    required={true}
                    rules={{
                      required: t('common:validation.required'),
                    }}
                  />
                </Grid>
              )}
              {(watch('allocationChooseType') === 'DEPARTMENT' ||
                watch('allocationChooseType') === 'EMPLOYEE') && (
                  <Grid item xs={12} sm={12} md={4}>
                    <CoreAutoCompleteAPI
                      name='department'
                      control={control}
                      fetchDataFn={getAllDepartment}
                      label={t('label.department')}
                      placeholder={t('placeholder.department')}
                      required={true}
                      rules={{
                        required: t('common:validation.required'),
                      }}
                    />
                  </Grid>
                )}
              {watch('allocationChooseType') === 'EMPLOYEE' && (
                <Grid item xs={12} sm={12} md={4}>
                  <CoreAutoCompleteAPI
                    name='employee'
                    control={control}
                    fetchDataFn={getAllEmployee}
                    label={t('label.employee')}
                    placeholder={t('placeholder.employee')}
                    required={true}
                    rules={{
                      required: t('common:validation.required'),
                    }}
                  />
                </Grid>
              )}

              {isView && getValues('note') && (
                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <CoreInput
                      control={control}
                      name='note'
                      label={t('label.note')}
                      multiline
                      isViewProp={true}
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
              </Grid>
            </Grid>

            <div className='flex gap-3 items-center mt-8'>
              <Typography>{`${t('text.status')}`}</Typography>
              <Typography>
                {renderColorText(watch('status') ?? '', t)}
              </Typography>
            </div>

            {dataDetail?.status === 'PENDING' && (
              <div className='space-x-12 text-center mt-20'>
                <CoreButton
                  theme='reject'
                  loading={isLoadingApprove}
                  onClick={() => handleChangeStatus('REJECTED')}
                >
                  {t('button.reject')}
                </CoreButton>

                <CoreButton
                  theme='submit'
                  loading={isLoadingApprove}
                  onClick={() => handleChangeStatus('APPROVED')}
                >
                  {t('button.approval')}
                </CoreButton>
              </div>
            )}
          </form>
        </FormProvider>
      )}
    </PageWithDetail>
  )
}
