import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import CoreRadioGroup from '@/components/atoms/CoreRadioGroup'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'
import { REGEX } from '@/helper/regex'
import { MENU_URL } from '@/routes'
import { getFeatureList, getReasonList } from '@/service/asset/reason/getList'
import { getAllDepartment } from '@/service/asset/requestAllocation/getList'
import { getEmployeeListByDepartmentId } from '@/service/resource/getEmployeeListByDepartmentId'
import { getListDispenser } from '@/service/resource/getListDispenser'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'
import DialogListIncident from '../components/DialogListIncident'
import DialogIncidentLogList from '../dialog'
import useIncidentLogListAction from './useIncidentLogListAction'

export default function IncidentLogListAction() {
  const [
    {
      id,
      methods,
      isView,
      isUpdate,
      columns,
      tableData,
      isLoadingGetIncidentLogDetail,
      isLoadingSubmitIncidentLog,
      isLoadingFeatureList,
      dataFeatureList,
      isShowDialogListIncident,
      lineIncidentProductId,
      indexLine,
    },
    {
      t,
      onSubmit,
      appendIncidentLogAsset,
      setDataFeatureList,
      hideDialogListIncident,
    },
  ] = useIncidentLogListAction()
  const { control, watch, setValue, getValues } = methods
  const router = useRouter()
  const { showDialog } = useDialog()

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title'),
              pathname: `${MENU_URL.INCIDENT_LOG_LIST}`,
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
            content: isLoadingGetIncidentLogDetail ? (
              <CoreLoading />
            ) : (
              <FormProvider {...methods}>
                <form onSubmit={onSubmit}>
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <CoreInput
                        name='code'
                        control={control}
                        label={t('label.code_2')}
                        isViewProp={isView}
                        rules={{
                          pattern: {
                            value: REGEX.CODE_NEW,
                            message: t('common:validation.code_new_2'),
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
                        label={t('label.updateDate')}
                        isViewProp={isView}
                        required
                        rules={{
                          required: t('common:validation.required'),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <CoreAutoCompleteAPI
                        name='recorder'
                        control={control}
                        label={'Người ghi nhận'}
                        placeholder={'Chọn người ghi nhận'}
                        isViewProp={isView}
                        fetchDataFn={getListDispenser}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <div className='flex items-center gap-30'>
                        <Typography sx={{ fontWeight: 700 }}>
                          Đối tượng
                        </Typography>
                        <CoreRadioGroup
                          name='allocationChooseType'
                          control={control}
                          disabled={isView}
                          options={[
                            {
                              value: 'ORGANIZATION',
                              label: 'Tổ chức',
                            },
                            {
                              value: 'DEPARTMENT',
                              label: 'Bộ phận',
                            },
                            {
                              value: 'EMPLOYEE',
                              label: 'Nhân viên',
                            },
                          ]}
                          onChangeValue={() => {
                            setValue('asset', [
                              {
                                assetIdentity: null,
                                product: null,
                                incidentRecodingIds: [],
                                recordConditionType: [],
                                recordConditionTypeAll: [],
                                handlingPlanType: '',
                              },
                            ])
                            setValue('employee', undefined)
                          }}
                        />
                      </div>
                    </Grid>
                    {watch('allocationChooseType') === 'DEPARTMENT' && (
                      <>
                        <Grid item xs={4}>
                          <CoreAutoCompleteAPI
                            name='department'
                            control={control}
                            fetchDataFn={getAllDepartment}
                            label={'Bộ phận cấp phát'}
                            placeholder='Chọn bộ phận cấp phát'
                            isViewProp={isView}
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
                            label={'Bộ phận cấp phát'}
                            placeholder='Chọn bộ phận cấp phát'
                            isViewProp={isView}
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
                            label={'Nhân viên'}
                            placeholder='Chọn nhân viên'
                            disabled={!watch('department')}
                            isViewProp={isView}
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
                    <Grid item xs={12} sm={12} md={4}>
                      <CoreAutoCompleteAPI
                        control={control}
                        name='reasonRecall'
                        label={t('label.reasonRecall')}
                        placeholder=''
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
                            name='note'
                            control={control}
                            label={'Ghi chú'}
                            placeholder={'Nhập ghi chú'}
                            isViewProp={isView}
                            multiline
                            inputProps={{
                              maxLength: 1000,
                            }}
                          />
                        </Grid>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            marginBottom: 2,
                          }}
                        >
                          {'Thông tin ghi nhận sự cố tài sản'}
                        </Typography>
                      </Grid>
                      <CoreTable
                        tableName='incident_log'
                        columns={columns}
                        data={tableData}
                        paginationHidden
                        actionTable={
                          !isView ? (
                            <ActionTable
                              action={`${t('btn.addAsset')}`}
                              columns={columns}
                              append={appendIncidentLogAsset}
                              defaultValueLine={{
                                identity: null,
                                assetCode: null,
                                assetName: null,
                                recordConditionType: '',
                                handlingPlanType: '',
                              }}
                              style={{
                                border: 'none',
                              }}
                            />
                          ) : (
                            <></>
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                  {!isView && (
                    <div className='space-x-12 text-center mt-10'>
                      <CoreButton
                        theme='cancel'
                        onClick={() => {
                          router.push(`${MENU_URL.INCIDENT_LOG_LIST}`)
                        }}
                      >
                        {t('common:btn.destroy')}
                      </CoreButton>

                      <CoreButton
                        theme='submit'
                        type='submit'
                        loading={isLoadingSubmitIncidentLog}
                      >
                        {isUpdate ? t('common:btn.edit') : t('common:btn.add')}
                      </CoreButton>
                    </div>
                  )}

                  {isShowDialogListIncident && (
                    <DialogListIncident
                      hideDialogListIncident={hideDialogListIncident}
                      productId={lineIncidentProductId}
                      indexLine={indexLine}
                    />
                  )}
                </form>
              </FormProvider>
            ),
            rightAction: (
              <TopAction
                actionList={
                  isView ? ['edit', 'delete'] : isUpdate ? ['delete'] : []
                }
                onEditAction={() => {
                  router.push({
                    pathname: `${MENU_URL.INCIDENT_LOG_LIST}/[id]`,
                    query: {
                      id: id,
                    },
                  })
                }}
                onDeleteAction={() => {
                  showDialog(<DialogIncidentLogList />)
                }}
              />
            ),
          },
        ]}
      />
    </PageContainer>
  )
}
