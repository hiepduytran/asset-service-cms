import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryAttributeByProductId } from '@/service/product/getAttributeByProductId'
import {
  postParameterConfig,
  useQueryParameterConfig,
} from '@/service/asset/assetDeclarationCategoryList/save/ParameterConfig'
import { ParameterConfig } from '@/service/asset/assetDeclarationCategoryList/save/ParameterConfig/type'
import { toastError, toastSuccess } from '@/toast'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { getDetailAttribute } from '@/service/product/getDetailAttribute'

const defaultValues = {
  id: null,
  name: '',
  sku: '',
  informationData: [],
}

export const useConfig = (props: {
  productId: number
  isConfig: boolean
  refetch: any
}) => {
  const { t } = useTranslation(TRANSLATE.ASSET_DECLARATION_CATEGORY_LIST)
  const { hideDialog } = useDialog()
  const methodForm = useFormCustom<ParameterConfig>({ defaultValues })
  const { handleSubmit, reset, setValue, watch } = methodForm
  const { productId, isConfig, refetch } = props
  const { data: dataAttribute, isLoading: isLoadingAttribute } =
    useQueryAttributeByProductId(
      {
        id: productId,
      },
      { enabled: !!productId && !isConfig }
    )

  const { data, isLoading } = useQueryParameterConfig(
    {
      productId,
    },
    { enabled: !!productId && isConfig }
  )

  useEffect(() => {
    if (!isConfig) {
      if (!dataAttribute?.data?.id) {
        reset({
          id: productId,
          name: dataAttribute?.data?.productTemplate?.name,
          sku: dataAttribute?.data?.productTemplate?.sku,
          informationData:
            dataAttribute?.data?.productTemplate?.attributeCategory.map(
              (item: any, index: number) => ({
                attributeCategory: {
                  id: item?.id,
                  name: item?.name,
                },
                attributes: item?.attributeOutputList.map(
                  (item1: any, index1: number) => ({
                    attribute: {
                      id: item1?.id,
                      name: item1?.name,
                      code: item1?.code,
                    },
                    attributeValue: item1?.productAttributeValue.map(
                      (item2: any, index2: number) => ({
                        id: item2?.id,
                        name: item2?.value,
                      })
                    ),
                    isParameter: false,
                  })
                ),
              })
            ),
        })
      } else {
        reset({
          id: productId,
          name: dataAttribute?.data?.name,
          sku: dataAttribute?.data?.sku,
          informationData: dataAttribute?.data?.attributeCategory.map(
            (item: any, index: number) => ({
              attributeCategory: {
                id: item?.id,
                name: item?.name,
              },
              attributes: item?.attributeOutputList.map(
                (item1: any, index1: number) => ({
                  attribute: {
                    id: item1?.id,
                    name: item1?.name,
                    code: item1?.code,
                  },
                  attributeValue: item1?.productAttributeValue.map(
                    (item2: any, index2: number) => ({
                      id: item2?.id,
                      name: item2?.value,
                    })
                  ),
                  isParameter: false,
                })
              ),
            })
          ),
        })
      }
    } else {
      reset(data?.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dataAttribute, isConfig, productId])

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    postParameterConfig,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        if (res?.data) {
          hideDialog()
          refetch()
        }
      },
      onError: (error) => {
        toastError(error)
      },
    }
  )

  const handleDataReceive = (data: any) => {
    const newValue = data?.map((item: any) => ({
      attributeCategory: {
        id: item?.id,
        name: item?.name,
      },
      attributes: item?.attributeOutputList.map((item1: any) => ({
        attribute: {
          id: item1?.id,
          name: item1?.name,
          code: item1?.code,
        },
        attributeValue: item1?.productAttributeValue.map((item2: any) => ({
          id: item2?.id,
          name: item2?.value,
        })),
        isParameter: false,
      })),
    }))
    return newValue
  }

  const [isLoadingDetailAttribute, setIsLoadingDetailAttribute] =
    useState(false)

  const getAttribute = async (id: number) => {
    try {
      setIsLoadingDetailAttribute(true)
      const res = await getDetailAttribute({ categoryIds: [id] })
      const newData = handleDataReceive(res?.data)

      const currentData = watch('informationData') ?? []

      const newAttributeCategory = newData[0].attributeCategory
      const newAttributes = newData[0].attributes

      const existingCategoryIndex = currentData.findIndex(
        (item: any) => item.attributeCategory.id === newAttributeCategory.id
      )

      if (existingCategoryIndex !== -1) {
        const existingAttributes = currentData[existingCategoryIndex].attributes

        const uniqueAttributes = newAttributes.filter(
          (newAttr: any) =>
            !existingAttributes.some(
              (existingAttr: any) =>
                existingAttr.attribute.id === newAttr.attribute.id
            )
        )

        currentData[existingCategoryIndex].attributes = [
          ...existingAttributes,
          ...uniqueAttributes,
        ]
      } else {
        currentData.push({
          attributeCategory: newAttributeCategory,
          attributes: newAttributes,
        })
      }

      setValue('informationData', currentData)
      setIsLoadingDetailAttribute(false)
    } catch (e) {
      toastError(e)
      setIsLoadingDetailAttribute(false)
    }
  }

  const handleRemove = (index: number, index1: number) => {
    const currentData = watch('informationData') ?? []

    const updatedData = currentData
      .map((item: any, idx: number) => {
        if (idx === index) {
          const updatedAttributes = item.attributes.filter(
            (_: any, idx1: number) => idx1 !== index1
          )
          return { ...item, attributes: updatedAttributes }
        }
        return item
      })
      .filter((item: any) => item.attributes.length > 0)

    setValue('informationData', updatedData)
  }

  const onSubmit = handleSubmit(async (data) => {
    mutate(data)
  })

  return [
    {
      methodForm,
      isLoadingSubmit,
      isLoadingAttribute,
      isLoading,
      isLoadingDetailAttribute,
    },
    { t, onSubmit, getAttribute, handleRemove },
  ] as const
}
