import { TRANSLATE } from '@/routes'
import { useQueryGetListJobDeclaration } from '@/service/asset/jobDeclaration/list'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
type Props = {
  queryPage: any
  onChangePageSize: (input: any) => void
}
export default function useTableJobDeclaration(props: Props) {
  const { t } = useTranslation(TRANSLATE.JOB_DECLARATION)
  const { queryPage } = props
  const [type, setType] = useState<string>('ALL')
  const router = useRouter()
  const methods = useFormContext()

  const changeJobDeclarationType = (type: string) => {
    if (type === 'ALL') return 'Theo tổng quan và chi tiết máy'
    if (type === 'OVERVIEW') return 'Theo tổng quan'
    if (type === 'MACHINE_DETAILS') return 'Theo chi tiết máy'
  }

  const {
    data: dataGetListJobDeclaration,
    isLoading: isLoadingGetListJobDeclaration,
  } = useQueryGetListJobDeclaration(queryPage)

  return [
    {
      router,
      dataGetListJobDeclaration: dataGetListJobDeclaration
        ? dataGetListJobDeclaration.data.content
        : [],
      pageObject: {
        page: dataGetListJobDeclaration?.data.page,
        size: dataGetListJobDeclaration?.data.size,
        totalPages: dataGetListJobDeclaration?.data.totalPages,
      },
      isLoadingGetListJobDeclaration,
      type,
    },
    { t, setType, changeJobDeclarationType },
  ] as const
}
