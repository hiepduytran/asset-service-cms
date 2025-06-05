import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryGetListAssetStatusManagement } from '@/service/asset/assetStatusManagement/list'
import { RequestParams } from '@/service/asset/severityManagement/list/type'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
const defaultValues = {
  search: '',
  managementType: 'ASSET_STATUS_MANAGEMENT',
  page: 0,
  size: 10,
}
export default function useAssetStatusManagement() {
  const { t } = useTranslation(TRANSLATE.ASSET_STATUS_MANAGEMENT)
  const methods = useFormCustom<RequestParams>()
  const router = useRouter()

  const [queryPage, setQueryPage] = useState<RequestParams>(defaultValues)

  const onChangePageSize = (input: any) => {
    const { page, size } = input
    setQueryPage({ ...defaultValues, page, size })
  }

  const { handleSubmit, reset } = methods

  const {
    data: dataGetListAssetStatusManagement,
    isLoading: isLoadingGetListAssetStatusManagement,
  } = useQueryGetListAssetStatusManagement(queryPage)

  const columns = useMemo(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return [
      {
        header: 'Mã tình trạng',
        fieldName: 'code',
      },
      {
        header: 'Tên tình trạng',
        fieldName: 'name',
      },
      {
        header: 'Trạng thái',
        fieldName: 'isActive',
      },
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const dataTable = (
    dataGetListAssetStatusManagement
      ? dataGetListAssetStatusManagement.data.content
      : []
  ).map((item) => {
    return {
      ...item,
      isActive: (
        <Typography>{item.isActive ? 'Active' : 'Inactive'}</Typography>
      ),
    }
  })

  const onSubmit = handleSubmit((data) => {
    setQueryPage({ ...queryPage, ...data })
  })

  const onReset = () => {
    reset(defaultValues)
    setQueryPage(defaultValues)
  }
  return [
    {
      methods,
      router,
      columns,
      dataTable,
      isLoadingGetListAssetStatusManagement,
      page: dataGetListAssetStatusManagement
        ? {
            page: dataGetListAssetStatusManagement.data.page,
            size: dataGetListAssetStatusManagement.data.size,
            totalPages: dataGetListAssetStatusManagement.data.totalPages,
          }
        : null,
    },
    { t, onSubmit, onChangePageSize, onReset },
  ] as const
}
