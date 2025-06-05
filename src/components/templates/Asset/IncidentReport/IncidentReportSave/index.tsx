import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import React from 'react'
import useIncidentReportSave from './useIncidentReportSave'
import CoreInput from '@/components/atoms/CoreInput'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { FormProvider } from 'react-hook-form'
import { getParamAssetOperate } from '@/service/asset/operate/save/getListParamAssetOperate'
import { TopAction } from '@/components/molecules/TopAction'
import { useRouter } from 'next/router'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreLoading from '@/components/molecules/CoreLoading'
import { REGEX } from '@/helper/regex'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'
import { getAssetList } from '@/service/product/getAssetList'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import { EvaluateAsset } from '@/enum'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { getAllDepartment } from '@/service/asset/requestAllocation/getList'
import { getListDispenser } from '@/service/resource/getListDispenser'
import IncidentTableCustom from '../../Operate/OperateSave/components/IncidentTableCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogDelete } from '../DialogDelete'
import { getPositionByAssetId } from '@/service/asset/incidentReport/save/getPositionByAssetId'
import { toastError } from '@/toast'
import { CoreDateTimePicker } from '@/components/atoms/CoreDateTimePicker'
import { getListAssetStatusManagement } from '@/service/asset/assetStatusManagement/list'

export default function IncidentReportSave() {
  const [values, handles] = useIncidentReportSave()
  const {
    methodForm,
    isView,
    isLoadingSubmit,
    isUpdate,
    id,
    isLoading,
    assetColumns,
    updatedItemsIncident,
    updatedItemsIncidentAddNew,
    prevData,
  } = values
  const {
    t,
    onSubmit,
    onCancel,
    setUpdatedItemsIncident,
    setUpdatedItemsIncidentAddNew,
    setPrevData,
  } = handles
  const { control, watch, setValue, trigger } = methodForm
  const { showDialog } = useDialog()
  const router = useRouter()

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title'),
              pathname: `${MENU_URL.INCIDENT_REPORT}`,
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
            title: t('view'),
            content: isLoading ? (
              <CoreLoading />
            ) : (
              <FormProvider {...methodForm}>
                <form className='block rounded-xl mx-auto' onSubmit={onSubmit}>
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        control={control}
                        name='code'
                        label={t('table.reportTicketCode')}
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
                      <CoreInput
                        control={control}
                        name='name'
                        label={t('table.reportTicketName')}
                        required
                        rules={{
                          required: t('common:validation.required'),
                          validate: {
                            trimRequired: (v: any) => {
                              return (
                                v.trim().length > 0 ||
                                t('common:validation.required')
                              )
                            },
                          },
                        }}
                        inputProps={{
                          maxLength: 250,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutoCompleteAPI
                        control={control}
                        name='recorder'
                        label={t('table.recorder')}
                        placeholder=''
                        fetchDataFn={getListDispenser}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <SelectBoxCustom
                        columns={assetColumns}
                        control={control}
                        name='product'
                        valuePath='id'
                        labelPath='sku'
                        label={t('table.assetCode')}
                        placeholder={`${t('placeholder.assetCode')}`}
                        fetchDataFn={getAssetList}
                        params={{
                          isAsset: true,
                        }}
                        onChangeValue={(val) => {
                          if (val) {
                            setValue('assetName', val.name)
                          } else {
                            setValue('assetName', '')
                          }
                          setValue('asset', null)
                        }}
                        trigger={trigger}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutoCompleteAPI
                        control={control}
                        name='asset'
                        label='DIC'
                        placeholder=''
                        required
                        rules={{
                          required: t('common:validation.required'),
                        }}
                        valuePath='id'
                        labelPath='code'
                        fetchDataFn={getParamAssetOperate}
                        params={{
                          productId: watch('product')?.id,
                        }}
                        isViewProp={isView || !watch('product')?.id}
                        onChangeValue={async (val) => {
                          if (val) {
                            try {
                              const res = await getPositionByAssetId({
                                assetId: val?.id,
                              })
                              setValue('department', res?.data?.department)
                            } catch (e) {
                              toastError(e)
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        control={control}
                        name='assetName'
                        label={t('table.assetName')}
                        inputProps={{
                          maxLength: 250,
                        }}
                        isViewProp
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutoCompleteAPI
                        control={control}
                        name='department'
                        label={t('table.managedBy')}
                        placeholder=''
                        fetchDataFn={getAllDepartment}
                        isViewProp
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreDateTimePicker
                        control={control}
                        name='recordingTime'
                        label={t('table.creationDate')}
                        disableFuture
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} marginY='20px'>
                      <Typography
                        fontWeight='bold'
                        fontSize='20px'
                        margin='20px 0px'
                      >
                        {t('incidentList')}
                      </Typography>
                      <IncidentTableCustom
                        serviceType='INCIDENT_REPORT'
                        productId={watch('product')?.id}
                        assetId={watch('asset')?.id}
                        setValueParent={setValue}
                        updatedItemsIncident={updatedItemsIncident}
                        setUpdatedItemsIncident={setUpdatedItemsIncident}
                        updatedItemsIncidentAddNew={updatedItemsIncidentAddNew}
                        setUpdatedItemsIncidentAddNew={
                          setUpdatedItemsIncidentAddNew
                        }
                        prevData={prevData}
                        setPrevData={setPrevData}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutoCompleteAPI
                        control={control}
                        name='severityManagement'
                        label={t('table.status')}
                        placeholder=''
                        fetchDataFn={getListAssetStatusManagement}
                        params={{
                          managementType: 'ASSET_STATUS_MANAGEMENT',
                          isActive: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CoreInput
                        multiline
                        control={control}
                        name='note'
                        label={t('table.note')}
                        inputProps={{
                          maxLength: 1000,
                        }}
                      />
                    </Grid>
                  </Grid>
                  {!isView && (
                    <div className='space-x-12 text-center mt-10'>
                      <CoreButton theme='cancel' onClick={onCancel}>
                        {t('common:btn.cancel')}
                      </CoreButton>
                      <CoreButton
                        theme='submit'
                        type='submit'
                        loading={isLoadingSubmit}
                      >
                        {!isUpdate
                          ? t('common:btn.add')
                          : `${t('common:btn.save_change')}`}
                      </CoreButton>
                    </div>
                  )}
                </form>
              </FormProvider>
            ),
            rightAction: !!id && (
              <TopAction
                actionList={['edit', 'delete']}
                onEditAction={() => {
                  router.replace({
                    pathname: `${MENU_URL.INCIDENT_REPORT}/[id]`,
                    query: {
                      id: Number(id),
                    },
                  })
                }}
                onDeleteAction={() =>
                  showDialog(
                    <DialogDelete
                      id={id}
                      backFn={() => {
                        router.push({
                          pathname: MENU_URL.INCIDENT_REPORT,
                        })
                      }}
                    />
                  )
                }
              />
            ),
          },
        ]}
      />
    </PageContainer>
  )
}
