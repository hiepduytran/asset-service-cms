import { TableRow } from '@mui/material'
import _ from 'lodash'
import { Draggable } from 'react-beautiful-dnd'
import { ColumnProps, TableCellCommon } from '..'

type Props = {
  index: number
  id: string
  columns: ColumnProps[]
  row: any
}

export const TableRowCustom = (props: Props) => {
  const { index, id, row, columns } = props
  const colorRowTable =
    row.displayType === 'SECTION'
      ? '#DFE0EB'
      : row.type === 'NOTE'
      ? '#F6F7F9'
      : null

  return (
    <Draggable index={index} draggableId={id?.toString()}>
      {(provided, snapshot) => (
        <TableRow
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            backgroundColor: colorRowTable,
          }}
        >
          {_.map(columns, (column, indexColumn) => {
            return (
              <TableCellCommon key={indexColumn} {...column.styleCell}>
                {column?.fieldName && !column?.render && (
                  <>{_.get(row, column.fieldName)}</>
                )}
                {column?.render && column.render(row, index)}
              </TableCellCommon>
            )
          })}
        </TableRow>
      )}
    </Draggable>
  )
}
