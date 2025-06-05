import CoreInput from '@/components/atoms/CoreInput'
import { BACK_GROUND, WHITE } from '@/helper/colors'
import { Box, ButtonBase } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AddressField from '../AddressField'
import BankField from '../BankField'
import ContactField from '../ContactField'
import { TRANSLATE } from '@/routes'

interface Props {
  control: any
  watch: any
  setValue: any
  partnerId: number
}

export const CustomTabs = (props: Props) => {
  const { t } = useTranslation(TRANSLATE.REPAIR_UNIT)
  const router = useRouter()
  const { id } = router.query
  const { control, watch, setValue, partnerId } = props
  const isView = !!Number(id) || !!partnerId
  const listContent = [
    {
      name: t('contactPersonalInfo'),
      content: (
        <ContactField
          watch={watch}
          setValue={setValue}
          name='partner.contacts'
          deleteFieldName='partner.deleteContacts'
          isView={isView}
        />
      ),
    },
    {
      name: t('bankInfo'),
      content: (
        <BankField
          watch={watch}
          setValue={setValue}
          name='partner.bankAccounts'
          isView={isView}
        />
      ),
    },
    {
      name: t('anotherAddress'),
      content: (
        <AddressField
          watch={watch}
          setValue={setValue}
          name='partner.anotherAddress'
          deleteFieldName='partner.deleteAddress'
          isView={isView}
        />
      ),
    },
    {
      name: t('note'),
      content: (
        <CoreInput
          control={control}
          name='partner.note'
          label={t('note')}
          multiline
          rows={4}
          isViewProp={isView}
          inputProps={{
            maxLength: 1000,
          }}
        />
      ),
    },
  ]
  const [step, setStep] = useState(0)
  return (
    <Box className='w-full my-15' style={{ border: '1px solid #DFE0EB' }}>
      <Box className='flex w-full'>
        {listContent.map((v, index) => {
          const isChecked = step === index
          return (
            <ButtonBase key={index} onClick={() => setStep(index)}>
              <Box
                className='px-10 py-7'
                sx={{
                  borderBottom: !isChecked ? '1px solid #DFE0EB' : undefined,
                  borderRight: '1px solid #DFE0EB',
                  backgroundColor: isChecked ? WHITE : BACK_GROUND,
                }}
              >
                {v.name}
              </Box>
            </ButtonBase>
          )
        })}
        <Box className='grow' sx={{ borderBottom: '1px solid #DFE0EB' }}></Box>
      </Box>
      <Box className='w-full p-15'>{listContent?.[step]?.content}</Box>
    </Box>
  )
}
