import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { getBankList } from '@/service/partner/bank/list'
import { BankAccount } from '@/service/partner/partner/get/type'
import { Box } from '@mui/material'
import { useBankDialog } from './useBankDialog'
import { CoreButton } from '@/components/atoms/CoreButton'

export type Props = {
  onSubmit: any
  t: any
  isEdit: boolean
  data?: BankAccount
  index?: number
}

export const BankDialog = (props: Props) => {
  const { onSubmit, t, isEdit, index } = props
  const [values, handles] = useBankDialog(props)

  const { control } = values
  const { handleSubmit } = handles

  const { hideDialog } = useDialog()

  return (
    <CoreDialog
      title={t('bank')}
      onClose={hideDialog}
      PaperProps={{}}
      formProps={{
        onSubmit: handleSubmit((val) => {
          const dataFormatted = {
            ...val,
            logoUrl: val?.bank?.logoUrl,
            bankId: val?.bank?.id,
            bank: val?.bank?.name,
          }

          onSubmit(dataFormatted, index, isEdit)
          hideDialog()
        }),
      }}
      maxWidth="lg"
      fullWidth
    >
      <Box className="p-20">
        <Box className="grid w-full grid-cols-3 gap-15 mb-15">
          <CoreAutoCompleteAPI
            control={control}
            name="bank"
            label={t('bank')}
            fetchDataFn={getBankList}
            placeholder=''
            params={{ activated: true }}
            required
            rules={{ required: t('common:validation.required') }}
            disableClearable
          />
          <CoreInput
            control={control}
            name="accountHolder"
            required
            label={t('accountName')}
            inputProps={{ maxLength: 250 }}
            rules={{ required: t('common:validation.required') }}
          />
          <CoreInput
            control={control}
            name="accountNumber"
            required
            label={t('accountNumber')}
            inputProps={{ maxLength: 250 }}
            rules={{ required: t('common:validation.required') }}
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
