import { CoreTable } from '@/components/organism/CoreTable'
import useMachineDetail from './useMachineDetail'
import { TableWithDropdown } from '@/components/organism/TableWithDropdown'
type Props = {
  type: string
  id: number
}
export default function MachineDetail(props: Props) {
  const [
    {
      columns,
      tableData,
      isLoadingListRepair,
      columnsChild,
      tableDataChild,
      isLoadingChild,
    },
    { t, handleFetchDataChild },
  ] = useMachineDetail(props)
  return (
    <TableWithDropdown
      tableName='machineDetail'
      tableNameChild='machineDetailChild'
      columns={columns}
      data={tableData}
      isLoading={isLoadingListRepair}
      isShowColumnStt
      columnsChild={columnsChild}
      dataChild={tableDataChild}
      isLoadingChild={isLoadingChild}
      handleFetchDataChild={handleFetchDataChild}
      tabName={t('Nội dung công việc')}
      paginationHidden
      objectShowDropdown={{
        header: t('Công việc'),
        fieldName: 'work',
      }}
    />
  )
}
