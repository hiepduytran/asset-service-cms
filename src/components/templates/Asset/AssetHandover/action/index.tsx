import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import CoreRadioGroup from '@/components/atoms/CoreRadioGroup'
import CoreLoading from '@/components/molecules/CoreLoading'
import { ActionType, TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { textColor } from '@/enum'
import { BLUE } from '@/helper/colors'
import { REGEX } from '@/helper/regex'
import { MENU_URL } from '@/routes'
import { getFeatureList, getReasonList } from '@/service/asset/reason/getList'
import { getAllDepartment } from '@/service/asset/requestAllocation/getList'
import { getEmployeeListByDepartmentId } from '@/service/resource/getEmployeeListByDepartmentId'
import { getListDispenser } from '@/service/resource/getListDispenser'
import { Box, Grid, Typography } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import DialogAssetHandover from '../components/Dialog/DialogAssetHandover'
import { DialogCancelAssetHandover } from '../components/Dialog/DialogCancelAssetHandover'
import UploadFiles from '../components/UploadFiles'
import useAssetHandoverAction from './useAssetHandoverAction'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'

export default function AssetHandoverAction() {
  const [
    {
      id,
      methods,
      isView,
      isUpdate,
      router,
      tableData,
      columns,
      isLoadingGetTransferAssetDetail,
      dataFeatureList,
      isLoadingFeatureList,
      isShowDialogHandover,
    },
    {
      t,
      appendTransferAssetDetail,
      onSubmit,
      setDataFeatureList,
      setIsLoadingFeatureList,
      hideDialog,
      onRecoverForm,
      showDialog,
    },
  ] = useAssetHandoverAction()
  const { control, watch, setValue, getValues } = methods

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title'),
              pathname: MENU_URL.ASSET_HANDOVER,
            },
            {
              title: getTitleBreadcrumbs(t, isView, isUpdate),
            },
          ]}
        />
      }
    >
      {
        <CoreNavbar
          breadcrumbs={[
            {
              title: t('common:detail'),
              content: isLoadingGetTransferAssetDetail ? (
                <CoreLoading />
              ) : (
                <FormProvider {...methods}>
                  <form onSubmit={onSubmit}>
                    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                      <Grid item xs={12} sm={12} md={4}>
                        <CoreInput
                          name='code'
                          control={control}
                          label={t('table.code')}
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
                          name='transferDate'
                          control={control}
                          label={t('table.updateDate')}
                          placeholder='DD/MM/YYYY'
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreAutoCompleteAPI
                          control={control}
                          name='collector'
                          label={t('label.dispenser')}
                          placeholder={t('placeholder.dispenser')}
                          fetchDataFn={getListDispenser}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <div className='flex items-center gap-30'>
                          <Typography sx={{ fontWeight: 700 }}>
                            Bàn giao từ
                          </Typography>
                          <CoreRadioGroup
                            name='allocationChooseType'
                            control={control}
                            disabled={isView}
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
                            onChangeValue={() => {
                              setValue('asset', [
                                {
                                  assetIdentity: null,
                                  product: null,
                                  recordConditionType: null,
                                  handlingPlanType: null,
                                  allocationChooseType: null,
                                  organization: null,
                                  department: null,
                                  employee: null,
                                },
                              ])
                              setValue('employee', undefined)
                            }}
                          />
                        </div>
                      </Grid>

                      {/* {watch('allocationChooseType') === 'ORGANIZATION' && (
                        <>
                          <Grid item xs={4}>
                            <CoreAutoCompleteAPI
                              placeholder='Chọn tổ chức'
                              label={'Tổ chức'}
                              name='organization'
                              control={control}
                              fetchDataFn={getAllOrg}
                              isViewProp={true}
                              onChangeValue={(value) => {
                                if (value) {
                                  setValue('organization', {
                                    id: value.id,
                                    name: value.name,
                                  })
                                } else {
                                  setValue('organization', undefined)
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
                              label={t('label.allocationDepartment')}
                              placeholder=''
                              onChangeValue={(value) => {
                                setValue('asset', [
                                  {
                                    assetIdentity: null,
                                    product: null,
                                    recordConditionType: null,
                                    handlingPlanType: null,
                                    allocationChooseType: null,
                                    organization: null,
                                    department: null,
                                    employee: null,
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
                              label={t('label.allocationDepartment')}
                              placeholder=''
                              onChangeValue={(value) => {
                                setValue('asset', [
                                  {
                                    assetIdentity: null,
                                    product: null,
                                    recordConditionType: null,
                                    handlingPlanType: null,
                                    allocationChooseType: null,
                                    organization: null,
                                    department: null,
                                    employee: null,
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
                                setValue('asset', [
                                  {
                                    assetIdentity: null,
                                    product: null,
                                    recordConditionType: null,
                                    handlingPlanType: null,
                                    allocationChooseType: null,
                                    organization: null,
                                    department: null,
                                    employee: null,
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

                      <Grid item xs={12} sm={12} md={4}>
                        <CoreAutoCompleteAPI
                          control={control}
                          name='reasonRecall'
                          label={t('label.handoverReason')}
                          placeholder=''
                          fetchDataFn={getReasonList}
                          params={{
                            isActive: true,
                          }}
                          onChangeValue={async (val) => {
                            setValue('feature', null)
                            setValue('reference', null)
                            if (val) {
                              setIsLoadingFeatureList(true)
                              const result = await getFeatureList({
                                id: watch('reasonRecall.id'),
                              })

                              setDataFeatureList(result.data)
                              setIsLoadingFeatureList(false)
                            } else {
                              setDataFeatureList([])
                            }
                          }}
                        />
                      </Grid>

                      {dataFeatureList.length > 0 && (
                        <Grid item xs={12} sm={12} md={4}>
                          <CoreAutocomplete
                            control={control}
                            name='feature'
                            label={t('label.feature')}
                            options={dataFeatureList}
                            loading={isLoadingFeatureList}
                            labelPath='name'
                            valuePath='id'
                            disabled={!watch('reasonRecall')}
                            required
                            rules={{
                              required: t('common:validation.required'),
                            }}
                            returnValueType='option'
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
                            marginTop: 2,
                            marginBottom: 2,
                            fontWeight: 700,
                          }}
                        >
                          {`${t('text.handover_asset_info')}`}
                        </Typography>
                        <CoreTable
                          tableName='asset'
                          columns={columns}
                          data={tableData}
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
                                    appendTransferAssetDetail({
                                      assetIdentity: null,
                                      product: null,
                                      recordConditionType: null,
                                      handlingPlanType: null,
                                      allocationChooseType: null,
                                      organization: null,
                                      department: null,
                                      employee: null,
                                    })
                                  }
                                >
                                  {`${t('text.handover_asset_add')}`}
                                </Typography>
                              </Box>
                            ) : (
                              <></>
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Typography
                          sx={{
                            marginTop: 2,
                            marginBottom: 2,
                            fontWeight: 700,
                          }}
                        >
                          {`${t('text.form_signature')}`}
                        </Typography>
                        <UploadFiles isView={isView} />
                      </Grid>

                      {isView && (
                        <Grid item xs={12}>
                          <div className='flex gap-4'>
                            <Typography>{`${t('text.status')}`}</Typography>
                            <Typography>
                              {textColor(getValues('status'))}
                            </Typography>
                          </div>
                        </Grid>
                      )}
                    </Grid>

                    {!isView && (
                      <div className='space-x-12 text-center mt-10'>
                        <CoreButton
                          theme='cancel'
                          onClick={() => {
                            router.push({
                              pathname: `${MENU_URL.ASSET_HANDOVER}`,
                            })
                          }}
                        >
                          {t('common:btn.destroy')}
                        </CoreButton>
                        <CoreButton
                          theme='submit'
                          type='submit'
                          disabled={(watch(`asset`) ?? []).some(
                            (item) => item.recordConditionType !== 'NORMAL'
                          )}
                        >
                          {`${t('btn.handover')}`}
                        </CoreButton>
                        <CoreButton
                          theme='submit'
                          onClick={onRecoverForm}
                          disabled={(watch(`asset`) ?? []).every(
                            (item) => item.recordConditionType === 'NORMAL'
                          )}
                        >
                          {`${t('btn.handover_form')}`}
                        </CoreButton>
                      </div>
                    )}
                  </form>
                  {isShowDialogHandover.isShow && (
                    <DialogAssetHandover
                      type={isShowDialogHandover.type}
                      hideDialog={hideDialog}
                      data={getValues()}
                    />
                  )}
                </FormProvider>
              ),
              rightAction: (
                <TopAction
                  actionList={
                    [
                      ...(getValues('status') !== null &&
                        getValues('status') !== 'TRANSFER'
                        ? ['cancel']
                        : []),
                    ] as ActionType[]
                  }
                  onCancelAction={() => {
                    showDialog(
                      <DialogCancelAssetHandover
                        id={getValues('id')}
                        backFn={() => {
                          router.push({
                            pathname: `${MENU_URL.ASSET_HANDOVER}`,
                          })
                        }}
                      />
                    )
                  }}
                />
              ),
            },
          ]}
        />
      }
    </PageContainer>
  )
}
