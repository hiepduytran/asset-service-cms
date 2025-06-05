import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useQueryAssetParameterDetail } from '@/service/asset/paramAsset/getDetail'
import { InformationData } from '@/service/asset/paramAsset/save/getListParamAsset/type'
import { postParamAssetSave } from '@/service/asset/paramAsset/save'
import {
  RequestBody,
  TrackAssetLine,
} from '@/service/asset/paramAsset/save/type'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { ColumnProps } from '@/components/organism/CoreTable'

const defaultValues = {
  trackAssetLine: [],
}

export const defaultImpact = [
  {
    startValue: 0,
    endValue: 0,
    content: '',
    color: '',
    actionRegulation: null,
  },
]

export const useParamAssetSave = () => {
  const { t } = useTranslation(TRANSLATE.PARAM_ASSET)
  const methodForm = useFormCustom<RequestBody['POST']>({ defaultValues })
  const router = useRouter()
  const { actionType } = router.query
  const isView = actionType === 'VIEW'
  const isCopy = actionType === 'COPY'
  const id = Number(router.query.id)
  const isUpdate = !!id
  const [dataLength, setDataLength] = useState<number>(0)

  const { handleSubmit, setError, reset } = methodForm

  const assetColumns = useMemo(
    () =>
      [
        {
          header: t('table.codeAsset'),
          fieldName: 'code',
        },
        {
          header: t('table.nameAsset'),
          fieldName: 'name',
        },
      ] as ColumnProps[],
    [t]
  )

  const handleDataReceive = (data: InformationData[]) => {
    const newAssetCategory: any[] = []
    const newValue = data?.map((item, index) => {
      const newAttributes: any[] = []
      item.attributes.forEach((item2) => {
        if (item2) {
          newAttributes.push({
            attribute: item2.attribute,
            attributeValue: item2.attributeValue,
            quantity: item2.quantity,
            isParameter: item2.isParameter,
            minimum: null,
            maximum: null,
            isWarning: false,
            impactMinimum: defaultImpact,
            impactStandard: defaultImpact,
            impactMaximum: defaultImpact,
          })
        }
      })
      return {
        attributeCategory: item.attributeCategory,
        attributes: newAttributes,
      }
    })
    newAssetCategory.push({
      assetCategory: newValue,
    })
    return newAssetCategory
  }

  const handleDataCheck = (data: InformationData[]) => {
    const newValue = (data ?? [])?.map((item, index) => {
      const newAttributes: any[] = []
      item.attributes.forEach((item2) => {
        if (item2) {
          newAttributes.push({
            attribute: item2.attribute,
            attributeValue: item2.attributeValue,
            quantity: item2.quantity,
            isParameter: item2.isParameter,
            minimum: null,
            maximum: null,
            isWarning: false,
            impactMinimum: defaultImpact,
            impactStandard: defaultImpact,
            impactMaximum: defaultImpact,
          })
        }
      })
      return {
        attributes: newAttributes,
      }
    })
    const dataLength = newValue.map((item: any) => {
      return setDataLength(item.attributes.length)
    })
    return dataLength
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? postParamAssetSave : postParamAssetSave,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.PARAM_ASSET}/[id]`,
            query: {
              id: res.data?.data.id,
              actionType: 'VIEW',
            },
          })
          refetch()
        }
      },
      onError: (error) => {
        toastError(error, setError)
      },
    }
  )

  const onSubmit = handleSubmit(async (data) => {
    mutate(data)
  })

  const { data, isLoading, refetch } = useQueryAssetParameterDetail(
    { id },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data?.data) {
      if (isCopy) {
        reset({
          ...data?.data,
          asset: null,
          assetName: data?.data?.asset?.name,
          categoryName: data?.data?.category?.name,
        })
      } else {
        reset({
          ...data?.data,
          assetName: data?.data?.asset?.name,
          categoryName: data?.data?.category?.name,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data, id, isCopy])

  const onCancel = () => {
    router.back()
  }

  return [
    {
      t,
      methodForm,
      isView,
      isUpdate,
      isCopy,
      isLoadingSubmit,
      id,
      assetColumns,
      dataLength,
      isLoading,
    },
    {
      onSubmit,
      handleDataReceive,
      handleDataCheck,
      refetch,
      onCancel,
    },
  ] as const
}
