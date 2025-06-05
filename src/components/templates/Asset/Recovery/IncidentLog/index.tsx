import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import CoreRadioGroup from '@/components/atoms/CoreRadioGroup'
import CoreLoading from '@/components/molecules/CoreLoading'
import CoreNavbar from '@/components/organism/CoreNavbar'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { REGEX } from '@/helper/regex'
import { MENU_URL } from '@/routes'
import { getAllDepartment } from '@/service/asset/requestAllocation/getList'
import { getEmployeeListByDepartmentId } from '@/service/resource/getEmployeeListByDepartmentId'
import { getListDispenser } from '@/service/resource/getListDispenser'
import { Grid, Typography } from '@mui/material'
import moment from 'moment'
import useIncidentLog from './useIncidentLog'

export default function IncidentLog() {
  const [
    {
      methods,
      columns,
      tableData,
      router,
      isLoadingAssetRecoveryDetail,
      isLoadingIncidentLog,
    },
    { t, onSubmit },
  ] = useIncidentLog()
  const { control, watch, setValue } = methods
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title'),
              pathname: `${MENU_URL.RECOVERY}`,
            },
            {
              title: t('text.incident_log'),
            },
          ]}
        />
      }
    >
      <CoreNavbar
        breadcrumbs={[
          {
            title: t('text.incident_log'),
            content: isLoadingAssetRecoveryDetail ? (
              <CoreLoading />
            ) : (
              <form onSubmit={onSubmit}>
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <CoreInput
                      name='code'
                      control={control}
                      label={t('label.code')}
                      placeholder={t('placeholder.code')}
                      rules={{
                        pattern: {
                          value: REGEX.CODE_NEW,
                          message: t('common:validation.code_new'),
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <CoreDatePicker
                      name='recordDate'
                      control={control}
                      label={t('label.recordDate')}
                      placeholder='DD/MM/YYYY'
                      minDate={moment()}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <CoreAutoCompleteAPI
                      name='collector_'
                      control={control}
                      label={t('label.collector')}
                      placeholder={t('placeholder.collector')}
                      fetchDataFn={getListDispenser}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <CoreInput
                      name='source'
                      control={control}
                      label={t('label.source')}
                      placeholder={t('placeholder.source')}
                      isViewProp={true}
                      value={'Thu hồi'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <CoreInput
                      name='sourceCode'
                      control={control}
                      label={t('label.recoverCode')}
                      placeholder={t('placeholder.recoverCode')}
                      isViewProp={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <CoreAutoCompleteAPI
                      name='collector'
                      control={control}
                      label={t('label.collector_second')}
                      placeholder={t('placeholder.collector_second')}
                      isViewProp={true}
                      labelPath='name'
                      valuePath='id'
                      fetchDataFn={getListDispenser}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <div className='flex items-center gap-30'>
                      <Typography sx={{ fontWeight: 700 }}>
                        {`${t('text.object')}`}
                      </Typography>
                      <CoreRadioGroup
                        name='allocationChooseType'
                        control={control}
                        disabled={true}
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

                  {/* {watch('allocationChooseType') === 'ORGANIZATION' && (
                    <>
                      <Grid item xs={4}>
                        <CoreAutoCompleteAPI
                          name='org'
                          control={control}
                          label={t('label.organization')}
                          placeholder={t('placeholder.organization')}
                          fetchDataFn={getAllOrg}
                          isViewProp={true}
                          onChangeValue={(value) => {
                            if (value) {
                              setValue('org', {
                                id: value.id,
                                name: value.name,
                              })
                            } else {
                              setValue('org', undefined)
                            }
                          }}
                          required={true}
                          rules={{
                            required: t('common:validation.required'),
                          }}
                        />
                      </Grid>
                      <Grid item xs={4}></Grid>
                      <Grid item xs={4}></Grid>
                    </>
                  )} */}
                  {watch('allocationChooseType') === 'DEPARTMENT' && (
                    <>
                      <Grid item xs={4}>
                        <CoreAutoCompleteAPI
                          name='department'
                          control={control}
                          fetchDataFn={getAllDepartment}
                          label={t('label.department')}
                          placeholder={t('placeholder.department')}
                          isViewProp={true}
                          onChangeValue={(value) => {
                            if (value) {
                              setValue('department', {
                                id: value.id,
                                name: value.name,
                                code: value.code,
                              })
                              setValue('employee', undefined)
                            } else {
                              setValue('employee', undefined)
                            }
                          }}
                          required={true}
                          rules={{
                            required: t('common:validation.required'),
                          }}
                        />
                      </Grid>
                      <Grid item xs={4}></Grid>
                      <Grid item xs={4}></Grid>
                    </>
                  )}
                  {watch('allocationChooseType') === 'EMPLOYEE' && (
                    <>
                      <Grid item xs={4}>
                        <CoreAutoCompleteAPI
                          name='department'
                          control={control}
                          fetchDataFn={getAllDepartment}
                          label={t('label.department')}
                          placeholder={t('placeholder.department')}
                          isViewProp={true}
                          onChangeValue={(value) => {
                            if (value) {
                              setValue('department', {
                                id: value.id,
                                name: value.name,
                                code: value.code,
                              })
                              setValue('employee', undefined)
                            } else {
                              setValue('employee', undefined)
                            }
                          }}
                          required={true}
                          rules={{
                            required: t('common:validation.required'),
                          }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <CoreAutoCompleteAPI
                          name='employee'
                          control={control}
                          fetchDataFn={getEmployeeListByDepartmentId}
                          params={{
                            departmentIds: [watch('department')?.id],
                          }}
                          label={t('label.employee')}
                          placeholder={t('placeholder.employee')}
                          disabled={!watch('department')}
                          isViewProp={true}
                          onChangeValue={(value) => {
                            if (value) {
                              setValue('employee', {
                                id: value.id,
                                name: value.name,
                                code: value.code,
                              })
                            } else {
                              setValue('employee', undefined)
                            }
                          }}
                          required={true}
                          rules={{
                            required: t('common:validation.required'),
                          }}
                        />
                      </Grid>
                      <Grid item xs={4}></Grid>
                    </>
                  )}

                  <Grid item xs={12}>
                    <CoreInput
                      name='note'
                      control={control}
                      label={t('label.note')}
                      placeholder={t('placeholder.note')}
                      inputProps={{
                        maxLength: 1000,
                      }}
                      multiline
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid item xs={12}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          marginBottom: 2,
                        }}
                      >
                        {`${t('text.info_error_asset')}`}
                      </Typography>
                    </Grid>
                    <CoreTable
                      columns={columns}
                      data={tableData}
                      paginationHidden
                    />
                  </Grid>
                </Grid>
                <div className='space-x-12 text-center mt-10'>
                  <CoreButton
                    theme='cancel'
                    onClick={() => {
                      router.push(`${MENU_URL.RECOVERY}`)
                    }}
                  >
                    {t('common:btn.destroy')}
                  </CoreButton>

                  <CoreButton
                    theme='submit'
                    type='submit'
                    loading={isLoadingIncidentLog}
                  >
                    {t('common:btn.add')}
                  </CoreButton>
                </div>
              </form>
            ),
            minWidthTabItem: 150,
          },
        ]}
      />
    </PageContainer>
  )
}
