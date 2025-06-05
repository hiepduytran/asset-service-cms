import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import UploadBox from '@/components/molecules/UploadBox'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { Contact } from '@/service/partner/partner/get/type'
import { Box } from '@mui/material'
import { NAME_HARD } from '../../utils'
import { useContactDialog } from './useContactDialog'
import { CoreButton } from '@/components/atoms/CoreButton'

export type Props = {
  onSubmit: any
  t: any
  isEdit: boolean
  data?: Contact
  index?: number
}

export const ContactDialog = (props: Props) => {
  const { onSubmit, t, isEdit, index } = props
  const [values, handles] = useContactDialog(props)
  const { control } = values
  const { handleSubmit, watch, setValue } = handles
  const { hideDialog } = useDialog()
  return (
    <CoreDialog
      title={t('contactPersonalInfo')}
      onClose={hideDialog}
      PaperProps={{}}
      formProps={{
        onSubmit: handleSubmit((val) => {
          onSubmit(val, index, isEdit)
          hideDialog()
        }),
      }}
      maxWidth='lg'
      fullWidth
    >
      <Box className='p-20'>
        <Box className='grid w-full grid-cols-2 gap-15 mb-15'>
          <CoreAutocomplete
            control={control}
            name={'title'}
            label={'Danh xưng'}
            options={NAME_HARD}
            returnValueType='enum'
            inputProps={{ maxLength: 50 }}
          />
          <CoreInput
            control={control}
            name='name'
            required
            label={t('name_of')}
            inputProps={{ maxLength: 250 }}
            rules={{ required: t('common:validation.required') }}
          />
          <CoreInput
            control={control}
            name={'position'}
            label={t('position')}
            inputProps={{ maxLength: 50 }}
          />
          <CoreAutocomplete
            control={control}
            name='gender'
            label={t('sex')}
            options={[
              { value: 'MALE', label: t('male') },
              { value: 'FEMALE', label: t('woman') },
              { value: 'OTHER', label: t('other') },
            ]}
          />
          <CoreDatePicker
            control={control}
            name='birth'
            disableFuture
            label={t('birth')}
          />
          <CoreInput
            control={control}
            name='phoneNumber'
            label='Số điện thoại'
            inputProps={{ maxLength: 10 }}
            rules={{
              pattern: {
                value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                message: 'Số điện thoại không hợp lệ',
              },
            }}
          />
          <CoreInput
            control={control}
            name={'email'}
            label={t('email')}
            inputProps={{ maxLength: 50 }}
            rules={{
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Email không hợp lệ',
              },
            }}
          />
          <CoreInput
            control={control}
            name={'cardId'}
            label={t('cardId')}
            inputProps={{ maxLength: 50 }}
            rules={{
              pattern: {
                value:
                  /^[0-9]+$/,
                message: 'Giấy tờ định danh không hợp lệ',
              },
            }}
          />
          <UploadBox
            url={watch('avatarUrl')}
            setUrl={(val) => {
              setValue('avatarUrl', val as string)
            }}
          />
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
