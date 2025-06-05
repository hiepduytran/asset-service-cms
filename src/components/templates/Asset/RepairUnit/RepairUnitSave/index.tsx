import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import CoreSwitch from '@/components/atoms/CoreSwitch'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import UploadBox from '@/components/molecules/UploadBox'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { getCityList } from '@/service/resource/city/list'
import { getDistrictListByCityId } from '@/service/resource/district/list'
import { getOrgList } from '@/service/resource/org/getList'
import { getWardListByDistrictId } from '@/service/resource/ward/getList'
import { Box, Grid, Typography } from '@mui/material'
import { CustomTabs } from './components/CustomTabs'
import { getListCountry } from '@/service/resource/countries'
import { getRegionList } from '@/service/resource/region/list'
import { getListAsset } from '@/service/product/getListAsset'
import { useRepairUnitSave } from './useRepairUnitSave'
import CoreLoading from '@/components/molecules/CoreLoading'
import { DialogDeletePartner } from './components/DialogDeletePartner'
import { getListVendor } from '@/service/partner/vendor/list'
import { REGEX } from '@/helper/regex'
import { getListPartnerTag } from '@/service/partner/partnerTag/list'
import React from 'react'
import { getAccessoryByProductId } from '@/service/asset/assetPeriod/save/getAccessoryByProductId'
import AutoCompleteAPICustom from '../../Operate/OperateSave/components/DialogIncident/AutoCompleteAPICustom'
import { Action } from '@/components/molecules/Action'

