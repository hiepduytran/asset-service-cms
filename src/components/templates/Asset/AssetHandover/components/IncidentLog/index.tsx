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
import { MENU_URL } from '@/routes'
import { getListDispenser } from '@/service/resource/getListDispenser'
import {
  getAllDepartment,
  getAllOrg,
} from '@/service/asset/requestAllocation/getList'
import { getEmployeeListByDepartmentId } from '@/service/resource/getEmployeeListByDepartmentId'
import { Grid, Typography } from '@mui/material'
import useIncidentLog from './useIncidentLog'
import { REGEX } from '@/helper/regex'

export default function IncidentLog() {
  const [
    {
      methods,
      columns,
      tableData,
      router,
      isLoadingGetTransferAssetDetail,
      isLoadingIncidentLog,
    },
    { t, onSubmit },
  ] = useIncidentLog()
  const { control, watch, setValue, getValues } = methods
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
              title: t('text.errorRecordForm'),
            },
          ]}
        />
      }
    >
      <CoreNavbar
        breadcrumbs={[
          {
            title: t('text.errorRecordForm'),
            content: isLoadingGetTransferAssetDetail ? (
              <CoreLoading />
            ) : (
              <form onSubmit={onSubmit}>
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <CoreInput
                      name='code'
                      control={control}
                      label={t('label.recordCode')}
                      rules={{
                        pattern: {
                          value: REGEX.CODE_NEW,
                          message: t('common:validation.code_new'),
                        },
                      }}
                      inputProps={{
                        maxLength: 50,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <CoreDatePicker
                      name='recordDate'
                      control={control}
                      label={t('label.recordDate')}
                      placeholder='DD/MM/YYYY'
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <CoreAutoCompleteAPI
                      name='collector'
                      control={control}
                      label={t('label.collector')}
                      placeholder={''}
                      fetchDataFn={getListDispenser}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <CoreInput
                      name=''
                      control={control}
                      label={t('label.source')}
                      isViewProp={true}
                      value={'Bàn giao'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <CoreInput
                      name='recoverCode'
                      control={control}
                      label={t('label.recoveryCode')}
                      isViewProp={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <CoreAutoCompleteAPI
                      name='collector'
                      control={control}
                      label={t('label.responsiblePerson')}
                      placeholder=''
                      isViewProp={true}
                      fetchDataFn={getListDispenser}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <div className='flex items-center gap-30'>
                      <Typography sx={{ fontWeight: 700 }}>
                        {t('text.object')}
                      </Typography>
                      <CoreRadioGroup
                        name='allocationChooseType'
                        control={control}
                        disabled={true}
                        options={[
                          {
                            value: 'ORGANIZATION',
                            label: t('table.organization'),
                          },
                          {
                            value: 'DEPARTMENT',
                            label: t('table.department'),
                          },
                          {
                            value: 'EMPLOYEE',
                            label: t('table.employee'),
                          },
                        ]}
                      />
                    </div>
                  </Grid>

                  {watch('allocationChooseType') === 'ORGANIZATION' && (
                    <>
                      <Grid item xs={4}>
                        <CoreAutoCompleteAPI
                          label={t('table.organization')}
                          placeholder=''
                          name='org'
                          control={control}
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
                  )}
                  {watch('allocationChooseType') === 'DEPARTMENT' && (
                    <>
                      <Grid item xs={4}>
                        <CoreAutoCompleteAPI
                          name='department'
                          control={control}
                          fetchDataFn={getAllDepartment}
                          label={t('table.allocationDepartment')}
                          placeholder=''
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
                          label={t('table.allocationDepartment')}
                          placeholder=''
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
                          label={t('table.employee')}
                          placeholder=''
                          disabled={!watch('department')}
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
                        {t('assetIncidentRecordInfo')}
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
