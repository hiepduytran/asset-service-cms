import { CoreTable } from '@/components/organism/CoreTable'
import React from 'react'
import { useTableStandard } from './useTableStandard'

type Props = {
  index: number
}

export default function TableStandard({ index }: Props) {
  const { columns, dataTable } = useTableStandard({ index })
  return (
    <CoreTable
      tableName='standard'
      columns={columns}
      data={dataTable}
      isShowColumnStt
      isShowNoDataText={false}
      paginationHidden={true}
    />
  )
}
