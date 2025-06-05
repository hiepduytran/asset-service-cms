import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import {
  postAssetLotSerial,
  putAssetLotSerial,
  useQueryAssetLotSerial,
} from '@/service/asset/assetDeclarationCategoryList/save/AssetLotSerial'
import { AssetLotSerial } from '@/service/asset/assetDeclarationCategoryList/save/AssetLotSerial/type'
import { useQueryListReceipt } from '@/service/warehouse/getListReceipt'
import { getListSerialLotIdentified } from '@/service/warehouse/getListSerialLot'
import { toastError, toastSuccess } from '@/toast'
import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  pickIns: [
    {
      id: null,
      code: '',
      name: '',
      quantity: 0,
      quantityIdentified: 0,
      asset: [],
    },
  ],
}

export const useUpdateIdentifiedAssetInfo = (props: any) => {
  const { productId, quantityIdentified, refetch, productCategory, uomId, checkingType } =
    props
  const { t } = useTranslation(TRANSLATE.ASSET_DECLARATION_CATEGORY_LIST)
  const { hideDialog } = useDialog()

  const methodForm = useFormCustom<AssetLotSerial>({ defaultValues })
  const { control, handleSubmit, reset, watch } = methodForm

  const { data: dataDetail, isLoading: isLoadingDetail } =
    useQueryAssetLotSerial({ id: productId }, { enabled: !!productId })

  const { data: dataReceipt, isLoading: isLoadingReceipt } =
    useQueryListReceipt(
      {
        warehouseType: 'INTERNAL',
        productId: productId,
      },
      { enabled: !!productId && (checkingType === 'SERIAL' || checkingType === 'ALL') }
    )

  const [openStates, setOpenStates] = useState<Record<number, boolean>>({})
  const [dataSerialLot, setDataSerialLot] = useState<Record<number, any[]>>({})
  const [isLoadingSerialLot, setIsLoadingSerialLot] = useState<
    Record<number, boolean>
  >({})

  const isUpdate = useMemo(
    () => !!dataDetail && dataDetail?.data?.pickIns?.length > 0,
    [dataDetail]
  )

  const totalQuantity = useMemo(() => {
    return (
      watch('pickIns')?.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0
      ) || 0
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('pickIns')])

  const getListSerialAndLot = useCallback(
    async (id: number) => {
      if (dataSerialLot[id]) return

      setIsLoadingSerialLot((prev) => ({ ...prev, [id]: true }))
      try {
        const res = await getListSerialLotIdentified({
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

  const handleOpen = useCallback(
    (id: number) => {
      if (!openStates[id] && (checkingType === 'SERIAL' || checkingType === 'ALL')) {
        getListSerialAndLot(id)
      }
      setOpenStates((prev) => ({
        ...prev,
        [id]: !prev[id],
      }))
    },
    [checkingType, getListSerialAndLot, openStates]
  )

  useEffect(() => {
    const mergedPickIns =
      checkingType === 'SERIAL' || checkingType === 'ALL'
        ? dataReceipt?.data?.map((item: any) => {
          const detailItem = dataDetail?.data?.pickIns?.find(
            (detail: any) => detail.id === item.id
          );

          return {
            id: item.id,
            code: item.code,
            quantity: item.quantity,
            quantityIdentified: quantityIdentified,
            checkingType: checkingType,
            accountMoveId: item.accountMoveId,
            asset:
              detailItem?.asset ||
              dataSerialLot[item.id]?.map((item2: any) => ({
                id: item2.id,
                code: item2.code,
                lot: {
                  id: item2?.lots?.id,
                  code: item2?.lots?.code,
                },
                category: productCategory,
                product: {
                  id: productId,
                },
                uom: {
                  id: uomId,
                },
              })) ||
              [],
          };
        })
        : dataDetail?.data?.pickIns?.map((item: any) => ({
          id: item.id,
          code: item.code,
          quantity: item.quantity,
          quantityIdentified: quantityIdentified,
          checkingType: checkingType,
          asset: item.asset || [],
        }));

    reset({
      ...defaultValues,
      pickIns: mergedPickIns,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDetail, dataReceipt, dataSerialLot, productCategory, productId, quantityIdentified, uomId, checkingType]);

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putAssetLotSerial : postAssetLotSerial,
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

  return [
    {
      methodForm,
      control,
      isLoadingReceipt,
      isLoadingDetail,
      isLoadingSubmit,
      totalQuantity,
      openStates,
      isLoadingSerialLot,
      dataDetail: dataDetail?.data,
    },
    { t, onSubmit, handleOpen },
  ] as const
}
