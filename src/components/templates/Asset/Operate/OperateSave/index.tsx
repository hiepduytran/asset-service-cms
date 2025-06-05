import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import React from 'react'
import useOperateSave from './useOperateSave'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { FormProvider, useWatch } from 'react-hook-form'
import { getUserShiftList } from '@/service/hrm/getUserShift'
import ParameterTableCustom from './components/ParameterTableCustom'
import { getParamAssetOperate } from '@/service/asset/operate/save/getListParamAssetOperate'
import { TopAction } from '@/components/molecules/TopAction'
import { useRouter } from 'next/router'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreLoading from '@/components/molecules/CoreLoading'
import { REGEX } from '@/helper/regex'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'
import { getAssetList } from '@/service/product/getAssetList'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import { getListShiftAll } from '@/service/hrm/getListShiftAll'
import IncidentTableCustom from './components/IncidentTableCustom'
import MachineStopTableCustom from './components/MachineStopTableCustom'

export default function OperateSave() {
  const [values, handles] = useOperateSave()
  const {
    methodForm,
    isView,
    isLoadingSubmit,
    isUpdate,
    id,
    isLoading,
    assetColumns,
    userId,
    isLoadingShift,
    updatedItemsMS,
    updatedItemsIncident,
    updatedItemsIncidentAddNew,
    prevData
  } = values
  const { t, onSubmit, onCancel, setUpdatedItemsMS, setUpdatedItemsIncident, setUpdatedItemsIncidentAddNew, setPrevData } = handles
  const { control, watch, setValue, trigger } = methodForm

  const shiftId = useWatch({ control: control, name: 'shift' })?.id
  const router = useRouter()
  const operateLine = watch('operateLine')

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title'),
              pathname: `${MENU_URL.OPERATE}`,
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
            content: (isLoading || isLoadingShift) ? (
              <CoreLoading />
            ) : (
              <FormProvider {...methodForm}>
                <form className='block rounded-xl mx-auto' onSubmit={onSubmit}>
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        control={control}
                        name='code'
                        label={t('operate_save.label.code')}
                        placeholder={t('operate_save.placeholder.code')}
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
                      <CoreAutoCompleteAPI
                        control={control}
                        name='shift'
                        label={t('operate_save.label.shift')}
                        placeholder={t('operate_save.placeholder.shift')}
                        required
                        rules={{
                          required: t('common:validation.required'),
                        }}
                        valuePath='id'
                        labelPath='name'
                        labelPathDisplay={['name', 'startHour', 'endHour']}
                        fetchDataFn={getListShiftAll}
                        isViewProp={isView || userId !== 1}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreDatePicker
                        control={control}
                        name='updateDate'
                        label={t('operate_save.label.updateDate')}
                        placeholder='dd/mm/yyyy'
                        required
                        rules={{
                          required: t('common:validation.required'),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutoCompleteAPI
                        control={control}
                        name='user'
                        label={t('operate_save.label.user')}
                        placeholder={t('operate_save.placeholder.user')}
                        fetchDataFn={getUserShiftList}
                        params={{
                          shiftId: shiftId,
                        }}
                        required
                        rules={{
                          required: t('common:validation.required'),
                        }}
                        isViewProp={!shiftId || isView || userId !== 1}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <SelectBoxCustom
                        columns={assetColumns}
                        control={control}
                        name='product'
                        valuePath='id'
                        labelPath='sku'
                        label={t('operate_save.label.sku')}
                        placeholder={`${t('operate_save.placeholder.sku')}`}
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
                          setValue('operateLine', [])
                        }}
                        trigger={trigger}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutoCompleteAPI
                        control={control}
                        name='asset'
                        label={t('operate_save.label.asset')}
                        placeholder={t('operate_save.placeholder.asset')}
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
                        onChangeValue={(val) => {
                          if (val) {
                            setValue('operateLine', val.informationData)
                          } else {
                            setValue('operateLine', [])
                          }
                        }}
                        isViewProp={isView || !watch('product')?.id}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        control={control}
                        name='assetName'
                        label={t('operate_save.label.name')}
                        placeholder={t('operate_save.placeholder.name')}
                        inputProps={{
                          maxLength: 250,
                        }}
                        isViewProp
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <CoreInput
                        multiline
                        control={control}
                        name='note'
                        label={t('operate_save.label.note')}
                        placeholder={t('operate_save.placeholder.note')}
                        inputProps={{
                          maxLength: 1000,
                        }}
                      />
                    </Grid>
                    {/* <div
                      style={{
                        alignItems: 'center',
                        backgroundColor: '#edeef7',
                        padding: '18px',
                        width: '100%',
                        marginLeft: '22px',
                        marginTop: '15px',
                      }}
                    >
                      <Typography fontWeight='bold' fontSize='16px'>
                        {`${t('operate_save.text.info_stop')}`}
                      </Typography>
                    </div>

                    {(shutdownInformation ?? []).map((item, index) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          key={item.key}
                        >
                          <RenderInformation
                            index={index}
                            isView={isView}
                            remove={remove}
                            append={append}
                            fieldLength={shutdownInformation?.length}
                          />
                        </Grid> 
                      )
                    })}
                    <Grid item xs={12}>
                      <Typography fontWeight='bold' fontSize='16px'>
                        {`${t('operate_save.text.info_flow')}`}
                      </Typography>
                    </Grid> */}
                    <CoreNavbar
                      styles={{ marginTop: '20px', width: '100%' }}
                      isFitContent
                      breadcrumbs={
                        [
                          {
                            title: t('recordParameter'),
                            content: (
                              <ParameterTableCustom operateLine={operateLine ?? []} />
                            ),
                            minWidthTabItem: 150,
                          },
                          {
                            title: t('recordIncident'),
                            content: (
                              <IncidentTableCustom serviceType='OPERATE' productId={watch('product')?.id} assetId={watch('asset')?.id} setValueParent={setValue} updatedItemsIncident={updatedItemsIncident} setUpdatedItemsIncident={setUpdatedItemsIncident} updatedItemsIncidentAddNew={updatedItemsIncidentAddNew} setUpdatedItemsIncidentAddNew={setUpdatedItemsIncidentAddNew} prevData={prevData} setPrevData={setPrevData} />
                            ),
                            minWidthTabItem: 150,
                          },
                          {
                            title: t('updateMachineStop'),
                            content: (
                              <MachineStopTableCustom assetId={watch('asset')?.id} shift={watch('shift')} setValueParent={setValue} updatedItemsMS={updatedItemsMS} setUpdatedItemsMS={setUpdatedItemsMS} />
                            ),
                            minWidthTabItem: 150,
                          },
                        ]
                      }
                    />

                    {/* <Grid item xs={12}>
                      <Typography fontWeight='bold' fontSize='16px'>
                        {`${t('operate_save.text.status_assessment')}`}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutocomplete
                        control={control}
                        name='evaluateAsset'
                        label={t('operate_save.label.evaluateAsset')}
                        placeholder={`${t(
                          'operate_save.placeholder.evaluateAsset'
                        )}`}
                        required
                        rules={{
                          required: t('common:validation.required'),
                        }}
                        options={EvaluateAsset}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CoreInput
                        multiline
                        control={control}
                        name='conditionDescription'
                        label={t('operate_save.label.conditionDescription')}
                        placeholder={t(
                          'operate_save.placeholder.conditionDescription'
                        )}
                        inputProps={{
                          maxLength: 1000,
                        }}
                      />
                    </Grid> */}
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
                        {isUpdate
                          ? t('common:btn.save_change')
                          : `${t('operate_save.text.save_log')}`}
                      </CoreButton>
                    </div>
                  )}
                </form>
              </FormProvider>
            ),
            rightAction: !!id && (
              <TopAction
                actionList={['edit']}
                onEditAction={() => {
                  router.replace({
                    pathname: `${MENU_URL.OPERATE}/[id]`,
                    query: {
                      id: Number(id),
                    },
                  })
                }}
              />
            ),
          },
        ]}
      />
    </PageContainer>
  )
}
