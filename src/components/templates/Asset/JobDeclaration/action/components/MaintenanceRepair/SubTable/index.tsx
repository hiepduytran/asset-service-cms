import CoreNavbar from '@/components/organism/CoreNavbar'
import { CoreTable } from '@/components/organism/CoreTable'
import { TableCell } from '@mui/material'
import useSubTableJobDeclarationMachineDetail from './useSubTableJobDeclarationMachineDetail'

type Props = {
  name: 'detailsWorkOverview' | 'detailsWorkRepair'
  index: number
  item: any
  setOpenNoData: (item: any) => void
}

const SubTableJobDeclarationMachineDetail = ({
  name,
  index,
  item,
  setOpenNoData,
}: Props) => {
  const [
    { methods, id, isView, isUpdate, tableData, columnsRepair },
    { t, append },
  ] = useSubTableJobDeclarationMachineDetail({
    name,
    index,
    item,
    setOpenNoData,
  })

  return (
    <CoreNavbar
      breadcrumbs={[
        {
          title: t('Chi tiết công việc'),
          content: (
            <CoreTable
              columns={columnsRepair}
              data={tableData}
              paginationHidden
              isShowColumnStt
              actionTable={
                isView ? (
                  <></>
                ) : (
                  <TableCell
                    colSpan={1}
                    sx={{
                      border: 'none',
                      width: '150px',
                    }}
                    onClick={() => {
                      append(null)
                    }}
                  >
                    <div className='flex text-[#0078D4] text-[13px] cursor-pointer select-none'>
                      Thêm công việc
                    </div>
                  </TableCell>
                )
              }
            />
          ),
        },
      ]}
      isFitContent
      styles={{
        marginTop: '15px',
        marginBottom: '15px',
      }}
      minWidthTab={180}
    />
  )
}

export default SubTableJobDeclarationMachineDetail
