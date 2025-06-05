import { ColumnProps, CoreTable } from '@/components/organism/CoreTable'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import React from 'react'
import useTableCustom from './useTableCustom'
import { DetailAccessory } from '@/service/asset/maintenance/selfMaintenance/standardDeclare/list/type'
type Props = {
  columns: ColumnProps[]
  index: number
}

export default function TableCustom(props: Props) {
  const [{ methods, tableData, isView, isUpdate }, { t, appendStandard }] =
    useTableCustom(props)
  const { columns } = props
  const { getValues } = methods
  return (
    <CoreTable
      tableName='standardMethodGroup'
      columns={columns}
      data={tableData}
      isShowColumnStt
      paginationHidden
      actionTable={
        isView ? (
          <></>
        ) : (
          <ActionTable
            action={`${t('self_maintenance.standard_declare.add_maintenance')}`}
            columns={columns}
            defaultValueLine={{
              id: null,
              product: null,
              standardMethods: null,
              result: null,
            }}
            style={{
              borderRight: 'none',
              borderLeft: 'none',
              borderTop: 'none',
              borderBottom: 'none',
              backgroundColor: '#f0f3f7',
            }}
            append={appendStandard}
          />
        )
      }
    />
  )
}
