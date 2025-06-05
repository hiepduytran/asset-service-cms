import { useDialog } from '@/components/hooks/dialog/useDialog'
import { GREEN } from '@/helper/colors'
import { Contact } from '@/service/partner/partner/get/type'
import { Box, ButtonBase, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NAME_HARD } from '../../utils'
import { ContactDialog } from '../ContactDialog'
import { CustomCard } from '../CustomCard'
import { TRANSLATE } from '@/routes'

interface Props {
  watch: any
  setValue: any
  name: string
  isView?: boolean
  deleteFieldName: string
}

const ContactField = (props: Props) => {
  const { watch, setValue, name, deleteFieldName, isView = false } = props
  const { t } = useTranslation(TRANSLATE.REPAIR_UNIT)
  const listContact = watch(name) ?? []
  const { showDialog } = useDialog()
  const onRemoveAddress = (idx: number) => {
    if (!!listContact[idx].id) {
      const deleteIds = watch(deleteFieldName) ?? []
      deleteIds.push(listContact[idx].id)
      setValue(deleteFieldName, deleteIds)
    }
    setValue(
      name,
      listContact.filter((_: any, index: number) => index !== idx)
    )
  }
  const onSubmit = (data: Contact, index: number, isEdit?: boolean) => {
    if (isEdit) {
      const newData = [...listContact]
      newData[index] = data
      setValue(name, newData)
    } else {
      const newData = [...listContact, data]
      setValue(name, newData)
    }
  }
  return (
    <Box>
      <Box className='grid grid-cols-2 mb-8 gap-15'>
        {listContact.map((v: Contact, index: number) => {
          const name = NAME_HARD.find((item) => item.value === v.title)
          const data = [
            {
              label: t('nickName'),
              value: name?.label ?? '',
            },
            {
              label: t('name_of'),
              value: v.name ?? '',
            },
            {
              label: t('position'),
              value: v.position ?? '',
            },
            {
              label: t('phoneNumber'),
              value: v.phoneNumber ?? '',
            },
            {
              label: t('Email'),
              value: v.email ?? '',
            },
            {
              label: t('cardId'),
              value: v.cardId ?? '',
            },
          ]
          return (
            <CustomCard
              data={data}
              key={index}
              urlImg={v.avatarUrl ?? require('@/assets/svg/user.svg')}
              isView={isView}
              onEdit={() =>
                showDialog(
                  <ContactDialog
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
                <ContactDialog
                  isEdit={false}
                  t={t}
                  onSubmit={onSubmit}
                  index={listContact.length + 1}
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

export default ContactField
