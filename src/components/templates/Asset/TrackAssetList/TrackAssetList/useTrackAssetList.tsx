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
  useQueryTrackAssetList,
  useQueryTrackAssetListIdentifierCode,
} from '@/service/asset/trackAssetList/getList'
import { TrackAssetListParameter } from '@/service/asset/trackAssetList/getList/getParameter/type'
import { getTrackAssetListParameter } from '@/service/asset/trackAssetList/getList/getParameter'
import { useRouter } from 'next/router'
import { getTypeData } from '@/components/molecules/TextColor'
import { AllocatedAssetListCheckingType, IssuanceSource } from '@/enum'
import { CoreImage } from '@/components/atoms/CoreImage'

const defaultValues = {
  search: '',
  categoryId: null,
  sourceEnum: null,
  date: '',
  allocationChooseType: 'DEPARTMENT',
  page: 0,
  size: 20,
}

export const useTrackAssetList = (props: { allocationChooseType: string }) => {
  const { allocationChooseType } = props
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

  const { isLoading: isLoadingTable, data } = useQueryTrackAssetList(
    {
      ...queryPage,
      allocationChooseType,
    },
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
          header: t('table.assetQuantity'),
          fieldName: 'assetQuantity',
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
      assetQuantity: `${item?.quantity} ${item?.uom?.name}`,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, data])

  const columnsChild = useMemo(
    () =>
      [
        {
          header: t('table.allocateDate'),
          fieldName: 'allocateDate',
        },
        {
          header: t('table.allocateCode'),
          fieldName: 'allocateCode',
        },
        {
          header: t('table.source'),
          fieldName: 'source',
        },
        {
          header: t('table.allocateQuantity'),
          fieldName: 'allocateQuantity',
        },
      ] as ColumnProps[],
    [t]
  )
  const [dataChild, setDataChild] = useState<TrackAssetListParameter[]>([])
  const [isLoadingChild, setIsLoadingChild] = useState<{
    [id: number]: boolean
  }>({})
  const handleFetchDataChild = async (
    id: number,
    assetAllocationIds: number[]
  ) => {
    try {
      setIsLoadingChild({ [id]: true })
      await getTrackAssetListParameter({ id, assetAllocationIds }).then(
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
      allocateDate: convertToDate(item?.date),
      allocateCode: item?.code,
      source: getTypeData(item?.source, IssuanceSource),
      allocateQuantity: `${item?.quantity} ${item?.uom?.name}`,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataChild])

  const { isLoading: isLoadingTableIdentifierCode, data: dataIdentifierCode } =
    useQueryTrackAssetListIdentifierCode(
      {
        ...queryPage,
        allocationChooseType,
      },
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
        header: t('table.allocateDate'),
        fieldName: 'allocateDate',
      },
      {
        header: t('table.allocateCode'),
        fieldName: 'allocateCode',
      },
      // {
      //   header: t('table.responsibleStaff'),
      //   fieldName: 'responsibleStaff',
      // },
      {
        header: t('table.status'),
        fieldName: 'status',
      },
    ]
    if (allocationChooseType === 'DEPARTMENT') {
      baseColumns.splice(8, 0, {
        header: t('table.responsibleStaff'),
        fieldName: 'responsibleStaff',
      })
    }
    return baseColumns as ColumnProps[]
  }, [allocationChooseType, t])
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
      allocateCode: item?.code,
      responsibleStaff: item?.staff?.name,
      status: getTypeData(item?.checkingType, AllocatedAssetListCheckingType),
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, dataIdentifierCode])

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
    },
    { t, onReset, onSubmit, onChangePageSize, handleFetchDataChild },
  ] as const
}
