import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import EmptyIcon from '@/components/icons/EmptyIcon'
import PlusIcon from '@/components/icons/PlusIcon'
import { layoutType } from '@/components/layouts/MultipleLayouts/layoutTypeRecoil'
import CoreLoading from '@/components/molecules/CoreLoading'
import { BACK_GROUND, WHITE } from '@/helper/colors'
import { useAppSelector } from '@/redux/hook'
import styled from '@emotion/styled'
import {
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { ReactElement, ReactNode } from 'react'
import { useRecoilValue } from 'recoil'
import { DialogTable } from './DialogTable'
import styles from './styles.module.css'
import CoreTablePagination from '@/components/organism/CoreTablePagination'
import { useDate } from '@/components/hooks/date/useDate'

export type ColumnProps = {
  header: ReactNode | string
  fieldName: string
  render?: (val: any, index: number) => ReactNode
  styleCell?: TableCellProps
}

export type PaginationTableProps = {
  page?: number
  size?: number
}

export type CoreTableProps = {
  refTableContainer?: any
  tableName?: string
  className?: string
  data: Record<string, any>[]
  columns: ColumnProps[]
  page?: number
  size?: number
  totalPages?: number
  paginationHidden?: boolean
  isLoading?: boolean
  isShowColumnStt?: boolean
  stickyHeader?: boolean
  maxHeight?: number
  isShowNoDataText?: boolean
  actionTable?: null | ReactElement
  onChangePageSize?: (val: PaginationTableProps) => void
  onReturnValueRow?: (val: any) => any
}

export const TableCellWithBorderRight = styled(TableCell)(() => ({
  borderRight: '1px solid #DFE0EB',
}))

export const TableHeadCommon = styled(TableHead)(
  ({ layout = 'Layout1' }: { layout?: 'Layout1' | 'Layout2' }) => ({
    backgroundColor: layout === 'Layout1' ? BACK_GROUND : WHITE,
    ...(layout === 'Layout1' ? {} : { borderBottom: '2px solid #A7A7A7' }),
  })
)

export const TableContainerCommon = styled(TableContainer)(
  ({ layout = 'Layout1' }: { layout?: 'Layout1' | 'Layout2' }) => ({
    boxShadow: 'none!important',
    borderRadius: layout === 'Layout1' ? '4px 4px 0px 0px' : '10px',
    ...(layout === 'Layout1' ? { border: '1px solid #DFE0EB' } : {}),
  })
)

export const CoreTableSelect = ({
  refTableContainer,
  className,
  tableName,
  data,
  columns,
  page = 0,
  size = 20,
  totalPages,
  paginationHidden,
  isLoading,
  isShowColumnStt = false,
  maxHeight,
  isShowNoDataText = true,
  actionTable,
  stickyHeader = false,
  onChangePageSize,
  onReturnValueRow,
}: CoreTableProps) => {
  const { t } = useTranslation('common')
  const { showDialog } = useDialog()
  const layout = useRecoilValue(layoutType)
  const { convertToDate, checkDateValid } = useDate()
  const dataColumn = isShowColumnStt
    ? [
      {
        header: t('table.no') ?? 'No',
        fieldName: 'index',
      },
      ...columns,
    ]
    : columns

  if (isShowColumnStt) {
    data = data.map((item: any, index: number) => {
      const noNumber = page * size + index + 1
      return {
        ...item,
        index: noNumber > 9 ? noNumber : `0${noNumber}`,
      }
    })
  }

  const listTableCache = useAppSelector((state) => state.tableConfigData)
  const tableCurrent = listTableCache.find(
    (item) => item.tableName === tableName
  )
  const columnsChecked = tableCurrent
    ? tableCurrent.columns.map((item) =>
      dataColumn.find((ele) => ele.fieldName === item)
    )
    : dataColumn
  return (
    <div
      className={className}
      style={{
        position: 'relative',
      }}
    >
      {tableName && (
        <div className='absolute right-5 top-5'>
          <PlusIcon
            onClick={() =>
              showDialog(
                <DialogTable
                  columns={dataColumn}
                  columnsChecked={columnsChecked}
                  tableName={tableName}
                />
              )
            }
          />
        </div>
      )}

      <TableContainerCommon
        ref={refTableContainer}
        layout={layout}
        style={{
          maxHeight: `${maxHeight}px`,
        }}
      >
        <Table
          aria-label='sticky table'
          stickyHeader={stickyHeader}
          sx={{ width: 650 }}
        >
          <TableHeadCommon layout={layout}>
            <TableRow>
              {_.map(columnsChecked, (column, index) => (
                <TableCell
                  variant='head'
                  key={'key' + index}
                  {...(column?.styleCell ?? {})}
                  style={{
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    minWidth: index !== 0 ? 200 : 60,
                    fontWeight: 600,
                    backgroundColor: '#f0f3f7',
                    ...column?.styleCell?.style,
                  }}
                >
                  {column?.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeadCommon>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columnsChecked.length} variant='body'>
                  <div className='flex justify-center min-h-[60px]'>
                    <CoreLoading />
                  </div>
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              isShowNoDataText ? (
                <TableRow>
                  <TableCell
                    colSpan={columnsChecked.length}
                    variant='body'
                    align='center'
                    className='py-8'
                  >
                    <div className='flex justify-center min-h-[60px] flex-col'>
                      <EmptyIcon />

                      <Typography variant='body2'>
                        {t('table.no_data')}
                      </Typography>
                    </div>
                  </TableCell>
                </TableRow>
              ) : null
            ) : (
              _.map(data, (row: any, index) => (
                <TableRow
                  data-type={index % 2 === 1}
                  key={row?.key || row?.id || index}
                  className={styles.tableRow}
                  onClick={() => {
                    if (onReturnValueRow) onReturnValueRow(row)
                  }}
                >
                  {_.map(columnsChecked, (column, indexColumn) => {
                    const val = _.get(row, column?.fieldName ?? '')
                    return (
                      <TableCell
                        key={indexColumn}
                        style={{
                          borderBottom:
                            index !== data.length - 1
                              ? '1px solid rgba(224, 224, 224, 1)'
                              : '',
                        }}
                      >
                        {column?.fieldName && !column?.render && (
                          <>
                            {_.isNumber(val) ? (
                              <CurrencyFormatCustom amount={val} />
                            ) : checkDateValid(val) ? (
                              convertToDate(val)
                            ) : (
                              val
                            )}
                          </>
                        )}
                        {column?.render && column.render(row, index)}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            )}

            {actionTable && actionTable}
          </TableBody>
        </Table>
      </TableContainerCommon>
      {!paginationHidden && (
        <div className='py-5'>
          <CoreTablePagination
            size={size ?? 1}
            page={page ?? 1}
            totalPages={totalPages ?? 1}
            onChangePagination={(val: any) =>
              onChangePageSize && onChangePageSize(val)
            }
          />
        </div>
      )}
    </div>
  )
}
