import React from 'react'
import { useTableStep2 } from './useTableStep2'
import TableList from './TableList'

export default function TableStep2(props: {
  index: number
}) {
  const { index } = props
  const [values, handles] = useTableStep2(props)
  const { fieldsConfigMaintenance } = values
  const { appendConfigMaintenance, removeConfigMaintenance } = handles
  const { t } = handles
  return (
    <>
      <TableList
        t={t}
        index={index}
        fields={fieldsConfigMaintenance}
        append={appendConfigMaintenance}
        remove={removeConfigMaintenance}
      />
    </>
  )
}
