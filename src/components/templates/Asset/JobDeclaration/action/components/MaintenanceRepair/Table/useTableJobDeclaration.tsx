import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { TRANSLATE } from '@/routes'
import { getAccessoryByProductId } from '@/service/asset/assetPeriod/save/getAccessoryByProductId'
import { JobDeclarationDetail } from '@/service/asset/jobDeclaration/action/type'
import { IconButton } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
export type Props = {
  name: 'detailsWorkOverview' | 'detailsWorkRepair'
}

export default function useTableJobDeclaration({ name }: Props) {
  const { t } = useTranslation(TRANSLATE.JOB_DECLARATION)
  const { id, actionType } = useRouter().query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const methods = useFormContext<JobDeclarationDetail>()
  const { control, getValues, setValue, watch } = methods

  const [open, setOpen] = useState<{ [key: string]: boolean }>({
    0: false,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
    keyName: 'key',
  })

  const setOpenNoData = (item: any) => {
    setOpen((prev) => {
      return { [item.key]: !prev[item.key] }
    })
  }

  const tableData = fields.map((item, index) => {
    return {
      ...item,
      product: (
        <CoreAutoCompleteAPI
          name={`${name}.${index}.product`}
          control={control}
          label={''}
          placeholder={t('Nhập chi tiết máy')}
          rules={{
            required: t('common:validation.required'),
          }}
          fetchDataFn={getAccessoryByProductId}
          params={{
            productId: getValues('product.id'),
          }}
          parentPath='product'
          labelPath='name'
          onChangeValue={(value) => {
            if (value) {
              setValue(`${name}.${index}.product`, {
                id: value.product.id,
                code: value.product.code,
                name: value.product.name,
              })
            }
          }}
          disabled={!watch('product')}
        />
      ),
      repairWorkDetails: (
        <div
          onClick={() => {
            setOpen((prev) => {
              return { ...prev, [item.key]: !prev[item.key] }
            })
          }}
          className='flex text-[#0078D4] text-[12px] cursor-pointer select-none'
        >
          + Thêm công việc
        </div>
      ),
      action: !isView ? (
        <IconButton
          onClick={() => {
            remove(index)
          }}
        >
          <Image
            src={require('@/assets/svg/action/delete.svg')}
            alt='delete'
            width={16}
            height={16}
          />
        </IconButton>
      ) : (
        <></>
      ),
    }
  })

  return [
    {
      methods,
      id,
      isUpdate,
      isView,
      tableData,
      open,
    },
    { t, append, setOpen, setOpenNoData },
  ] as const
}
