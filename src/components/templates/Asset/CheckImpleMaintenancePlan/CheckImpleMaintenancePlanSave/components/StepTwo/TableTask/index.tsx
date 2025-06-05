import { CoreTable } from '@/components/organism/CoreTable'
import { useTableTask } from './useTableTask'

type Props = {
  index: number
}

export default function TableTask({ index }: Props) {
  const [{ columns, dataTable }, { t }] = useTableTask({
    index,
  })
  return (
    <CoreTable
      isShowColumnStt
      tableName='asset'
      columns={columns}
      data={dataTable}
      isShowNoDataText={false}
      paginationHidden={true}
    />
  )
}
