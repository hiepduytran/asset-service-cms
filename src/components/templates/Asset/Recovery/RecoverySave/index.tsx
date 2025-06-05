import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import CoreRadioGroup from '@/components/atoms/CoreRadioGroup'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import { textColor } from '@/enum'
import { MENU_URL } from '@/routes'
import { getListDispenser } from '@/service/resource/getListDispenser'
import { getFeatureList, getReasonList } from '@/service/asset/reason/getList'
import { getAllDepartment } from '@/service/asset/requestAllocation/getList'
import { getEmployeeListByDepartmentId } from '@/service/resource/getEmployeeListByDepartmentId'
import { Grid, Typography } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import { DialogDeleteRecovery } from '../Dialog/DialogDeleteRecovery'
import DialogRecovery from '../Dialog/DialogRecovery'
import useRecoverySave from './useRecoverySave'
import TableWarehouseReceipt from '../components/TableWarehouseReceipt'
import { REGEX } from '@/helper/regex'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'

export default function RecoverySave() {
  const [
    {
      id,
      router,
      methods,
      isView,
      isUpdate,
      isLoadingAssetRecoveryDetail,
      isLoadingSubmit,
      columns,
      tableData,
      isShowDialogRecovery,
      dataFeatureList,
      isLoadingFeatureList,
      dataStockPickingWarehouseReceipt,
      isLoadingStockPickingWarehouseReceipt,
    },
    {
      t,
      onSubmit,
      append,
      onSaveChange,
      onRecoverForm,
      hideDialog,
      setDataFeatureList,
      showDialog,
    },
  ] = useRecoverySave()

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
            content: isLoadingAssetRecoveryDetail || isLoadingStockPickingWarehouseReceipt ? (
              <CoreLoading />
            ) : (
              <FormProvider {...methods}>
                <form className='block rounded-xl mx-auto' onSubmit={onSubmit}>
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        control={control}
                        name='code'
                        label={t('table.recoveryCode')}
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
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreDatePicker
                        control={control}
                        name='updateDate'
                        label={t('label.desiredAllocationDate')}
                        placeholder='DD/MM/YYYY'
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutoCompleteAPI
                        control={control}
                        name='collector'
                        label={t('label.dispenser')}
                        placeholder=''
                        fetchDataFn={getListDispenser}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <div className='flex items-center gap-30'>
                        <Typography sx={{ fontWeight: 700 }}>
                          {`${t('text.recovery_from')}`}
                        </Typography>
                        <CoreRadioGroup
                          name='allocationChooseType'
                          control={control}
                          disabled={isView}
                          onChangeValue={() => {
                            setValue('asset', [
                              {
                                assetIdentity: null,
                                product: null,
                                recordConditionType: null,
                                handlingPlanType: null,
                              },
                            ])
                            setValue('employee', undefined)
                          }}
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
                            name='organization'
                            control={control}
                            label={t('label.organization')}
                            placeholder={t('placeholder.organization')}
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
                            label={t('label.department')}
                            placeholder={t('placeholder.department')}
                            onChangeValue={(value) => {
                              if (value) {
                                setValue('asset', [
                                  {
                                    assetIdentity: null,
                                    product: null,
                                    recordConditionType: null,
                                    handlingPlanType: null,
                                  },
                                ])
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
                            onChangeValue={(value) => {
                              setValue('asset', [
                                {
                                  assetIdentity: null,
                                  product: null,
                                  recordConditionType: null,
                                  handlingPlanType: null,
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
                            label={t('label.employee')}
                            placeholder={t('placeholder.employee')}
                            disabled={!watch('department')}
                            onChangeValue={(value) => {
                              setValue('asset', [
                                {
                                  assetIdentity: null,
                                  product: null,
                                  recordConditionType: null,
                                  handlingPlanType: null,
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
                        label={t('label.reasonRecall')}
                        placeholder={t('placeholder.reasonRecall')}
                        required
                        fetchDataFn={getReasonList}
                        params={{
                          isActive: true,
                        }}
                        rules={{ required: t('common:validation.required') }}
                        onChangeValue={async (val) => {
                          setValue('feature', null)
                          setValue('reference', null)
                          if (val) {
                            const result = await getFeatureList({
                              id: watch('reasonRecall.id'),
                            })

                            setDataFeatureList(result.data)
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
                          placeholder={`${t('placeholder.feature')}`}
                          required
                          options={dataFeatureList}
                          loading={isLoadingFeatureList}
                          labelPath='name'
                          valuePath='id'
                          disabled={!watch('reasonRecall')}
                          rules={{ required: t('common:validation.required') }}
                        />
                      </Grid>
                    )}

                    {dataFeatureList.length > 0 && (
                      <Grid item xs={12} sm={12} md={4}>
                        <CoreAutocomplete
                          control={control}
                          name='reference'
                          label={t('label.reference')}
                          placeholder={`${t('placeholder.reference')}`}
                          options={[]}
                          labelPath='name'
                          valuePath='id'
                          loading={isLoadingFeatureList}
                          disabled={!watch('reasonRecall')}
                        // required
                        // rules={{ required: t('common:validation.required') }}
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
                      <Typography fontWeight='bold'>
                        {t('text.info')}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <CoreTable
                        columns={columns}
                        data={tableData}
                        paginationHidden
                        actionTable={
                          !isView ? (
                            <ActionTable
                              action={`${t('text.recovery_add')}`}
                              columns={columns}
                              append={append}
                              defaultValueLine={{
                                assetIdentity: null,
                                product: null,
                                recordConditionType: null,
                                handlingPlanType: null,
                              }}
                            />
                          ) : (
                            <></>
                          )
                        }
                      />
                    </Grid>
                    {isView && (
                      <Grid item xs={12}>
                        <div className='flex gap-4'>
                          <Typography>{`${t('text.status')}`}</Typography>
                          <Typography>
                            {textColor(getValues('allocationStatus'))}
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
                          router.push(`${MENU_URL.RECOVERY}`)
                        }}
                      >
                        {t('common:btn.destroy')}
                      </CoreButton>
                      {isUpdate ? (
                        <CoreButton
                          theme='submit'
                          loading={isLoadingSubmit}
                          onClick={onSaveChange}
                        >
                          {t('common:btn.save_change')}
                        </CoreButton>
                      ) : (
                        <>
                          <CoreButton
                            theme='submit'
                            type='submit'
                            loading={isLoadingSubmit}
                            disabled={(watch('asset') ?? []).some(
                              (item) => item.recordConditionType !== 'NORMAL'
                            )}
                          >
                            {t('button.recover')}
                          </CoreButton>
                          <CoreButton
                            theme='submit'
                            onClick={onRecoverForm}
                            loading={isLoadingSubmit}
                            disabled={(watch('asset') ?? []).every(
                              (item) => item.recordConditionType === 'NORMAL'
                            )}
                          >
                            {t('button.recover_form')}
                          </CoreButton>
                        </>
                      )}
                    </div>
                  )}
                </form>
                {isShowDialogRecovery.isShow && (
                  <DialogRecovery
                    type={isShowDialogRecovery.type}
                    hideDialog={hideDialog}
                    data={getValues()}
                  />
                )}
              </FormProvider>
            ),
            rightAction: isUpdate && (
              <TopAction
                actionList={
                  getValues('allocationStatus') === 'NOT_RECALL'
                    ? ['cancel']
                    : []
                }
                onCancelAction={() => {
                  showDialog(
                    <DialogDeleteRecovery
                      id={getValues('id')}
                      backFn={() => {
                        router.replace({
                          pathname: `${MENU_URL.RECOVERY}`,
                        })
                      }}
                    />
                  )
                }}
              />
            ),
          },
          ...(getValues('cardId') && dataStockPickingWarehouseReceipt?.[0]?.state !== 'WAITING'
            ? [
              {
                title: t('text.warehouse_receipt'),
                content: (
                  <TableWarehouseReceipt
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
