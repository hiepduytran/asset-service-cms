import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import CoreRadioGroup from '@/components/atoms/CoreRadioGroup'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import CoreLoading from '@/components/molecules/CoreLoading'
import {
  getTypeLabelWithColor,
  StateWithColorAllocation,
} from '@/components/molecules/TextColor'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { BLUE } from '@/helper/colors'
import { REGEX } from '@/helper/regex'
import { MENU_URL } from '@/routes'
import {
  getAllDepartment,
  getProductInternalRequest,
} from '@/service/asset/requestAllocation/getList'
import { getEmployeeListByDepartmentId } from '@/service/resource/getEmployeeListByDepartmentId'
import { Box, Grid, Typography } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'
import { DialogDelete } from '../DialogDelete'
import { useRequestAllocationSave } from './useRequestAllocationSave'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'

export default function RequestAllocationSave() {
  const [values, handles] = useRequestAllocationSave()
  const router = useRouter()

  const {
    methods,
    isView,
    isUpdate,
    isCopy,
    isCreate,
    isLoadingSubmit,
    id,
    isLoadingRequestAllocationDetail,
    dataRequestAllocationDetail,
    columns,
    dataTable,
  } = values

  const { t, onSubmit, appendAllocationLineField, handleChangeStatus } = handles
  const { control, watch, setValue, getValues } = methods
  const { showDialog } = useDialog()

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title'),
              pathname: MENU_URL.REQUEST_ALLOCATION,
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
            title: isView
              ? `${t('text.view')}`
              : (isUpdate && isCopy) || isCreate
                ? `${t('common:btn.add')}`
                : `${t('common:btn.edit')}`,
            rightAction: (
              <TopAction
                actionList={
                  watch('status') === 'TERMINATE'
                    ? ['copy', 'delete']
                    : watch('status') === 'PENDING'
                      ? ['copy', 'edit', 'cancel']
                      : watch('status') === 'APPROVED'
                        ? ['copy']
                        : []
                }
                onEditAction={() => {
                  router.replace({
                    pathname: `${MENU_URL.REQUEST_ALLOCATION}/[id]`,
                    query: {
                      id,
                    },
                  })
                }}
                onDeleteAction={() =>
                  showDialog(
                    <DialogDelete
                      id={id}
                      backFn={() => {
                        router.push({
                          pathname: MENU_URL.REQUEST_ALLOCATION,
                        })
                      }}
                    />
                  )
                }
                onCancelAction={() => {
                  router.push({
                    pathname: `${MENU_URL.REQUEST_ALLOCATION}`,
                  })
                  handleChangeStatus('TERMINATE')
                }}
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
            content: isLoadingRequestAllocationDetail ? (
              <CoreLoading />
            ) : (
              <FormProvider {...methods}>
                <form className='block rounded-xl mx-auto' onSubmit={onSubmit}>
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        control={control}
                        name='code'
                        label={t('table.requestCode')}
                        inputProps={{
                          maxLength: 50,
                        }}
                        isViewProp={isView}
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
                        name='requestDate'
                        label={t('label.requestDate')}
                        placeholder='DD/MM/YYYY'
                        isViewProp={isView}
                        minDate={moment()}
                      />
                    </Grid>

                    {
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreDatePicker
                          control={control}
                          name='updateDate'
                          label={t('label.desiredDate')}
                          placeholder='DD/MM/YYYY'
                          isViewProp={isView}
                          disabled={!watch('requestDate')}
                          minDate={watch('requestDate')}
                        />
                      </Grid>
                    }

                    {
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreAutocomplete
                          control={control}
                          name='planType'
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
                          label={t('label.planType')}
                          onChangeValue={(value: string) => {
                            if (value !== 'PLANED') {
                              setValue('plan', undefined)
                            }
                          }}
                        />
                      </Grid>
                    }
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
                          onChangeValue={() => {
                            setValue('asset', [
                              {
                                asset: {
                                  id: undefined,
                                  name: '',
                                  code: '',
                                },
                                quantity: null,
                                uom: null,
                                requestQuantity: null,
                              },
                            ])
                            setValue('employee', undefined)
                          }}
                        />
                      </div>
                    </Grid>
                    {/* {watch('allocationChooseType') === 'ORGANIZATION' && (
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
                    )} */}
                    {(watch('allocationChooseType') === 'DEPARTMENT' ||
                      watch('allocationChooseType') === 'EMPLOYEE') && (
                        <Grid item xs={4}>
                          <CoreAutoCompleteAPI
                            name='department'
                            control={control}
                            fetchDataFn={getAllDepartment}
                            label={t('label.department')}
                            placeholder={t('placeholder.department')}
                            onChangeValue={(value) => {
                              setValue('asset', [
                                {
                                  asset: {
                                    id: undefined,
                                    name: '',
                                    code: '',
                                  },
                                  quantity: null,
                                  uom: null,
                                  requestQuantity: null,
                                },
                              ])
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
                          label={t('label.employee')}
                          placeholder={t('placeholder.employee')}
                          disabled={!watch('department')}
                          onChangeValue={(value) => {
                            setValue('asset', [
                              {
                                asset: {
                                  id: undefined,
                                  name: '',
                                  code: '',
                                },
                                quantity: null,
                                uom: null,
                                requestQuantity: null,
                              },
                            ])
                            if (value) {
                              setValue('employee', {
                                id: value.id,
                                name: value.name,
                                code: value.code,
                              })
                            } else {
                              setValue('employee', undefined)
                              setValue('asset', [
                                {
                                  asset: {
                                    id: undefined,
                                    name: '',
                                    code: '',
                                  },
                                  quantity: null,
                                  uom: null,
                                  requestQuantity: null,
                                },
                              ])
                            }
                          }}
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
                                  appendAllocationLineField({
                                    asset: null,
                                    uom: null,
                                    quantity: null,
                                    requestQuantity: null,
                                  })
                                }
                              >
                                {`${t('text.add_asset')}`}
                              </Typography>
                            </Box>
                          ) : (
                            <></>
                          )
                        }
                      />
                    </Grid>

                    {isView && (
                      <Grid item xs={12}>
                        <Typography>
                          {`${t('text.status')}`} :{' '}
                          {getTypeLabelWithColor(
                            dataRequestAllocationDetail?.status ?? 'PENDING',
                            StateWithColorAllocation
                          )}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>

                  {!isView && (
                    <div className='space-x-12 text-center mt-10'>
                      <CoreButton
                        theme='cancel'
                        onClick={() => {
                          if (id) {
                            router.push({
                              pathname: `${MENU_URL.REQUEST_ALLOCATION}/[id]`,
                              query: {
                                id,
                                actionType: 'VIEW',
                              },
                            })
                          } else {
                            router.push(`${MENU_URL.REQUEST_ALLOCATION}`)
                          }
                        }}
                      >
                        {t('common:btn.cancel')}
                      </CoreButton>
                      <CoreButton
                        theme='submit'
                        type='submit'
                        loading={isLoadingSubmit}
                      >
                        {(isUpdate && isCopy) || isCreate
                          ? t('btn.request_allocation')
                          : t('common:btn.save_change')}
                      </CoreButton>
                    </div>
                  )}
                </form>
              </FormProvider>
            ),
          },
        ]}
      />
    </PageContainer>
  )
}
