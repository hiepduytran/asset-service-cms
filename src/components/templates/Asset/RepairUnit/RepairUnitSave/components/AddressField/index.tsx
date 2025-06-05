import { Box, ButtonBase, Typography } from '@mui/material'

import { useDialog } from '@/components/hooks/dialog/useDialog'
import { GREEN } from '@/helper/colors'
import { AnotherAddress } from '@/service/partner/partner/get/type'
import { useTranslation } from 'react-i18next'
import { LIST_ADDRESS_TYPE } from '../../utils'
import { AddressDialog } from '../AddressDialog'
import { CustomCard } from '../CustomCard'
import { TRANSLATE } from '@/routes'

interface Props {
  watch: any
  setValue: any
  name: string
  isView?: boolean
  deleteFieldName: string
}
function isObjectWithNameKey(value: any) {
  if (typeof value === 'object' && value !== null && !!value?.name) {
    return value?.name
  }
  return false
}

const AddressField = (props: Props) => {
  const { watch, setValue, name, isView = false, deleteFieldName } = props
  const { t } = useTranslation(TRANSLATE.REPAIR_UNIT)
  const listAddress = watch(name) ?? []
  const { showDialog } = useDialog()

  const onRemoveAddress = (idx: number) => {
    if (!!listAddress[idx].id) {
      const deleteIds = watch(deleteFieldName) ?? []
      deleteIds.push(listAddress[idx].id)
      setValue(deleteFieldName, deleteIds)
    }
    setValue(
      name,
      listAddress.filter((_: any, index: number) => index !== idx)
    )
  }

  const onSubmit = (data: AnotherAddress, index: number, isEdit?: boolean) => {
    if (isEdit) {
      const newData = [...listAddress]
      newData[index] = data
      setValue(name, newData)
    } else {
      const newData = [...listAddress, data]
      setValue(name, newData)
    }
  }
  return (
    <Box>
      <Box className='grid grid-cols-2 mb-8 gap-15'>
        {listAddress.map((v: AnotherAddress, index: number) => {
          const data = [
            {
              label: t('country'),
              value: (isObjectWithNameKey(v.country) || v.country) ?? '',
            },
            {
              label: t('region'),
              value: (isObjectWithNameKey(v.region) || v.region) ?? '',
            },
            {
              label: t('city'),
              value: (isObjectWithNameKey(v.city) || v.city) ?? '',
            },
            {
              label: t('district'),
              value: (isObjectWithNameKey(v.district) || v.district) ?? '',
            },
            {
              label: t('ward'),
              value: (isObjectWithNameKey(v.ward) || v.ward) ?? '',
            },
            {
              label: t('address'),
              value: v.address ?? '',
            },
          ]

          const title = LIST_ADDRESS_TYPE.find(
            (item) => item.value === v.addressType
          )

          return (
            <CustomCard
              data={data}
              key={index}
              urlImg={require('@/assets/svg/truck.svg')}
              title={title?.label}
              isView={isView}
              onEdit={() =>
                showDialog(
                  <AddressDialog
                    t={t}
                    isEdit={true}
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
                <AddressDialog
                  isEdit={false}
                  t={t}
                  onSubmit={onSubmit}
                  index={listAddress.length + 1}
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

export default AddressField
