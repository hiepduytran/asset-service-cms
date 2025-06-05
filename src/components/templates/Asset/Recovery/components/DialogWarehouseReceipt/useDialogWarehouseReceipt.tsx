import { CoreImage } from '@/components/atoms/CoreImage'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { MENU_URL } from '@/routes'
import { putUploadImage } from '@/service/asset/trackAllocationRequest/action'
import { useQueryGetAllocationRequestAssetList } from '@/service/asset/trackAllocationRequest/getList'
import { AllocationRequestAssetList } from '@/service/asset/trackAllocationRequest/getList/type'
import { toastError, toastSuccess } from '@/toast'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import UploadImage from '../UploadImage'
type Prop = {
  productId: number
  cardId: number
}

export default function useDialogWarehouseReceipt(props: Prop) {
  const { productId, cardId } = props
  const { t } = useTranslation(MENU_URL.RECOVERY)
  const methods = useFormCustom<AllocationRequestAssetList>()
  const { hideDialog } = useDialog()
  const { handleSubmit, reset, getValues, control, setError } = methods
  const router = useRouter()

  const onSubmit = handleSubmit((data) => {
    mutate(
      data.asset
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

  const { mutate, isLoading: isLoadingSubmit } = useMutation(putUploadImage, {
    onSuccess: ({ data }) => {
      toastSuccess(t('common:message.success'))
      hideDialog()
    },
    onError: (error) => {
      toastError(error, setError)
    },
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
        header: t('table.identifierCode'),
        fieldName: 'code',
      },
      {
        header: t('table.lots'),
        fieldName: 'lots',
      },
      {
        header: 'Serial',
        fieldName: 'serial',
      },
      {
        header: t('table.uploadRecordedImage'),
        fieldName: 'imageUrl',
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
      lots: <CoreInput name={`asset.${index}.lots.code`} control={control} />,
      imageUrl: item.imageUrls ? (
        <div className='flex gap-2'>
          {item.imageUrls.map((item2) => (
            <Link key={item2} href={item2} target='_blank'>
              <CoreImage
                src={item2}
                alt='Chi tiết ảnh'
                width={60}
                height={60}
              />
            </Link>
          ))}
        </div>
      ) : (
        <UploadImage index={index} />
      ),
    }
  })

  useEffect(() => {
    if (dataAllocationRequestAssetList) {
      reset(dataAllocationRequestAssetList.data)
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
    { t, hideDialog, onSubmit },
  ] as const
}
