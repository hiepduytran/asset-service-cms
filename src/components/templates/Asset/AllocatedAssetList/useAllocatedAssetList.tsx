import { useDate } from '@/components/hooks/date/useDate'
import { ColumnProps } from '@/components/organism/CoreTable'
import { toastError } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/asset/trackAssetList/getList/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'
import {
  useQueryFollowGetAll,
  useQueryTrackAssetListIdentifierCode,
} from '@/service/asset/trackAssetList/getList'
import { getFollowProductId } from '@/service/asset/trackAssetList/getList/getParameter'
import { useRouter } from 'next/router'
import { getTypeData } from '@/components/molecules/TextColor'
import { AllocatedAssetListCheckingType, IssuanceSource, typeOfInitialAllocation } from '@/enum'
import { CoreImage } from '@/components/atoms/CoreImage'
import { useQueryCard } from '@/service/asset/trackAssetList/getCard'

const defaultValues = {
  search: '',
  categoryId: null,
  sourceEnum: null,
  date: '',
  allocationTarget: null,
  status: null,
  page: 0,
  size: 20,
}

export const useAllocatedAssetList = () => {
  const { t } = useTranslation(TRANSLATE.TRACK_ASSET_LIST)
  const router = useRouter()
  const { view } = router.query
  const viewType = view ?? 'ASSET_CODE'
  const { convertToDate } = useDate()
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
  const { reset, handleSubmit } = methodForm
  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(
    _.omitBy(defaultValues, _.isNil)
  )
  const onChangePageSize = (val: RequestBody['GET']) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    setQueryPage(input)
  }

  const onReset = () => {
    reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = handleSubmit(async (input) => {
    setQueryPage(input)
  })

  const { isLoading: isLoadingTable, data } = useQueryFollowGetAll(
    queryPage,
    { enabled: viewType === 'ASSET_CODE' }
  )


  const columns = useMemo(
    () =>
      [
        {
          header: t('table.assetImage'),
          fieldName: 'assetImage',
          styleCell: {
            style: {
              minWidth: '100px',
            },
          },
        },
        {
          header: t('table.assetCode'),
          fieldName: 'assetCode',
        },
        {
          header: t('table.assetName'),
          fieldName: 'assetName',
        },
        {
          header: t('table.assetCategory'),
          fieldName: 'assetCategory',
        },
        {
          header: t('table.allocateQuantity'),
          fieldName: 'allocateQuantity',
        },
      ] as ColumnProps[],
    [t]
  )
  const tableData = useMemo(() => {
    return (data?.data?.content ?? [])?.map((item) => ({
      ...item,
      assetImage: (
        <CoreImage
          src={item?.images ? item?.images[0] ?? '' : ''}
          alt=''
          width={40}
          height={40}
        />
      ),
      assetCode: item?.code,
      assetName: item?.name,
      assetCategory: item?.category?.name,
      allocateQuantity: `${item?.quantity} ${item?.uom?.name}`,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, data])

  const columnsChild = useMemo(
    () =>
      [
        {
          header: t('table.assetImage'),
          fieldName: 'assetImage',
          styleCell: {
            style: {
              minWidth: '100px',
            },
          },
        },
        {
          header: t('table.identifierCode'),
          fieldName: 'identifierCode',
        },
        {
          header: t('table.allocateSource'),
          fieldName: 'allocateSource',
        },
        {
          header: t('table.referenceCode'),
          fieldName: 'referenceCode',
        },
        {
          header: t('table.allocateDate'),
          fieldName: 'allocateDate',
        },
        {
          header: t('table.allocationTarget'),
          fieldName: 'allocationTarget',
        },
        {
          header: t('table.status'),
          fieldName: 'status',
        },
      ] as ColumnProps[],
    [t]
  )
  const [dataChild, setDataChild] = useState<any[]>([])
  const [isLoadingChild, setIsLoadingChild] = useState<{
    [id: number]: boolean
  }>({})
  const handleFetchDataChild = async (
    id: number,
  ) => {
    try {
      setIsLoadingChild({ [id]: true })
      await getFollowProductId({ productId: id }).then(
        (res) => {
          setDataChild(res?.data)
          setIsLoadingChild({ [id]: false })
        }
      )
    } catch (error) {
      toastError(error)
    }
  }
  const tableDataChild = useMemo(() => {
    return dataChild?.map((item) => ({
      ...item,
      assetImage: (
        <CoreImage
          src={item?.images ? item?.images[0] ?? '' : ''}
          alt=''
          width={40}
          height={40}
        />
      ),
      identifierCode: item?.dic,
      allocateSource: getTypeData(item?.assetAllocationType, IssuanceSource),
      referenceCode: item?.code,
      allocateDate: convertToDate(item?.requestDate),
      allocationTarget: getTypeData(item?.allocationChooseType, typeOfInitialAllocation),
      status: getTypeData(item?.checkingType, AllocatedAssetListCheckingType),
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataChild])

  const { isLoading: isLoadingTableIdentifierCode, data: dataIdentifierCode } =
    useQueryTrackAssetListIdentifierCode(
      queryPage,
      { enabled: viewType === 'IDENTIFIER_CODE' }
    )

  const columnsIdentifierCode = useMemo(() => {
    const baseColumns = [
      {
        header: t('table.assetImage'),
        fieldName: 'assetImage',
        styleCell: {
          style: {
            minWidth: '100px',
          },
        },
      },
      {
        header: t('table.identifierCode'),
        fieldName: 'identifierCode',
      },
      {
        header: t('table.assetCode'),
        fieldName: 'assetCode',
      },
      {
        header: t('table.assetName'),
        fieldName: 'assetName',
      },
      {
        header: t('table.assetCategory'),
        fieldName: 'assetCategory',
      },
      {
        header: t('table.allocateSource'),
        fieldName: 'allocateSource',
      },
      {
        header: t('table.referenceCode'),
        fieldName: 'referenceCode',
      },
      {
        header: t('table.allocateDate'),
        fieldName: 'allocateDate',
      },
      {
        header: t('table.allocationTarget'),
        fieldName: 'allocationTarget',
      },
      {
        header: t('table.status'),
        fieldName: 'status',
      },
    ]
    return baseColumns as ColumnProps[]
  }, [t])
  const tableDataIdentifierCode = useMemo(() => {
    return (dataIdentifierCode?.data?.content ?? [])?.map((item) => ({
      ...item,
      assetImage: (
        <CoreImage
          src={item?.images ? item?.images[0] ?? '' : ''}
          alt=''
          width={40}
          height={40}
        />
      ),
      identifierCode: item?.dic,
      assetCode: item?.sku,
      assetName: item?.name,
      assetCategory: item?.category?.name,
      allocateSource: getTypeData(item?.assetAllocationType, IssuanceSource),
      allocateDate: convertToDate(item?.requestDate),
      referenceCode: item?.code,
      allocationTarget: getTypeData(item?.allocationChooseType, typeOfInitialAllocation),
      status: getTypeData(item?.checkingType, AllocatedAssetListCheckingType),
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, dataIdentifierCode])


  const { data: cardData, isLoading: isLoadingCard } = useQueryCard({})

  return [
    {
      viewType,
      methodForm,
      isLoadingTable,
      columns,
      tableData,
      data: data?.data,
      columnsChild,
      dataChild: tableDataChild,
      isLoadingChild,
      isLoadingTableIdentifierCode,
      columnsIdentifierCode,
      tableDataIdentifierCode,
      dataIdentifierCode: dataIdentifierCode?.data,
      cardData: cardData?.data,
      isLoadingCard,
    },
    { t, onReset, onSubmit, onChangePageSize, handleFetchDataChild },
  ] as const
}
