import { Box, ButtonBase, Typography } from '@mui/material'

import { useDialog } from '@/components/hooks/dialog/useDialog'
import { GREEN } from '@/helper/colors'
import { BankAccount } from '@/service/partner/partner/get/type'
import { useTranslation } from 'react-i18next'
import { BankDialog } from '../BankDialog'
import { CustomCard } from '../CustomCard'
import { TRANSLATE } from '@/routes'

interface Props {
  watch: any
  setValue: any
  name: string
  isView?: boolean
}

const BankField = (props: Props) => {
  const { watch, setValue, name, isView = false } = props
  const { t } = useTranslation(TRANSLATE.REPAIR_UNIT)
  const listBank = watch(name) ?? []
  const { showDialog } = useDialog()
  const onRemoveAddress = (idx: number) => {
    setValue(
      name,
      listBank.filter((_: any, index: number) => index !== idx)
    )
  }
  const onSubmit = (data: BankAccount, index: number, isEdit?: boolean) => {
    if (isEdit) {
      const newData = [...listBank]
      newData[index] = data

      setValue(name, newData)
    } else {
      const newData = [...listBank, data]
      setValue(name, newData)
    }
  }
  return (
    <Box>
      <Box className='grid grid-cols-2 mb-8 gap-15'>
        {listBank.map((v: BankAccount, index: number) => {
          const data = [
            {
              label: t('bank'),
              value: v.bank ?? '',
            },
            {
              label: t('accountNumber'),
              value: v.accountNumber ?? '',
            },
            {
              label: t('accountName'),
              value: v.accountHolder ?? '',
            },
          ]
          return (
            <CustomCard
              data={data}
              key={index}
              urlImg={v.logoUrl ?? require('@/assets/svg/bank.svg')}
              isView={isView}
              onEdit={() =>
                showDialog(
                  <BankDialog
                    isEdit={true}
                    t={t}
                    onSubmit={onSubmit}
                    data={v}
                    index={index}
                  />
                )
              }
              onDelete={() => {
                onRemoveAddress(index)
              }}
            />
          )
        })}
      </Box>
      {!isView && (
        <ButtonBase>
          <Typography
            color='primary'
            variant='body2'
            style={{ color: GREEN }}
            onClick={() =>
              showDialog(
                <BankDialog
                  isEdit={false}
                  t={t}
                  onSubmit={onSubmit}
                  index={listBank.length + 1}
                />
              )
            }
          >
            + Thêm mới
          </Typography>
        </ButtonBase>
      )}
    </Box>
  )
}

export default BankField
