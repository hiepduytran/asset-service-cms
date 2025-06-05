import PageWithDetail from '@/components/organism/PageWithDetail'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Collapse, IconButton, TableCell, TableRow } from '@mui/material'
import { Fragment } from 'react'
import { useTableRow } from './useTableRow'
import { MaintenanceAccessory } from '@/service/asset/maintenanceAccessory/getList/type'
import TableMaintenanceAccessoryList from './TableMaintenanceAccessoryList'

export type Props = {
  row: MaintenanceAccessory
  index: number
  onRowClick?: (id: number, row?: any) => void
}

const RowItem = (props: Props) => {
  const { row, index, onRowClick } = props

  const id = row.id

  const [values, handles] = useTableRow({ id })
  const { open, tableData } = values
  const { handleOpen, t } = handles

  return (
    <Fragment>
      <TableRow
        onDoubleClick={() => {
          onRowClick && onRowClick(row?.id, row)
        }}
        sx={{
          ':hover': {
            backgroundColor: onRowClick ? '#caecfa' : '',
            cursor: onRowClick ? 'pointer' : undefined,
          },
          backgroundColor: `${index % 2 === 1 ? '#F6F7F9' : ''}`,
        }}
      >
        <TableCell>{index + 1}</TableCell>
        <TableCell>{row?.sku}</TableCell>
        <TableCell>{row?.name}</TableCell>
        <TableCell>
          {row?.itemQuantity}
          <IconButton sx={{ padding: 0 }} onClick={(e) => handleOpen(e)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            padding: `${open ? 10 : 0}px 0px ${open ? 10 : 0}px 0px`,
          }}
          colSpan={5}
        >
          <Collapse in={open}>
            <PageWithDetail
              tabName={
                t('table.accessoryDetail') ?? `${t('text.detail_accessory')}`
              }
              isHeight
              className='mx-5'
            >
              <TableMaintenanceAccessoryList
                data={tableData}
                t={t}
                isLoading={false}
              />
            </PageWithDetail>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default RowItem
