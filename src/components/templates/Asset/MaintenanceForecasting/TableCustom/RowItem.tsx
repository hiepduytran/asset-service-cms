import { CoreTable } from '@/components/organism/CoreTable'
import PageWithDetail from '@/components/organism/PageWithDetail'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
  Checkbox,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import { Fragment } from 'react'
import { useTableCustom } from './useTableCustom'
import { MaintenanceForecasting } from '@/service/asset/maintenanceForecasting/type'

export type Props = {
  row: MaintenanceForecasting
  index: number
  setForecastingCheckedTable: any
  forecastingCheckedTable: any
}

const RowItem = (props: Props) => {
  const { row, index, setForecastingCheckedTable, forecastingCheckedTable } =
    props

  const [values, handles] = useTableCustom()
  const { childTableColumns, open, childTableData, isLoadingChild } = values
  const { handleOpenRow, t } = handles

  const colorText = (text: string) => {
    if (text === 'NOT_PLANED') {
      return <Typography color={'#F58020'}>Chưa lập kế hoạch</Typography>
    } else if (text === 'PLANED') {
      return <Typography color={'#00CC6A'}>Đã lập kế hoạch</Typography>
    } else {
      return null
    }
  }

  return (
    <Fragment>
      <TableRow
        sx={{
          backgroundColor: `${index % 2 === 1 ? '#F6F7F9' : ''}`,
        }}
      >
        <TableCell>
          {row?.status !== 'NOT_PLANED' ? (
            ''
          ) : (
            <Checkbox
              size='small'
              checked={
                !!forecastingCheckedTable?.find((x: any) => x?.id === row?.id)
              }
              onChange={(e, checked) => {
                setForecastingCheckedTable((prev: any) => {
                  if (checked) {
                    return [...prev, row]
                  }
                  return prev.filter((x: any) => x?.id !== row?.id)
                })
              }}
              onDoubleClick={(e) => e.stopPropagation()}
            />
          )}
        </TableCell>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{row?.identity}</TableCell>
        <TableCell>{row?.asset.name}</TableCell>
        <TableCell>{row?.department}</TableCell>
        <TableCell>
          Last: {row?.lastMaintenanceDate}
          <br />
          Next: {row?.nextMaintenanceDate}
        </TableCell>
        <TableCell>
          {row?.quantity}
          <IconButton
            sx={{ padding: 0 }}
            onClick={(e) => handleOpenRow(row?.id, e)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{colorText(row?.status)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            padding: `${open ? 10 : 0}px 0px ${open ? 10 : 0}px 0px`,
          }}
          colSpan={8}
        >
          <Collapse in={open}>
            <PageWithDetail
              tabName={'Chi tiết phụ tùng'}
              isHeight
              className='mx-5'
            >
              <CoreTable
                data={childTableData}
                columns={childTableColumns}
                paginationHidden
                isShowColumnStt
                isLoading={isLoadingChild}
              />
            </PageWithDetail>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default RowItem