export const RepairUnitSave = () => {
  const [values, handles] = useRepairUnitSave()
  const {
    methodForm,
    isView,
    isUpdate,
    id,
    isLoadingSubmit,
    isLoading,
    vendorLoading,
    router,
    type,
    fields,
  } = values

  const { t, onSubmit, onCancel, append, remove } = handles

  const { control, watch, setValue } = methodForm

  const currentOrgId = useAppSelector((state) => state.orgData.id)

  const { showDialog } = useDialog()

  return (
    <PageWithDetail
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: 'Đơn vị sửa chữa',
              pathname: MENU_URL.REPAIR_UNIT,
            },
            {
              title: isView
                ? t('common:btn.viewDetail')
                : isUpdate
                  ? t('common:btn.edit')
                  : type === 'NEW' ? t('common:btn.add') : 'Thêm mới đơn vị có sẵn',
            },
          ]}
        />
      }
      topAction={
        isUpdate && (
          <TopAction
            actionList={['edit', 'delete']}
            onEditAction={() => {
              router.replace({
                pathname: `${MENU_URL.REPAIR_UNIT}/[id]`,
                query: {
                  id,
                },
              })
            }}
            onDeleteAction={() => {
              showDialog(
                <DialogDeletePartner
                  id={Number(id)}
                  backFn={() => {
                    router.push({
                      pathname: MENU_URL.REPAIR_UNIT,
                    })
                  }}
                />
              )
            }}
          />
        )
      }
    >
      {
        isLoading ? (<CoreLoading />)
          : (
            <form className='mx-auto py-15' onSubmit={onSubmit}>
              <Grid container spacing={{ sx: 1, sm: 2, md: 3 }} className='px-15'>
                {type === 'AVAILABLE' && (
                  <Grid item xs={12} sm={12} md={6} lg={6} >
                    <CoreAutoCompleteAPI
                      control={control}
                      name='partnerId'
                      label='Nhà cung cấp'
                      placeholder=''
                      required
                      rules={{
                        required: t('common:validation.required'),
                      }}
                      fetchDataFn={getListVendor}
                      labelPathDisplay={['code', 'name']}
                    />
                  </Grid>
                )}
                {vendorLoading ? (
                  <CoreLoading />
                ) : (
                  (type === 'NEW' || watch('partnerId')?.id || !!id) && (
                    <>
                      <Grid item xs={12} sm={12}>
                        <Box className='flex items-center justify-between w-full mb-15'>
                          <Typography variant='h3'>
                            {watch('partner.code')}
                          </Typography>
                          <UploadBox
                            url={watch('partner.avatarUrl')}
                            setUrl={(val) => {
                              setValue('partner.avatarUrl', val as string)
                            }}
                            isViewProp={watch('partnerId')?.id || !!id}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreAutocomplete
                          name='partner.type'
                          control={control}
                          label={t('type')}
                          options={[
                            {
                              label: t('organization'),
                              value: 'ORGANIZATION',
                            },
                            {
                              label: t('individual'),
                              value: 'INDIVIDUAL',
                            },
                          ]}
                          onChangeValue={(val) => {
                            setValue('partner.isCompany', val === 'ORGANIZATION')
                          }}
                          isViewProp={watch('partnerId')?.id || !!id}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreInput
                          name='partner.code'
                          control={control}
                          label={t(`code`)}
                          isViewProp={watch('partnerId')?.id || !!id}
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
                          name='partner.name'
                          control={control}
                          label={t(`name`)}
                          required
                          rules={{ required: t('common:validation.required') }}
                          inputProps={{
                            maxLength: 250,
                          }}
                          isViewProp={watch('partnerId')?.id || !!id}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreAutoCompleteAPI
                          label={t('group')}
                          name='partner.partnerTagIds'
                          control={control}
                          placeholder=''
                          multiple
                          fetchDataFn={getListPartnerTag}
                          isViewProp={watch('partnerId')?.id || !!id}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreDatePicker
                          control={control}
                          name='partner.joinDate'
                          disableFuture
                          label={t('joinDate')}
                          isViewProp={watch('partnerId')?.id || !!id}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreAutocomplete
                          control={control}
                          name='partner.sharingModeVendor'
                          required
                          rules={{
                            required: t('common:validation.required'),
                          }}
                          options={[
                            {
                              label: 'Private',
                              value: 'PRIVATE',
                            },
                            {
                              label: 'Protected',
                              value: 'PROTECTED',
                            },
                            {
                              label: 'Public',
                              value: 'PUBLIC',
                            },
                          ]}
                          label={t('shareMode')}
                          isViewProp={watch('partnerId')?.id || !!id}
                        />
                      </Grid>
                      {watch('partner.sharingModeVendor') === 'PROTECTED' && (
                        <Grid item xs={12} sm={12} md={4} lg={4} >
                          <CoreAutoCompleteAPI
                            control={control}
                            name='partner.orges'
                            label={t('org')}
                            placeholder=''
                            multiple
                            required
                            rules={{
                              required: t('common:validation.required'),
                            }}
                            fetchDataFn={getOrgList}
                            params={{
                              isDefaultCompany: true,
                              activated: true,
                              orgNowId: currentOrgId,
                            }}
                            isViewProp={watch('partnerId')?.id || !!id}
                          />
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <Typography style={{ fontWeight: 'bold' }}>
                          {t('identificationInformation')}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreInput
                          name='partner.phoneNumber'
                          control={control}
                          label={t('phoneNumber')}
                          isViewProp={watch('partnerId')?.id || !!id}
                          inputProps={{ maxLength: 10 }}
                          rules={{
                            pattern: {
                              value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                              message: 'Số điện thoại không hợp lệ',
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreInput
                          name='partner.email'
                          control={control}
                          label={t('email')}
                          isViewProp={watch('partnerId')?.id || !!id}
                          inputProps={{ maxLength: 50 }}
                          rules={{
                            pattern: {
                              value:
                                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                              message: 'Email không hợp lệ',
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreInput
                          name='partner.cardId'
                          control={control}
                          label={t('cardId')}
                          isViewProp={watch('partnerId')?.id || !!id}
                          inputProps={{ maxLength: 50 }}
                          rules={{
                            pattern: {
                              value:
                                /^[0-9]+$/,
                              message: 'Giấy tờ định danh không hợp lệ',
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography style={{ fontWeight: 'bold' }}>
                          {t('mainAddressInformation')}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreAutoCompleteAPI
                          control={control}
                          name='partner.country'
                          label={t('country')}
                          placeholder=''
                          fetchDataFn={getListCountry}
                          params={{ activated: true }}
                          isViewProp={watch('partnerId')?.id || !!id}
                          onChangeValue={() => {
                            setValue('partner.region', null)
                            setValue('partner.city', null)
                            setValue('partner.district', null)
                            setValue('partner.ward', null)
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreAutoCompleteAPI
                          control={control}
                          name='partner.region'
                          label={t('region')}
                          placeholder=''
                          fetchDataFn={getRegionList}
                          params={{ activated: true, countryId: watch('partner.country')?.id }}
                          isViewProp={!watch('partner.country')?.id || watch('partnerId')?.id || !!id}
                          disabled={!watch('partner.country')?.id}
                          onChangeValue={() => {
                            setValue('partner.city', null)
                            setValue('partner.district', null)
                            setValue('partner.ward', null)
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreAutoCompleteAPI
                          control={control}
                          name='partner.city'
                          label={t('city')}
                          placeholder=''
                          fetchDataFn={getCityList}
                          params={{ activated: true, regionId: watch('partner.region')?.id }}
                          isViewProp={!watch('partner.region')?.id || watch('partnerId')?.id || !!id}
                          disabled={!watch('partner.region')?.id}
                          onChangeValue={() => {
                            setValue('partner.district', null)
                            setValue('partner.ward', null)
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreAutoCompleteAPI
                          control={control}
                          name='partner.district'
                          label={t('district')}
                          placeholder=''
                          fetchDataFn={getDistrictListByCityId}
                          params={{ activated: true, cityId: watch('partner.city')?.id }}
                          isViewProp={!watch('partner.city')?.id || watch('partnerId')?.id || !!id}
                          disabled={!watch('partner.city')?.id}
                          onChangeValue={() => {
                            setValue('partner.ward', null)
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreAutoCompleteAPI
                          control={control}
                          name='partner.ward'
                          label={t('ward')}
                          placeholder=''
                          fetchDataFn={getWardListByDistrictId}
                          params={{ activated: true, districtId: watch('partner.district')?.id }}
                          isViewProp={!watch('partner.district')?.id || watch('partnerId')?.id || !!id}
                          disabled={!watch('partner.district')?.id}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreInput
                          name='partner.address'
                          control={control}
                          label={t('address')}
                          isViewProp={watch('partnerId')?.id || !!id}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CoreSwitch control={control} name='partner.vendorActivated' isViewProp={watch('partnerId')?.id || !!id}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomTabs control={control} watch={watch} setValue={setValue} partnerId={watch('partnerId')?.id} />
                      </Grid>
                    </>
                  )
                )}
                <Grid item xs={12}>
                  <Typography style={{ fontWeight: 'bold' }}>
                    Tài sản phụ trách chỉnh sửa
                  </Typography>
                </Grid>
                {
                  fields?.map((item: any, index: number) => (
                    <React.Fragment key={item.key}>
                      <Grid item xs={12} sm={12} md={5} lg={5}>
                        <CoreAutoCompleteAPI
                          control={control}
                          name={`assetMap.${index}.product`}
                          label='Tài sản'
                          placeholder=''
                          fetchDataFn={getListAsset}
                          params={{
                            type: 'ASSET',
                          }}
                          onChangeValue={() => {
                            setValue(`assetMap.${index}.assetAccessory`, [])
                          }}
                          required
                          rules={{
                            required: t('common:validation.required'),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <AutoCompleteAPICustom
                          control={control}
                          name={`assetMap.${index}.assetAccessory`}
                          label='Phụ tùng'
                          placeholder=''
                          fetchDataFn={getAccessoryByProductId}
                          params={{
                            productId: watch(`assetMap.${index}.product`)?.id,
                          }}
                          multiple
                          labelPathDisplay={['code', 'name']}
                          disabled={!watch(`assetMap.${index}.product`)?.id}
                          isViewProp={!watch(`assetMap.${index}.product`)?.id || isView}
                        />
                      </Grid>
                      {!isView && (
                        <Grid item xs={12} sm={12} md={1} lg={1}>
                          <Action
                            actionList={
                              fields.length === 1 ? ['append'] : ['append', 'remove']
                            }
                            onAppendAction={() => {
                              append({
                                product: null,
                                assetAccessory: null
                              })
                            }}
                            onRemoveAction={() => {
                              remove(index)
                            }}
                          />
                        </Grid>
                      )}
                    </React.Fragment>
                  ))
                }
              </Grid>
              {!isView && (
                <Box className='flex justify-center w-full mt-20'>
                  <Box className='flex gap-5'>
                    <CoreButton
                      theme='cancel'
                      onClick={onCancel}
                    >
                      {t('common:btn.cancel')}
                    </CoreButton>
                    <CoreButton
                      theme='submit'
                      type='submit'
                      loading={isLoadingSubmit}
                    >
                      {isUpdate ? t('common:btn.edit') : t('common:btn.add')}
                    </CoreButton>
                  </Box>
                </Box>
              )}
            </form>
          )
      }
    </PageWithDetail >
  )
}
