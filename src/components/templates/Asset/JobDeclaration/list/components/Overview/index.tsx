import { CoreTable } from '@/components/organism/CoreTable'
import useOverView from './useOverView'
type Props = {
  type: string
  id: number
}
export default function Overview(props: Props) {
  const [{ columns, tableData, isLoadingListJOverView }, { t }] =
    useOverView(props)
  return (
    <CoreTable
      columns={columns}
      data={tableData}
      paginationHidden
      isShowColumnStt
      isLoading={isLoadingListJOverView}
    />
  )
}
