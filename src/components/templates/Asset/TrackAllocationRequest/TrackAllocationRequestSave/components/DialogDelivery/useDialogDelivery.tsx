import { CoreImage } from '@/components/atoms/CoreImage'
import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { putUploadImage } from '@/service/asset/trackAllocationRequest/action'
import { useQueryGetAllocationRequestAssetList } from '@/service/asset/trackAllocationRequest/getList'
import { StockPickingDeliveryDetail } from '@/service/asset/trackAllocationRequest/getList/type'
import { toastError, toastSuccess } from '@/toast'
import Link from 'next/link'
import { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import UploadImage from '../UploadImage'
type Prop = {
  productId: number
  cardId: number
  hideDialog: () => void
  isFirstDialog: boolean
  changeIsFirstDialog: () => void
}
export default function useDialogDelivery(props: Prop) {
  const { productId, cardId, hideDialog, isFirstDialog, changeIsFirstDialog } =
    props
  const { t } = useTranslation(TRANSLATE.TRACK_ALLOCATION_REQUEST)
  const methods = useFormContext<StockPickingDeliveryDetail>()
  const { handleSubmit, reset, setError, getValues } = methods

  const { mutate, isLoading: isLoadingSubmit } = useMutation(putUploadImage, {
    onSuccess: ({ data }) => {
      toastSuccess(t('common:message.success'))
      hideDialog()
    },
    onError: (error) => {
      toastError(error, setError)
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutate(
      (data?.asset?.asset ?? [])
        .map((item) => {
          return {
            assetId: item.id,
            cardId: cardId,
            urlImages: item.imageUrls,
          }
        })
        .filter((item) => !!item.urlImages)
    )
  })

  const {
    data: dataAllocationRequestAssetList,
    isLoading: isLoadingAllocationRequestAssetList,
  } = useQueryGetAllocationRequestAssetList({
    cardId: cardId,
    productId: productId,
  })

  const columns = useMemo(() => {
    return [
      {
        header: t('table.code_identity'),
        fieldName: 'code',
      },
      {
        header: t('table.lots'),
        fieldName: 'lots.code',
      },
      {
        header: 'Serial',
        fieldName: 'serial',
      },
      {
        header: t('table.imageUrl'),
        fieldName: 'imageUrl',
        styleCell: {
          style: {
            textAlign: 'center',
            width: '210px',
          },
        },
      },
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const dataTable = (
    dataAllocationRequestAssetList
      ? dataAllocationRequestAssetList.data.asset
      : []
  ).map((item, index) => {
    return {
      ...item,
      imageUrl: item.isImageInDb ? (
        <div className='flex gap-1 flex-wrap text-center'>
          {(getValues(`asset.asset.${index}.imageUrls`) ?? []).map((item2) => {
            return (
              <Link
                style={{
                  height: '60px',
                }}
                key={item2}
                href={item2}
                target='_blank'
              >
                <CoreImage
                  src={item2}
                  alt='Chi tiết ảnh'
                  width={60}
                  height={60}
                />
              </Link>
            )
          })}
        </div>
      ) : (
        <UploadImage changeIsFirstDialog={changeIsFirstDialog} index={index} />
      ),
    }
  })

  useEffect(() => {
    if (dataAllocationRequestAssetList) {
      if (isFirstDialog) {
        reset({
          ...getValues(),
          asset: {
            ...dataAllocationRequestAssetList.data,
          },
        })
      } else {
        reset({
          asset: {
            ...dataAllocationRequestAssetList.data,
          },
          ...getValues(),
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAllocationRequestAssetList])
  return [
    {
      methods,
      columns,
      dataTable,
      isLoadingAllocationRequestAssetList,
      isLoadingSubmit,
    },
    { t, onSubmit },
  ] as const
}
