import CoreInput from '@/components/atoms/CoreInput'
import { useDate } from '@/components/hooks/date/useDate'
import { ColumnProps } from '@/components/organism/CoreTable'
import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { changeStatusApprove } from '@/service/asset/approveAllocationRequest/get'
import { useQueryGetRequestAllocationDetail } from '@/service/asset/requestAllocation/get'
import { RequestBody } from '@/service/asset/requestAllocation/save/type'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const defaultValues = {
  code: '',
  requestDate: '',
  updateDate: '',
  planType: '',
  plan: 0,
  note: '',
  asset: [
    {
      asset: null,
      quantity: null,
      uom: null,
      requestQuantity: null,
    },
  ],
}

export const useApproveAllocationRequestSave = () => {
  const { t } = useTranslation(TRANSLATE.APPROVE_ALLOCATION_REQUEST)
  const methods = useFormCustom<RequestBody['POST']>({ defaultValues })
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const { reset, setValue, control, watch } = methods

  const {
    fields: allocationLineFields,
    remove,
    append: appendAllocationLineField,
  } = useFieldArray({
    control: control,
    name: `asset`,
    keyName: 'key',
  })

  const columns = useMemo(
    () =>
      [
        {
          header: t('assetTableDetail.assetCode'),
          fieldName: 'asset',
          styleCell: {
            sx: {
              minWidth: 200,
            },
          },
        },
        {
          header: t('assetTableDetail.assetName'),
          fieldName: 'assetName',
        },
        {
          header: t('assetTableDetail.quantity_asset'),
          fieldName: 'quantity',
        },
        {
          header: t('assetTableDetail.quantity_request'),
          fieldName: 'requestQuantity',
        },
      ] as ColumnProps[],
    [t]
  )

  const dataTable = allocationLineFields.map((item, index) => {
    return {
      asset: (
        <CoreInput
          control={control}
          name={`asset.${index}.asset.code`}
          label=''
          isViewProp={true}
        />
      ),
      assetName: (
        <CoreInput
          control={control}
          name={`asset.${index}.asset.name`}
          label=''
          isViewProp={true}
        />
      ),
      quantity: (
        <div className='flex gap-4'>
          <Typography>{item.quantity}</Typography>
          <Typography>{item.uom?.name}</Typography>
        </div>
      ),
      requestQuantity: (
        <div className='flex gap-4'>
          <Typography>{item.requestQuantity}</Typography>
          <Typography>{item.uom?.name}</Typography>
        </div>
      ),
    }
  })

  const { mutate, isLoading: isLoadingApprove } = useMutation(
    changeStatusApprove,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.APPROVE_ALLOCATION_REQUEST}`,
        })
      },
      onError: (error) => {
        toastError(error, methods.setError)
      },
    }
  )

  const handleChangeStatus = (status: string) => {
    if (isUpdate && dataRequestAllocationDetail) {
      mutate({
        id: id,
        status: status,
      })
    }
  }

  const {
    data: dataRequestAllocationDetail,
    isLoading,
    refetch,
  } = useQueryGetRequestAllocationDetail(
    {
      id: id,
    },
    { enabled: isUpdate }
  )

  const { convertToDate } = useDate()

  useEffect(() => {
    if (isUpdate && dataRequestAllocationDetail) {
      reset({
        ...dataRequestAllocationDetail.data,
        asset: dataRequestAllocationDetail.data.asset,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRequestAllocationDetail])

  return [
    {
      t,
      methods,
      dataDetail: dataRequestAllocationDetail?.data,
      isView,
      isUpdate,
      isLoading,
      isLoadingApprove,
      id,
      columns,
      dataTable,
    },
    { appendAllocationLineField, handleChangeStatus },
  ] as const
}
