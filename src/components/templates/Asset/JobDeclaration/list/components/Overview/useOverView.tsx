import { ColumnProps } from '@/components/organism/CoreTable'
import { changeTypeDeclaration } from '@/enum'
import { TRANSLATE } from '@/routes'
import { useQueryGetListJOverView } from '@/service/asset/jobDeclaration/list'
import { Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
type Props = {
  type: string
  id: number
}
const useOverView = (props: Props) => {
  const { type, id } = props
  const { t } = useTranslation(TRANSLATE.JOB_DECLARATION)

  const columns = useMemo(() => {
    return [
      {
        header: t('Nội dung công việc'),
        fieldName: 'content',
      },
      {
        header: t('Thời gian tiêu chuẩn'),
        fieldName: 'standardTime',
      },
      {
        header: t('Loại công việc'),
        fieldName: 'typeDeclaration',
      },
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const { data: dataListJOverView, isLoading: isLoadingListJOverView } =
    useQueryGetListJOverView({
      id: id,
      typeDeclarations: [
        'MAINTENANCE_WORK_OVER_VIEW',
        'MAINTENANCE_WORK_REPAIR',
      ],
    })

  const tableData = (dataListJOverView ? dataListJOverView.data : []).map(
    (item) => {
      return {
        ...item,
        typeDeclaration: changeTypeDeclaration(item.typeDeclaration, t),
      }
    }
  )

  return [{ columns, tableData, isLoadingListJOverView }, { t }] as const
}

export default useOverView
