import { useFormCustom } from '@/lib/form'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { toastError, toastSuccess } from '@/toast'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useFieldArray } from 'react-hook-form'
import { ColumnProps } from '@/components/organism/CoreTable'
import CoreInput from '@/components/atoms/CoreInput'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { Box, IconButton } from '@mui/material'
import Image from 'next/image'
import { AssetAccessorySave } from '@/service/asset/declarationSpareParts/save/type'
import { useQueryAssetAccessoryDetail } from '@/service/asset/declarationSpareParts/save/getDetail'
import {
  postAssetAccessory,
  putAssetAccessory,
} from '@/service/asset/declarationSpareParts/save'
import { getList2Product } from '@/service/product/getList2Product'

const defaultValues = {
  id: null,
  product: null,
  imageUrls: [],
  accessoryLines: [
    {
      product: null,
      productName: '',
      quantity: null,
      uom: null,
      uomName: '',
    },
  ],
  listAccessoryLine: [],
}

export default function useDeclarationSparePartsSave() {
  const { t } = useTranslation(TRANSLATE.DECLARATION_SPARE_PARTS)
  const router = useRouter()
  const id = Number(router.query?.id)
  const { actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const methodForm = useFormCustom<AssetAccessorySave>({
    defaultValues,
  })
  const { control, reset, handleSubmit, setValue, watch, getValues } =
    methodForm
  const { data, isLoading, refetch } = useQueryAssetAccessoryDetail(
    { assetAccessoryId: id },
    { enabled: !!id }
  )
  const {
    fields: productFields,
    append,
    remove,
    replace,
  } = useFieldArray({
    control,
    name: 'accessoryLines',
    keyName: 'key',
  })
  useEffect(() => {
    if (id && data?.data) {
      reset({
        ...data?.data,
        product: {
          ...data?.data.product,
          sku: data?.data.product?.code,
        },
        productName: data?.data.product?.name,
        accessoryLines: data?.data?.accessoryLines.map((item) => {
          return {
            ...item,
            product: {
              ...item?.product,
              sku: item?.product?.code,
            },
            productName: item?.product?.name,
            uomName: item?.uom?.name,
          }
        }),
      })
    }
  }, [id, data?.data])

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putAssetAccessory : postAssetAccessory,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.DECLARATION_SPARE_PARTS}/[id]`,
            query: {
              id: res.data?.data.id,
              actionType: 'VIEW',
            },
          })
          refetch()
        }
      },
      onError: (error) => {
        toastError(error)
      },
    }
  )
  const [listDeleteIds, setListDeleteIds] = useState<number[]>([])
  const onSubmit = handleSubmit((data) => {
    mutate({
      ...data,
      id: id,
      listDeleteIds: listDeleteIds,
    })
  })

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.sparePartCode'),
          fieldName: 'identifierCode',
        },
        {
          header: t('table.sparePartName'),
          fieldName: 'identifierName',
        },
        {
          header: t('table.quantity'),
          fieldName: 'quantity',
        },
        {
          header: t('table.uom'),
          fieldName: 'uomName',
        },
        {
          header: '',
          fieldName: 'deleteProduct',
        },
      ] as ColumnProps[],
    [t]
  )
  const tableData = productFields.map((field, index: number) => {
    return {
      identifierCode: (
        <CoreAutoCompleteAPI
          control={control}
          name={`accessoryLines.${index}.product`}
          label=''
          placeholder={t('placeholder.sparePartCode')}
          fetchDataFn={
            getList2Product
            // async () => {
            // const result = await getList2Product({
            //   isAccessory: true,
            // })
            // setValue('accessoryLinesLength', result.data.content.length)
            // return result
            // }
          }
          labelPath='sku'
          valuePath='id'
          searchLabel='sku'
          required
          rules={{ required: t('common:validation.required') }}
          onChangeValue={(value) => {
            if (value) {
              setValue(`accessoryLines.${index}.productName`, value?.name)
              setValue(`accessoryLines.${index}.uom`, value?.uom)
              setValue(`accessoryLines.${index}.uomName`, value?.uom?.name)
            } else {
              setValue(`accessoryLines.${index}.productName`, '')
              setValue(`accessoryLines.${index}.uomName`, '')
            }
          }}
          exceptValues={(() => {
            if (productFields.some((item) => !item.product)) {
              return productFields
                .filter((item) => item.product)
                .map((item) => item.product)
            }
            return productFields.map((item) => item.product)
          })()}
          inputProps={{
            maxLength: 50,
          }}
        />
      ),
      identifierName: (
        <CoreInput
          control={control}
          name={`accessoryLines.${index}.productName`}
          required
          rules={{ required: t('common:validation.required') }}
          isViewProp
        />
      ),
      quantity: (
        <CoreInput
          control={control}
          name={`accessoryLines.${index}.quantity`}
          placeholder={t('placeholder.quantity')}
          required
          rules={{ required: t('common:validation.required') }}
          type='number'
          disableDecimal
          disableNegative
          disableZero
        />
      ),
      uomName: (
        <CoreInput
          control={control}
          name={`accessoryLines.${index}.uomName`}
          required
          rules={{ required: t('common:validation.required') }}
          isViewProp
        />
      ),
      deleteProduct: !isView && (
        <Box sx={{ textAlign: 'end' }}>
          <IconButton
            onClick={() => {
              setListDeleteIds((prev: any) => [
                ...prev,
                watch(`accessoryLines.${index}.id`),
              ])
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
        </Box>
      ),
    }
  })

  return [
    {
      router,
      methodForm,
      isView,
      isUpdate,
      id,
      data: data?.data,
      isLoading,
      isLoadingSubmit,
      columns,
      tableData,
      productFields,
    },
    { t, onSubmit, append, replace },
  ] as const
}
