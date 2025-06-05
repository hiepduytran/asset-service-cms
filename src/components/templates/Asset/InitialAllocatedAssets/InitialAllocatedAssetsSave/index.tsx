import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import CoreRadioGroup from '@/components/atoms/CoreRadioGroup'
import CoreLoading from '@/components/molecules/CoreLoading'
import { CoreTable } from '@/components/organism/CoreTable'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { BLUE } from '@/helper/colors'
import { REGEX } from '@/helper/regex'
import { MENU_URL } from '@/routes'
import { getListDepartment } from '@/service/resource/getListDepartment'
import { getEmployeeListByDepartmentId } from '@/service/resource/getEmployeeListByDepartmentId'
import { Box, Grid, Typography } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import { useInitialAllocatedAssetsSave } from './useInitialAllocatedAssetsSave'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'

export default function InitialAllocatedAssetsSave() {
  const [values, handles] = useInitialAllocatedAssetsSave()
  const {
    methodForm,
    isView,
    isLoadingSubmit,
    id,
    isLoading,
    columns,
    dataTable,
  } = values
  const { t, onCancel, onSubmit, append } = handles
  const { control, watch, setValue } = methodForm

  return (
    <PageWithDetail
      title={
        <div className='flex justify-between items-center'>
          <CoreBreadcrumbs
            breadcrumbs={[
              {
                title: t('title'),
                pathname: MENU_URL.INITIAL_ALLOCATED_ASSETS,
              },
              {
                title: getTitleBreadcrumbs(t, isView, !!id),
              },
            ]}
          />
        </div>
      }
      tabName={isView ? `${t('common:detail')}` : `${t('common:btn.add')}`}
    >
      {isLoading ? (
        <CoreLoading />
      ) : (
        <FormProvider {...methodForm}>
          <form
            className='block bg-[#ffffff] rounded-xl mx-auto'
            onSubmit={onSubmit}
          >
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreInput
                  control={control}
                  name='code'
                  label={t('label.code')}
                  inputProps={{
                    maxLength: 50,
                  }}
                  rules={{
                    pattern: {
                      value: REGEX.CODE_NEW,
                      message: t('common:validation.code_new'),
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreDatePicker
                  control={control}
                  name='updateDate'
                  label={t('label.updateDate')}
                  placeholder='dd/mm/yyyy'
                  disablePast
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreDatePicker
                  control={control}
                  name='requestDate'
                  label={t('label.allocateDate')}
                  placeholder='dd/mm/yyyy'
                  maxDate={watch('updateDate')}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className='flex items-center gap-30'>
                  <Typography sx={{ fontWeight: 700 }}>
                    {t('allocatedTo')}
                  </Typography>
                  <CoreRadioGroup
                    name='allocationChooseType'
                    control={control}
                    options={[
                      {
                        value: 'ORGANIZATION',
                        label: t('label.organization'),
                      },
                      {
                        value: 'DEPARTMENT',
                        label: t('label.part'),
                      },
                      {
                        value: 'EMPLOYEE',
                        label: t('label.staff'),
                      },
                    ]}
                    disabled={isView}
                    readOnly={isView}
                    onChangeValue={(value) => {
                      setValue('assetAllocationLine', [
                        {
                          product: null,
                          quantity: 0,
                          uom: null,
                          requestQuantity: 0,
                          allocationLineMap: [],
                        },
                      ])
                    }}
                  />
                </div>
              </Grid>
              {watch('allocationChooseType') === 'ORGANIZATION' ? null : watch(
                'allocationChooseType'
              ) === 'EMPLOYEE' ? (
                <>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <CoreAutoCompleteAPI
                      control={control}
                      name='department'
                      label={t('label.allocationDepartment')}
                      fetchDataFn={getListDepartment}
                      placeholder=''
                      required
                      rules={{ required: t('common:validation.required') }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <CoreAutoCompleteAPI
                      control={control}
                      name='employee'
                      label={t('label.staff')}
                      fetchDataFn={getEmployeeListByDepartmentId}
                      params={{
                        departmentIds: [watch('department')?.id],
                      }}
                      placeholder=''
                      disabled={!watch('department')}
                      required
                      rules={{ required: t('common:validation.required') }}
                    />
                  </Grid>
                </>
              ) : (
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <CoreAutoCompleteAPI
                    control={control}
                    name='department'
                    label={t('label.allocationDepartment')}
                    fetchDataFn={getListDepartment}
                    placeholder=''
                    required
                    rules={{ required: t('common:validation.required') }}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={12} md={12} lg={12}></Grid>
              <Typography
                style={{
                  margin: '25px 0 0 25px',
                  fontWeight: 600,
                  fontSize: '15px',
                }}
              >
                {`${t('allocatedAssetInformation')}`}
              </Typography>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <CoreTable
                  tableName='initialAllocatedAssetsSave'
                  columns={columns}
                  data={dataTable}
                  paginationHidden={true}
                  actionTable={
                    !isView ? (
                      <Box className='flex items-center'>
                        <Typography
                          sx={{
                            padding: '15px 20px 15px 12px',
                            color: BLUE,
                            cursor: 'pointer',
                          }}
                          onClick={() =>
                            append({
                              product: null,
                              quantity: 0,
                              uom: null,
                              requestQuantity: 0,
                              allocationLineMap: [],
                            })
                          }
                        >
                          {`${t('addAssets')}`}
                        </Typography>
                        <Typography
                          sx={{
                            padding: '15px 20px 15px 12px',
                            color: BLUE,
                            cursor: 'pointer',
                          }}
                        >
                          {`${t('quicklyAddAssets')}`}
                        </Typography>
                      </Box>
                    ) : null
                  }
                />
              </Grid>
            </Grid>

            {!isView && (
              <div className='flex justify-center w-full gap-10 mt-15'>
                <CoreButton theme='cancel' onClick={onCancel}>
                  {t('common:btn.cancel')}
                </CoreButton>
                <CoreButton
                  theme='submit'
                  type='submit'
                  loading={isLoadingSubmit}
                >
                  {t('common:btn.add')}
                </CoreButton>
              </div>
            )}
          </form>
        </FormProvider>
      )}
    </PageWithDetail>
  )
}
