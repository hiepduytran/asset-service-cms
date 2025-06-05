import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import {
  postAssetLocation,
  putAssetLocation,
  useQueryAssetLocation,
} from '@/service/asset/assetDeclarationCategoryList/save/AssetLocation'
import { AssetLocation } from '@/service/asset/assetDeclarationCategoryList/save/AssetLocation/type'
import { generateCode } from '@/service/asset/initialAllocatedAssets/save/generateCode'
import { useQueryListReceipt } from '@/service/warehouse/getListReceipt'
import { getListSerialLot } from '@/service/warehouse/getListSerialLot'
import { toastError, toastSuccess } from '@/toast'
import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  pickIn: [
    {
      id: null,
      code: '',
      name: '',
      quantity: 0,
      locationLot: [
        {
          id: null,
          code: '',
          name: '',
          quantity: 0,
          lot: [
            {
              id: null,
              code: '',
              name: '',
              quantity: 0,
              quantityIdentified: 0,
              asset: [],
            },
          ],
        },
      ],
    },
  ],
}

export const useDeclareIdentifierCode = (props: any) => {
  const { productId, checkingType, refetch, sku } = props
  const { t } = useTranslation(TRANSLATE.ASSET_DECLARATION_CATEGORY_LIST)
  const methodForm = useFormCustom<AssetLocation>({ defaultValues })
  const { handleSubmit, reset, setValue } = methodForm
  const { hideDialog } = useDialog()

  const { data: dataDetail, isLoading: isLoadingDetail } =
    useQueryAssetLocation({ id: productId }, { enabled: !!productId })
  const isUpdate = useMemo(
    () => !!dataDetail && dataDetail?.data?.pickIn?.length > 0,
    [dataDetail]
  )
  const { data: dataReceipt, isLoading: isLoadingReceipt } =
    useQueryListReceipt(
      {
        warehouseType: 'INTERNAL',
        productId: productId,
      },
      { enabled: !!productId && !isUpdate }
    )

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putAssetLocation : postAssetLocation,
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

  const onSubmit = handleSubmit(async (data) => {
    mutate(data)
  })

  const [openStates, setOpenStates] = useState<Record<number, boolean>>({})
  const [dataSerialLot, setDataSerialLot] = useState<Record<number, any[]>>({})
  const [isLoadingSerialLot, setIsLoadingSerialLot] = useState<
    Record<number, boolean>
  >({})

  const getListSerialAndLot = useCallback(
    async (id: number) => {
      if (dataSerialLot[id]) return

      setIsLoadingSerialLot((prev) => ({ ...prev, [id]: true }))
      try {
        const res = await getListSerialLot({
          warehouseType: 'INTERNAL',
          pickingId: id,
          productId: productId,
        })
        setDataSerialLot((prev) => ({ ...prev, [id]: res?.data }))
      } catch (error) {
        toastError(error)
      } finally {
        setIsLoadingSerialLot((prev) => ({ ...prev, [id]: false }))
      }
    },
    [dataSerialLot, productId]
  )

  const handleOpen = (id: number) => {
    const isCurrentlyOpen = openStates[id]

    if (!isCurrentlyOpen && !isUpdate) {
      getListSerialAndLot(id)
    }

    setOpenStates((prev) => ({
      ...prev,
      [id]: !isCurrentlyOpen,
    }))
  }

  useEffect(() => {
    const mapLocationLots = (locationLots: any[]) =>
      locationLots?.map((item1: any) => ({
        ...item1,
        lot: item1?.lot?.map((item2: any) => ({
          ...item2,
          asset: [],
        })),
      }))

    const mapPickInData = (data: any, source: any, isDetailed: boolean) =>
      source?.map((item: any) => ({
        id: item.id,
        code: item.code,
        quantity: item.quantity,
        checkingType: checkingType,
        locationLot: isDetailed
          ? mapLocationLots(item.locationLot)
          : data[item.id]?.map((item1: any) => ({
            id: item1?.location?.id,
            code: item1?.location?.code,
            quantity: item1?.quantity,
            lot: item1?.serialLots?.map((item2: any) => ({
              id: item2?.lots?.id,
              code: item2?.lots?.code,
              quantity: item2?.quantity,
              asset: [],
            })),
          })),
      }))

    if (checkingType === 'LOTS' || checkingType === 'DEFAULT') {
      reset({
        ...(isUpdate ? dataDetail?.data : defaultValues),
        pickIn: mapPickInData(
          dataSerialLot,
          isUpdate ? dataDetail?.data?.pickIn : dataReceipt?.data,
          isUpdate
        ),
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkingType, dataDetail, dataReceipt, dataSerialLot, isUpdate])

  const autoGen = async ({
    index,
    index1,
    fieldsLength,
  }: {
    index: number
    index1: number
    fieldsLength: number
  }) => {
    try {
      const res = await generateCode({
        sku,
        length: fieldsLength,
        checkingType: 'DEFAULT',
        isInitialAsset: false,
      })
      Array.from({ length: fieldsLength }).forEach((_, index2) => {
        setValue(
          `pickIn.${index}.locationLot.${index1}.lot.${0}.asset.${index2}.code`, res?.data?.serial?.[index2]?.code as never
        )
      })
    } catch (error) {
      toastError(error)
    }
  }
  const [indexes, setIndexes] =
    useState<{ index: number; index1: number; fieldsLength: number } | null>(
      null
    )
  const handleAutoGen = () => {
    if (indexes) {
      autoGen(indexes)
    }
  }

  const [totalQuantity, setTotalQuantity] = useState(0)

  return [
    {
      methodForm,
      openStates,
      isLoadingReceipt,
      isLoadingSerialLot,
      isLoadingDetail,
      isLoadingSubmit,
      setIndexes,
      totalQuantity,
      setTotalQuantity,
    },
    { t, onSubmit, handleOpen, handleAutoGen },
  ] as const
}
