import { ColumnProps } from '@/components/organism/CoreTable'
import { changeTypeDeclaration } from '@/enum'
import { TRANSLATE } from '@/routes'
import {
  getListRepairDetail,
  useQueryGetListRepair,
} from '@/service/asset/jobDeclaration/list'
import { getRequestAllocationFollow } from '@/service/asset/trackAllocationRequest/getList/getRequestAllocationParameter'
import { toastError } from '@/toast'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
type Props = {
  type: string
  id: number
}
const useMachineDetail = (props: Props) => {
  const { type, id } = props
  const { t } = useTranslation(TRANSLATE.JOB_DECLARATION)

  const columns = useMemo(() => {
    return [
      {
        header: 'Chi tiết máy',
        fieldName: 'product.name',
      },
      {
        header: t('Công việc'),
        fieldName: 'work',
      },
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const { data: dataListRepair, isLoading: isLoadingListRepair } =
    useQueryGetListRepair({
      id: id,
      typeDeclarations: ['DETAILS_WORK_OVER_VIEW', 'DETAILS_WORK_REPAIR'],
    })

  const tableData = (dataListRepair ? dataListRepair.data : []).map((item) => {
    return { ...item }
  })

  const columnsChild = useMemo(
    () =>
      [
        {
          header: 'Nội dung công việc',
          fieldName: 'content',
        },
        {
          header: 'Thời gian tiêu chuẩn',
          fieldName: 'standardTime',
        },
        {
          header: 'Loại công việc',
          fieldName: 'typeDeclaration',
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )
  const [dataChild, setDataChild] = useState<any[]>([])
  const [isLoadingChild, setIsLoadingChild] = useState<{
    [id: number]: boolean
  }>({})
  const handleFetchDataChild = async (id: number) => {
    try {
      setIsLoadingChild({ [id]: true })
      await getListRepairDetail({ id: id }).then((res) => {
        setDataChild(res?.data)
        setIsLoadingChild({ [id]: false })
      })
    } catch (error) {
      toastError(error)
    }
  }

  const tableDataChild = dataChild.map((item) => {
    return {
      ...item,
      typeDeclaration: changeTypeDeclaration(item.typeDeclaration, t),
    }
  })

  return [
    {
      columns,
      tableData,
      isLoadingListRepair,
      columnsChild,
      tableDataChild,
      isLoadingChild,
    },
    { t, handleFetchDataChild },
  ] as const
}

export default useMachineDetail
