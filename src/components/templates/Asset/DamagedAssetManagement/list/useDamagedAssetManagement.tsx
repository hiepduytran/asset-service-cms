import { useDate } from '@/components/hooks/date/useDate'
import { ColumnProps } from '@/components/organism/CoreTable'
import { convertAssetAllocationType, convertRecordConditionType } from '@/enum'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryGetIncidentRecordingManageList } from '@/service/asset/damagedAssetManagement/list'
import {
  IncidentRecordingManageList,
  RequestParam,
} from '@/service/asset/damagedAssetManagement/list/type'
import { Checkbox, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
const defaultValues = {
  search: '',
  date: '',
  page: 0,
  size: 10,
  around: 'IDENTITY',
}
export default function useDamagedAssetManagement() {
  const { t } = useTranslation(TRANSLATE.DAMAGED_ASSET_MANAGEMENT)
  const methods = useFormCustom<RequestParam['LIST']>({
    defaultValues,
  })
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const refCheckbox = useRef<any>(null)
  const { convertToDate } = useDate()

  const [queryPage, setQueryPage] =
    useState<RequestParam['LIST']>(defaultValues)

  const [anchorEl, setAnchorEl] = useState<any>(null)
  const { control, handleSubmit, setValue, getValues, watch, reset } = methods

  const [isCheckLength, setIsCheckLength] = useState(false)
  const [dataCheckbox, setDataCheckbox] = useState<
    IncidentRecordingManageList[]
  >([])

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    setQueryPage(input)
  }
  const onSubmit = handleSubmit(async (input) => {
    setQueryPage({ ...input })
  })

  const onReset = () => {
    reset(defaultValues)
  }

  const {
    data: dataIncidentRecordingManageList,
    isLoading: isLoadingIncidentRecordingManageList,
  } = useQueryGetIncidentRecordingManageList(queryPage)

  useEffect(() => {
    setIsCheckLength(false)
    if (dataIncidentRecordingManageList) {
      if (
        dataIncidentRecordingManageList?.data.content.some(
          (record) => !dataCheckbox.some((item) => item.id === record.id)
        ) ||
        dataIncidentRecordingManageList?.data.content.length === 0
      ) {
        setIsCheckLength(false)
      } else {
        setIsCheckLength(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataIncidentRecordingManageList, dataCheckbox])

  useEffect(() => {
    if (
      dataCheckbox.every((item) => item[item.id]) &&
      dataCheckbox.length ===
        dataIncidentRecordingManageList?.data.totalElements
    ) {
      setIsCheckLength(true)
    }
  }, [dataCheckbox, dataIncidentRecordingManageList])

  // Chiều thời gian
  // const columnsTime = useMemo(() => {
  //   return [
  //     {
  //       header: <CoreCheckbox name='checkboxTime' control={control} label='' />,
  //       fieldName: 'checkbox',
  //     },
  //     {
  //       header: 'Ngày cập nhật',
  //       fieldName: '',
  //     },
  //     {
  //       header: 'Mã thu hồi',
  //       fieldName: '',
  //     },
  //     {
  //       header: 'Mã định danh',
  //       fieldName: '',
  //     },
  //     {
  //       header: 'Mã tài sản ',
  //       fieldName: '',
  //     },
  //     {
  //       header: 'Tên tài sản',
  //       fieldName: '',
  //     },
  //     {
  //       header: 'Tình trạng',
  //       fieldName: '',
  //     },
  //   ]
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [t]) as ColumnProps[]

  // const dataTableTime = ([] as any[]).map((item, index) => {
  //   return {
  //     ...item,
  //     checkbox: <CoreCheckbox name='checkboxTime' control={control} label='' />,
  //   }
  // })

  // Chiều mã định danh
  const columnsIdentity = useMemo(() => {
    return [
      {
        header: (
          <Checkbox
            size='small'
            inputRef={refCheckbox}
            checked={isCheckLength}
            onChange={(e) => {
              setIsCheckLength(e.target.checked)
              if (e.target.checked) {
                setDataCheckbox((prev) => {
                  const newItems = dataIncidentRecordingManageList
                    ? dataIncidentRecordingManageList.data.content
                    : []

                  if (prev.length > 0) {
                    return [
                      ...prev,
                      ...newItems.filter(
                        (item) =>
                          !prev.some((prevItem) => prevItem.id === item.id)
                      ),
                    ]
                  } else {
                    return newItems
                  }
                })
              } else {
                setDataCheckbox((prev) => {
                  if (dataIncidentRecordingManageList) {
                    const newItems =
                      dataIncidentRecordingManageList.data.content
                    return prev.filter(
                      (record) =>
                        !newItems.some((newItem) => newItem.id === record.id)
                    )
                  }
                  return prev
                })
              }
            }}
            sx={{
              padding: 0,
            }}
          />
        ),
        fieldName: 'checkbox',
      },
      {
        header: 'Ngày cập nhật',
        fieldName: 'date',
      },
      {
        header: 'Mã định danh',
        fieldName: 'code',
      },
      {
        header: 'Nguồn',
        fieldName: 'source',
      },
      {
        header: 'Mã tham chiếu',
        fieldName: 'sourceCode',
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
        header: 'Tình trạng tài sản',
        fieldName: 'status',
      },
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, dataCheckbox, isCheckLength, dataIncidentRecordingManageList])

  const dataTable = (dataIncidentRecordingManageList?.data.content || []).map(
    (item, index) => {
      return {
        ...item,
        date: convertToDate(item.date),
        source: (
          <Typography>{convertAssetAllocationType(item.source)}</Typography>
        ),
        checkbox: (
          <Checkbox
            size='small'
            checked={!!dataCheckbox.find((item2) => item.id === item2.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setDataCheckbox((prev) => [...prev, item])
                if (
                  dataIncidentRecordingManageList?.data.content.every(
                    (record) => dataCheckbox.includes(record)
                  )
                ) {
                  setIsCheckLength(true)
                }
              } else {
                setDataCheckbox((prev) =>
                  prev.filter((item2) => item.id !== item2.id)
                )
                setIsCheckLength(false)
              }
            }}
            sx={{
              padding: 0,
            }}
          />
        ),
        status: (
          <Typography>{convertRecordConditionType(item.status)}</Typography>
        ),
      }
    }
  )

  // Chiều ghi nhận sự cố
  // const columnsIncidentLog = useMemo(() => {
  //   return [
  //     {
  //       header: (
  //         <CoreCheckbox
  //           name='checkboxIncidentLog'
  //           control={control}
  //           label=''
  //           className='w-[20px]'
  //         />
  //       ),
  //       fieldName: 'checkbox',
  //     },
  //     {
  //       header: 'Ngày cập nhật',
  //       fieldName: '',
  //     },
  //     {
  //       header: 'Nguồn',
  //       fieldName: '',
  //     },
  //     {
  //       header: 'Mã ghi nhận sự cố',
  //       fieldName: '',
  //     },
  //     {
  //       header: 'Số lượng',
  //       fieldName: 'quantity',
  //     },
  //   ]
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [t]) as ColumnProps[]

  // const dataTableIncidentLog = ([] as any[]).map((item) => {
  //   return {
  //     ...item,
  //     checkbox: <CoreCheckbox name='' control={control} label='' />,
  //   }
  // })

  // Chiều ghi nhận sự cố con
  // const columnsIncidentLogChild = useMemo(() => {
  //   return [
  //     {
  //       header: 'Mã định danh',
  //       fieldName: '',
  //     },
  //     {
  //       header: 'Mã tài sản',
  //       fieldName: '',
  //     },
  //     {
  //       header: 'Tên tài sản',
  //       fieldName: '',
  //     },
  //     {
  //       header: 'Tình trạng tài sản',
  //       fieldName: '',
  //     },
  //   ]
  // }, [t]) as ColumnProps[]

  // const fetchDataChild = async (id: number) => {
  //   try {
  //     setIsLoadingChild({ [id]: true })

  //     const data = await planMaintenanceAllocationChild({
  //       planMaintenanceId: id,
  //     })
  //     if (data) {
  //       setDataChild(data)
  //       setIsLoadingChild({ [id]: false })
  //     }
  //   } catch (error) {
  //     toastError(error, setError)
  //   }
  // }

  return [
    {
      methods,
      isUpdate,
      isView,
      dataCheckbox,
      columnsIdentity,
      dataTableIdentity: dataTable,
      page: dataIncidentRecordingManageList
        ? {
            page: dataIncidentRecordingManageList.data.page,
            size: dataIncidentRecordingManageList.data.size,
            totalPages: dataIncidentRecordingManageList.data.totalPages,
          }
        : null,
      isLoadingIncidentRecordingManageList,
      // columnsTime,
      // dataTableTime,
      // columnsIncidentLog,
      // dataTableIncidentLog,
      // columnsIncidentLogChild,
      // dataTableIncidentChild: dataChild,
      // fetchDataChild,
      // isLoadingChild,
      anchorEl,
    },

    {
      t,
      onSubmit,
      onChangePageSize,
      setAnchorEl,
      onReset,
    },
  ] as const
}
