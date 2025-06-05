import { CoreTable } from '@/components/organism/CoreTable'
import React from 'react'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import useTableCustomSelfMaintenanceForm from './useTableCustom'
type Props = {
  index: number
}
export default function TableCustomSelfMaintenanceForm(props: Props) {
  const { index } = props
  const [
    { methods, tableData, isView, isUpdate, columns },
    { t, appendStandardMaintenanceLines },
  ] = useTableCustomSelfMaintenanceForm(props)

  const { getValues } = methods

  return (
    <CoreTable
      tableName='standardMaintenanceLines'
      columns={columns}
      data={tableData}
      isShowColumnStt
      paginationHidden
      actionTable={
        isView ||
        getValues(`maintenanceCardLines.${index}.standardMaintenanceLines`)
          .length >=
          (getValues(
            `maintenanceCardLines.${index}.standardMaintenanceLinesLength`
          ) ?? 0) ? (
          <></>
        ) : (
          <ActionTable
            action={`${t('self_maintenance.standard_declare.add_maintenance')}`}
            columns={columns}
            defaultValueLine={{
              product: null,
              standardMethods: [],
              result: null,
              groupStaff: null,
              auditGroupStaffFirst: null,
              auditGroupStaffSecond: null,
              shifts: [],
              frequency: null,
              frequencyType: 'TIMES',
              note: null,
              isView: false,
            }}
            style={{
              borderRight: 'none',
              borderLeft: 'none',
              borderTop: 'none',
              borderBottom: 'none',
              backgroundColor: '#f0f3f7',
            }}
            append={appendStandardMaintenanceLines}
          />
        )
      }
    />
  )
}
