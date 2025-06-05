import { CoreTable } from '@/components/organism/CoreTable'
import { TableCell, Typography } from '@mui/material'
import useTableMaintenanceWork from './useMaintenanceWork'
type Props = {
  title: string
  name:
    | 'maintenanceWorkOverview.maintenanceWorkDetails'
    | 'maintenanceWorkRepair.maintenanceWorkDetails'
}
export default function TableMaintenanceWork({ title, name }: Props) {
  const [
    { columnsOverview, tableData, methods, id, isUpdate, isView },
    { t, append },
  ] = useTableMaintenanceWork({ title, name })
  return (
    <div>
      <Typography sx={{ margin: '20px 0', fontWeight: 600 }}>
        {title}
      </Typography>
      <CoreTable
        tableName='incidentLogList'
        columns={columnsOverview}
        data={tableData}
        isShowColumnStt
        paginationHidden
        actionTable={
          isView ? (
            <></>
          ) : (
            <TableCell
              colSpan={2}
              sx={{
                border: 'none',
                width: '200px',
              }}
            >
              <div
                onClick={() => {
                  append(null)
                }}
                className='flex text-[#0078D4] text-[13px] cursor-pointer select-none'
              >
                Thêm công việc
              </div>
            </TableCell>
          )
        }
      />
    </div>
  )
}
