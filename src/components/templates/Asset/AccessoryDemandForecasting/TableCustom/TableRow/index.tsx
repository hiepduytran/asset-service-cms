import { CoreTable } from '@/components/organism/CoreTable'
import PageWithDetail from '@/components/organism/PageWithDetail'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Collapse, IconButton, TableCell, TableRow } from '@mui/material'
import { Fragment } from 'react'
import { useTableRow } from './useTableRow'
import { AccessoryDemandForecasting } from '@/service/asset/accessoryDemandForecasting/type'

export type Props = {
  row: AccessoryDemandForecasting
  index: number
}

const RowItem = (props: Props) => {
  const { row, index } = props

  const id = row?.maintenanceProduct?.id
  const maintenanceIds = row?.maintenanceIds

  const [values, handles] = useTableRow({ id, maintenanceIds })
  const { columns, open, tableData, isLoadingChild } = values
  const { handleOpen, t } = handles

  return (
    <Fragment>
      <TableRow
        sx={{
          backgroundColor: `${index % 2 === 1 ? '#F6F7F9' : ''}`,
        }}
      >
        <TableCell>{index + 1}</TableCell>
        <TableCell>{row?.maintenanceProduct?.code}</TableCell>
        <TableCell>{row?.maintenanceProduct?.name}</TableCell>
        <TableCell>{row?.type}</TableCell>
        <TableCell>{row?.available}</TableCell>
        <TableCell>
          {row?.requirement}
          <IconButton sx={{ padding: 0 }} onClick={(e) => handleOpen(e)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row?.needImport}</TableCell>
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
              tabName={`${t('text.detail_accessory')}`}
              isHeight
              className='mx-5'
            >
              <CoreTable
                data={tableData}
                columns={columns}
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
