import { ColumnProps } from '@/components/organism/CoreTable'
import {
  convertAllocationStatus,
  convertAssetAllocationType,
  convertRecordConditionType,
} from '@/enum'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import {
  assetHistoryListDetail,
  useQueryAssetHistoryList,
  useQueryAssetHistoryListTime,
} from '@/service/asset/assetUseHistory/list'
import {
  AssetHistoryForm,
  RequestParams,
} from '@/service/asset/assetUseHistory/list/type'
import { useQueryGetOrgAllByUser } from '@/service/resource/org/getAllByUser'
import { toastError } from '@/toast'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
const defaultValues = {
  search: '',
  startDate: '',
  endDate: '',
  page: 0,
  size: 10,
  around: 'IDENTITY',
}
export default function useAssetUseHistory() {
  const { t } = useTranslation(TRANSLATE.ASSET_USE_HISTORY)
  const { id, actionType } = useRouter().query
  const isUpdate = !!id
  const isView = actionType === 'VIEW'
  const methods = useFormCustom<AssetHistoryForm>({
    defaultValues,
  })
  const { setError, reset, getValues, watch } = methods
  const [dataChild, setDataChild] = useState<any[]>([])
  const [isLoadingChild, setIsLoadingChild] =
    useState<{
      [id: number]: boolean
    }>()
  const [queryPage, setQueryPage] =
    useState<RequestParams['GET']>(defaultValues)

  const { data: dataOrg } = useQueryGetOrgAllByUser({
    activated: true,
  })

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    setQueryPage(input)
  }

  const onReset = () => {
    reset(defaultValues)
    setQueryPage(defaultValues)
  }
  const onSubmit = methods.handleSubmit(async (input) => {
    setQueryPage({
      ...input,
      org: getValues('org')?.id,
      department: getValues('department')?.id,
      employee: getValues('employee')?.id,
    })
  })

  const { data: dataAssetHistoryList, isLoading: isLoadingAssetHistoryList } =
    useQueryAssetHistoryList(queryPage, {
      enabled: watch('around') === 'IDENTITY',
    })

  const {
    data: dataAssetHistoryListTime,
    isLoading: isLoadingAssetHistoryListTime,
  } = useQueryAssetHistoryListTime(queryPage, {
    enabled: watch('around') === 'TIME',
  })

  const [anchorEl, setAnchorEl] = useState<any>(null)

  const columnsIdentity = useMemo(() => {
    return [
      {
        header: 'Mã định danh',
        fieldName: 'assetCode',
      },
      {
        header: 'Mã tài sản',
        fieldName: 'productCode',
      },
      {
        header: 'Tên tài sản',
        fieldName: 'productName',
      },
      {
        header: 'Số lần cấp phát',
        fieldName: 'allocatedTimes',
      },
      {
        header: 'Số lần thu hồi',
        fieldName: 'recoveredTimes',
      },
      {
        header: 'Trạng thái hiện tại',
        fieldName: 'status',
      },
      {
        header: 'Tình trạng',
        fieldName: 'assetStatus',
      },
      {
        header: '',
        fieldName: 'dropDown',
        styleCell: {
          style: {
            minWidth: '100px',
          },
        },
      },
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const columnsIdentityChild = useMemo(() => {
    return [
      {
        header: 'Ngày bắt đầu',
        fieldName: 'startDate',
      },
      {
        header: 'Ngày kết thúc',
        fieldName: 'endDate',
      },
      {
        header: 'Số ngày theo trạng thái ',
        fieldName: 'totalDate',
      },
      {
        header: 'Tổ chức quản lý',
        fieldName: 'org',
      },
      {
        header: 'Phòng ban quản lý',
        fieldName: 'department',
      },
      {
        header: 'Nhân viên quản lý',
        fieldName: 'employee',
      },
      {
        header: 'Trạng thái',
        fieldName: 'status',
      },
      {
        header: 'Tình trạng',
        fieldName: 'assetStatus',
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]) as ColumnProps[]

  const columnsTime = useMemo(() => {
    return [
      {
        header: 'Ngày cập nhật',
        fieldName: 'updateDate',
      },
      {
        header: 'Ngày bắt đầu',
        fieldName: 'startDate',
      },
      {
        header: 'Ngày kết thúc',
        fieldName: 'endDate',
      },
      {
        header: 'Số ngày theo trạng thái',
        fieldName: 'totalDate',
      },
      {
        header: 'Mã định danh',
        fieldName: 'assetCode',
      },
      {
        header: 'Mã tài sản',
        fieldName: 'productCode',
      },
      {
        header: 'Tên tài sản',
        fieldName: 'productName',
      },
      {
        header: 'Trạng thái',
        fieldName: 'status',
      },
      {
        header: 'Tình trạng',
        fieldName: 'assetStatus',
      },
      {
        header: 'Tổ chức quản lý',
        fieldName: 'org',
      },
      {
        header: 'Phòng ban quản lý',
        fieldName: 'department',
      },
      {
        header: 'Nhân viên quản lý',
        fieldName: 'employee',
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]) as ColumnProps[]

  const dataTableTime = (
    dataAssetHistoryListTime ? dataAssetHistoryListTime.data.content : []
  ).map((item) => {
    return {
      ...item,
      status: (
        <Typography>{convertAssetAllocationType(item?.status)}</Typography>
      ),
      assetStatus: (
        <Typography>{convertRecordConditionType(item?.assetStatus)}</Typography>
      ),
    }
  })

  const convertAround = (name: string) => {
    if (name === 'IDENTITY') {
      return <Typography color={'#0078D4'}>Mã định danh</Typography>
    } else if (name === 'TIME') {
      return <Typography color={'#0078D4'}>Thời gian</Typography>
    }
  }

  const fetchDataChild = async (id: number) => {
    try {
      setIsLoadingChild({ [id]: true })

      const result = await assetHistoryListDetail({
        assetId: id,
      })
      setDataChild(result.data)
      setIsLoadingChild({ [id]: false })
    } catch (error) {
      toastError(error, setError)
    }
  }

  const dataTableIdentity = (
    dataAssetHistoryList ? dataAssetHistoryList.data.content : []
  ).map((item) => {
    return {
      ...item,
      allocatedTimes: <Typography>{item?.allocatedTimes ?? 0} lần</Typography>,
      recoveredTimes: <Typography>{item?.recoveredTimes} lần</Typography>,
      status: <Typography>{convertAllocationStatus(item?.status)}</Typography>,
      assetStatus: (
        <Typography>{convertRecordConditionType(item?.assetStatus)}</Typography>
      ),
    }
  })

  const dataTableIdentityChild = dataChild.map((item: any) => {
    return {
      ...item,
      status: (
        <Typography>{convertAssetAllocationType(item?.status)}</Typography>
      ),
      assetStatus: (
        <Typography>{convertRecordConditionType(item?.assetStatus)}</Typography>
      ),
    }
  })

  return [
    {
      isUpdate,
      isView,
      methods,
      dataTableIdentity,
      pageIdentity: dataAssetHistoryList
        ? {
            page: dataAssetHistoryList?.data.page,
            size: dataAssetHistoryList?.data.size,
            totalPages: dataAssetHistoryList?.data.totalPages,
          }
        : null,
      columnsIdentity,
      isLoadingAssetHistoryList,
      columnsIdentityChild,
      columnsTime,
      dataTableIdentityChild,
      isLoadingChild,
      dataTableTime,
      pageTime: dataAssetHistoryListTime
        ? {
            page: dataAssetHistoryListTime.data.page,
            size: dataAssetHistoryListTime.data.size,
            totalPages: dataAssetHistoryListTime.data.totalPages,
          }
        : null,
      isLoadingAssetHistoryListTime,
      anchorEl,
      dataOrg: dataOrg ? dataOrg.data : [],
    },

    {
      t,
      onSubmit,
      onReset,
      onChangePageSize,
      setAnchorEl,
      convertAround,
      fetchDataChild,
    },
  ] as const
}
