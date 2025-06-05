import React from 'react'
import { CoreTable } from '@/components/organism/CoreTable'
import { useStep2 } from './useStep2'

export default function StepTwo() {
  const [values, handles] = useStep2()
  const {
    columnsStep1,
    dataTableStep1
  } = values
  const { } = handles

  return (
    <CoreTable
      isShowColumnStt
      columns={columnsStep1}
      data={dataTableStep1}
      paginationHidden
    />
  )
}
