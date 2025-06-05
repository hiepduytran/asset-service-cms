import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import CoreRadioGroup from '@/components/atoms/CoreRadioGroup'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { AnotherAddress } from '@/service/partner/partner/get/type'
import { getCityList } from '@/service/resource/city/list'
import { getListCountry } from '@/service/resource/countries'
import { getDistrictListByCityId } from '@/service/resource/district/list'
import { getWardListByDistrictId } from '@/service/resource/ward/getList'
import { Box, Typography } from '@mui/material'
import { LIST_ADDRESS_TYPE } from '../../utils'
import { useAddressDialog } from './useAddressDialog'
import { CoreButton } from '@/components/atoms/CoreButton'

export type Props = {
  onSubmit: any
  t: any
  isEdit: boolean
  data?: AnotherAddress
  index?: number
}

export const AddressDialog = (props: Props) => {
  const { onSubmit, t, isEdit, index } = props
  const [values, handles] = useAddressDialog(props)
  const { control, isLoadingRegionList, regionList } = values
  const { handleSubmit, watch, setValue } = handles
  const { hideDialog } = useDialog()

  const [countryId, regionId, cityId, districtId, addressType] = watch([
    'countryId',
    'regionId',
    'cityId',
    'districtId',
    'addressType',
  ])

  return (
    <CoreDialog
      title="Thêm địa chỉ"
      onClose={hideDialog}
      PaperProps={{}}
      formProps={{
        onSubmit: handleSubmit((val) => {
          onSubmit(val, index, isEdit)
          hideDialog()
        }),
      }}
      maxWidth="lg"
      fullWidth
    >
      <Box className="p-20">
        <CoreRadioGroup
          className="mb-18"
          name="addressType"
          control={control}
          options={LIST_ADDRESS_TYPE.map((v) => {
            return {
              ...v,
              label: (
                <Typography variant="body2" color="initial">
                  {v.label}
                </Typography>
              ),
            }
          })}

        />
        {addressType === 'OTHER_ADDRESS' && (
          <CoreInput
            control={control}
            className="my-15"
            name="name"
            label={'Tên địa chỉ'}
            required
            rules={{ required: t('common:validation.required') }}
          />
        )}
        <Box className="grid w-full grid-cols-3 gap-15 mb-15">
          <CoreAutoCompleteAPI
            control={control}
            name="country"
            label={t('country')}
            placeholder=''
            fetchDataFn={getListCountry}
            params={{ activated: true }}
            onChangeValue={(val) => {
              setValue('countryId', val?.id)
              setValue('region', null)
              setValue('regionId', null)
              setValue('city', null)
              setValue('cityId', null)
              setValue('district', null)
              setValue('districtId', null)
              setValue('ward', null)
              setValue('wardId', null)
            }}
          />

          <CoreAutocomplete
            control={control}
            name="region"
            label={t('region')}
            onChangeValue={(val) => {
              setValue('regionId', val?.id)
              setValue('city', null)
              setValue('cityId', null)
              setValue('district', null)
              setValue('districtId', null)
              setValue('ward', null)
              setValue('wardId', null)
            }}
            disabled={!countryId}
            options={regionList}
            returnValueType="option"
            valuePath="id"
            labelPath="name"
            loading={isLoadingRegionList}
          />

          <CoreAutoCompleteAPI
            control={control}
            name="city"
            label={t('city')}
            fetchDataFn={getCityList}
            placeholder=''
            params={{ activated: true, regionId }}
            disabled={!regionId}
            onChangeValue={(val) => {
              setValue('cityId', val?.id)
              setValue('district', null)
              setValue('districtId', null)
              setValue('ward', null)
              setValue('wardId', null)
            }}
          />

          <CoreAutoCompleteAPI
            control={control}
            name="district"
            label={t('district')}
            placeholder=''
            fetchDataFn={getDistrictListByCityId}
            params={{ activated: true, cityId }}
            disabled={!cityId}
            onChangeValue={(val) => {
              setValue('districtId', val?.id)
              setValue('ward', null)
              setValue('wardId', null)
            }}
          />

          <CoreAutoCompleteAPI
            control={control}
            name="ward"
            label={t('ward')}
            placeholder=''
            fetchDataFn={getWardListByDistrictId}
            params={{ activated: true, districtId }}
            disabled={!districtId}
            onChangeValue={(val) => {
              setValue('wardId', val?.id)
            }}
          />

          <CoreInput name="address" control={control} label={t('address')} />
        </Box>
        <div className='flex justify-center items-center gap-10'>
          <CoreButton
            theme='cancel'
            onClick={hideDialog}
          >
            Hủy
          </CoreButton>
          <CoreButton theme='submit' type='submit'>
            {isEdit ? 'Chỉnh sửa' : 'Thêm mới'}
          </CoreButton>
        </div>
      </Box>
    </CoreDialog>
  )
}
