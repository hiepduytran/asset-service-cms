import { useDialog } from '@/components/hooks/dialog/useDialog'
import EmptyIcon from '@/components/icons/EmptyIcon'
import PlusIcon from '@/components/icons/PlusIcon'
import { layoutType } from '@/components/layouts/MultipleLayouts/layoutTypeRecoil'
import CoreLoading from '@/components/molecules/CoreLoading'
import { BACK_GROUND, WHITE } from '@/helper/colors'
import { useAppSelector } from '@/redux/hook'
import styled from '@emotion/styled'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
  Collapse,
  IconButton,
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
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { CoreTable } from '../CoreTable'
import CoreTablePagination from '../CoreTablePagination'
import PageWithDetail from '../PageWithDetail'
import { DialogTable } from './DialogTable'
import styles from './styles.module.css'

export type ColumnProps = {
  header: ReactNode
  fieldName: string
  render?: (val: any, index: number) => ReactNode
  styleCell?: TableCellProps
}

type PaginationTableProps = {
  page?: number
  size?: number
}

type Props = {
  tableName?: string
  tableNameChild?: string
  className?: string
  data: Record<string, any>[]
  dataChild: Record<string, any>[]
  columns: ColumnProps[]
  columnsChild: ColumnProps[]
  page?: number
  size?: number
  totalPages?: number
  paginationHidden?: boolean
  isLoading?: boolean
  isLoadingChild?: any
  isShowColumnStt?: boolean
  maxHeight?: number
  isShowNoDataText?: boolean
  actionTable?: null | ReactElement
  onChangePageSize?: (val: PaginationTableProps) => void
  onRowClick?: (id: number, row?: any) => void
  onRowClickChild?: (idChild: number, row?: any) => void
  onReturnValueRow?: (val: any) => any
  stickyHeader?: boolean
  isShowDropdown?: boolean
  tabName: string
  handleFetchDataChild?: any
  paramKeys?: string[]
  objectShowDropdown?: {
    header: string
    fieldName: string
  }
  children?: ReactNode
}

export const TableHeadCommon = styled(TableHead)(
  ({ layout }: { layout: 'Layout1' | 'Layout2' }) => ({
    backgroundColor: layout === 'Layout1' ? BACK_GROUND : WHITE,
    ...(layout === 'Layout1' ? {} : { borderBottom: '2px solid #A7A7A7' }),
  })
)

export const TableContainerCommon = styled(TableContainer)(
  ({ layout }: { layout: 'Layout1' | 'Layout2' }) => ({
    boxShadow: 'none!important',
    borderRadius: layout === 'Layout1' ? '4px 4px 0px 0px' : '10px',
    ...(layout === 'Layout1' ? { border: '1px solid #DFE0EB' } : {}),
  })
)

export const TableWithDropdown = ({
  className,
  tableName,
  tableNameChild,
  data,
  dataChild,
  columns,
  columnsChild,
  page = 0,
  size = 20,
  totalPages,
  paginationHidden,
  isLoading,
  isLoadingChild,
  isShowColumnStt = false,
  maxHeight,
  isShowNoDataText = true,
  actionTable,
  onChangePageSize,
  onRowClick,
  onRowClickChild,
  onReturnValueRow,
  stickyHeader = false,
  isShowDropdown = true,
  tabName = 'Chi tiết',
  handleFetchDataChild,
  paramKeys = ['id'],
  objectShowDropdown,
  children,
}: Props) => {
  const { t } = useTranslation('common')
  const { showDialog } = useDialog()
  const layout = useRecoilValue(layoutType)

  const [openStates, setOpenStates] = useState<boolean[]>(
    Array(data.length).fill(false)
  )

  const handleOpen = (index: number) => {
    setOpenStates((prevOpenStates) => {
      let newOpenStates = prevOpenStates.map(() => false)

      if (!prevOpenStates[index]) {
        const params = [...paramKeys].map((key) => data[index][key])
        handleFetchDataChild(...params)
        newOpenStates[index] = true
      }

      return newOpenStates
    })
  }

  useEffect(() => {
    setOpenStates([])
  }, [data.length])

  const dataColumn = isShowColumnStt
    ? objectShowDropdown
      ? [
          {
            header: t('table.no') ?? 'No',
            fieldName: 'index',
            styleCell: {
              style: {
                width: '100px',
              },
            },
          },
          ...columns,
        ]
      : [
          {
            header: '',
            fieldName: 'dropdown',
          },
          {
            header: t('table.no') ?? 'No',
            fieldName: 'index',
          },
          ...columns,
        ]
    : columns

  if (objectShowDropdown) {
    data = data.map((item: any, index: number) => {
      return {
        ...item,
        [objectShowDropdown.fieldName]: (
          <div className='flex gap-2 items-center'>
            <Typography>{item[objectShowDropdown?.fieldName]}</Typography>
            <IconButton
              sx={{
                padding: 0,
              }}
              onClick={(e) => {
                handleOpen(index)
              }}
            >
              {openStates[index] ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </div>
        ),
      }
    })
  }

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
      <TableContainerCommon
        layout={layout}
        style={{
          maxHeight: `${maxHeight}px`,
        }}
      >
        <Table stickyHeader={stickyHeader} sx={{ minWidth: 650 }}>
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
                    minWidth: objectShowDropdown
                      ? index !== 0
                        ? 200
                        : 60
                      : index !== 0 && index !== 1
                      ? 200
                      : 40,
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
            ) : isShowDropdown ? (
              _.map(data, (row: any, index) => (
                <>
                  <TableRow
                    data-type={index % 2 === 1}
                    key={row?.key || row?.id || index}
                    onDoubleClick={() => {
                      if (onReturnValueRow) onReturnValueRow(row)
                      onRowClick && onRowClick(row?.id, row)
                    }}
                    className={styles.tableRow}
                  >
                    {_.map(columnsChecked, (column, indexColumn) => {
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
                            <>{_.get(row, column.fieldName)}</>
                          )}
                          {column?.render && column.render(row, index)}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        padding: `${openStates[index] ? 10 : 0}px 0px ${
                          openStates[index] ? 10 : 0
                        }px 0px`,
                      }}
                      colSpan={10}
                    >
                      <Collapse in={openStates[index]}>
                        <PageWithDetail
                          tabName={tabName}
                          isHeight
                          className='mx-5'
                        >
                          {isLoadingChild?.[data[index].id] ? (
                            <div className='flex justify-center'>
                              <CoreLoading />
                            </div>
                          ) : (
                            <>
                              {children}

                              <CoreTable
                                tableName={tableNameChild}
                                data={dataChild}
                                columns={columnsChild}
                                paginationHidden
                                onRowClick={
                                  onRowClickChild ? onRowClickChild : undefined
                                }
                                isShowColumnStt
                              />
                            </>
                          )}
                        </PageWithDetail>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))
            ) : (
              _.map(data, (row: any, index) => (
                <TableRow
                  data-type={index % 2 === 1}
                  key={row?.key || row?.id || index}
                  onDoubleClick={() => {
                    if (onReturnValueRow) onReturnValueRow(row)
                  }}
                  className={styles.tableRow}
                  onClick={() => {
                    onRowClick && onRowClick(row?.id, row)
                  }}
                >
                  {_.map(columnsChecked, (column, indexColumn) => {
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
                          <>{_.get(row, column.fieldName)}</>
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
