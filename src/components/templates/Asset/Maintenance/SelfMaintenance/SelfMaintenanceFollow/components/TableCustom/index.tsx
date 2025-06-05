import React from 'react'

import useTableCustom from './useTableCustom'
import { ColumnProps, CoreTable } from '@/components/organism/CoreTable'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
type Props = {
  index: number
}

export default function TableCustom(props: Props) {
  const { index } = props
  const [
    { tableData, isView, isUpdate, columns },
    { t, appendStandardMaintenanceLine },
  ] = useTableCustom(props)

  return (
    <CoreTable
      tableName='standardMaintenanceLines'
      columns={columns}
      data={tableData}
      isShowColumnStt
      paginationHidden
    />
  )
}
