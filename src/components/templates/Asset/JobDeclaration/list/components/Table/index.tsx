import CoreLoading from '@/components/molecules/CoreLoading'
import {
  TableContainerCommon,
  TableHeadCommon,
} from '@/components/organism/CoreTable'
import CoreTablePagination from '@/components/organism/CoreTablePagination'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import SubTableJobDeclaration from '../SubTable'
import useTableJobDeclaration from './useTableJobDeclaration'
import { TableRowEmpty } from '@/components/organism/CoreTable/components/TableRowEmpty'
import EmptyIcon from '@/components/icons/EmptyIcon'
import { MENU_URL } from '@/routes'
import path from 'path'
type Props = {
  queryPage: any
  onChangePageSize: (input: any) => void
}
export default function TableJobDeclaration(props: Props) {
  const { onChangePageSize } = props
  const [
    {
      router,
      dataGetListJobDeclaration,
      pageObject: { page = 0, size = 10, totalPages },
      type,
      isLoadingGetListJobDeclaration,
    },
    { t, setType, changeJobDeclarationType },
  ] = useTableJobDeclaration(props)

  const [open, setOpen] = useState<{
    [id: number]: boolean
  }>({ 0: false })
  return (
    <>
      <TableContainerCommon>
        <Table aria-label='collapsible table'>
          <TableHeadCommon>
            <TableRow>
              <TableCell
                sx={{ fontWeight: 600, borderBottom: '0', width: '150px' }}
              >
                STT
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, borderBottom: '0', width: '350px' }}
                align='left'
              >
                SKU
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, borderBottom: '0', width: '450px' }}
                align='left'
              >
                Tên tài sản
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, borderBottom: '0', width: '450px' }}
                align='left'
              >
                Loại
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, borderBottom: '0', width: '150px' }}
                align='left'
              >
                Công việc
              </TableCell>
            </TableRow>
          </TableHeadCommon>
          <TableBody>
            {isLoadingGetListJobDeclaration ? (
              <TableCell
                sx={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}
                colSpan={5}
              >
                <CoreLoading />
              </TableCell>
            ) : dataGetListJobDeclaration.length > 0 ? (
              <React.Fragment>
                {dataGetListJobDeclaration.map((item, index) => {
                  return (
                    <>
                      <TableRow
                        sx={{
                          borderTop: '1px solid rgba(224, 224, 224, 1)',
                          borderBottom: `${
                            open[item.id]
                              ? '1px solid rgba(224, 224, 224, 1)'
                              : ''
                          }`,
                          cursor: 'pointer',
                        }}
                        key={item.id}
                        onDoubleClick={() => {
                          router.push({
                            pathname: `${MENU_URL.JOB_DECLARATION}/[id]`,
                            query: {
                              id: item.id,
                              actionType: 'VIEW',
                            },
                          })
                        }}
                      >
                        <TableCell sx={{ border: '0' }}>
                          {page * size + index + 1 > 9
                            ? page * size + index + 1
                            : `0${page * size + index + 1}`}
                        </TableCell>
                        <TableCell sx={{ border: '0' }}>
                          {item.product.code}
                        </TableCell>
                        <TableCell sx={{ border: '0' }} align='left'>
                          {item.product.name}
                        </TableCell>
                        <TableCell sx={{ border: '0' }} align='left'>
                          {changeJobDeclarationType(item.typeDeclaration)}
                        </TableCell>
                        <TableCell
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '0',
                          }}
                          align='left'
                        >
                          {item.work}
                          <IconButton
                            aria-label='expand row'
                            size='small'
                            onClick={() => {
                              setOpen({ [item.id]: !open[item.id] })
                              setType(item.typeDeclaration)
                            }}
                          >
                            {open[item.id] ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableCell
                        style={{
                          border: '0',
                          paddingBottom: 0,
                          paddingTop: 0,
                        }}
                        colSpan={6}
                      >
                        <Collapse
                          in={open[item.id]}
                          timeout='auto'
                          unmountOnExit
                        >
                          <SubTableJobDeclaration id={item.id} type={type} />
                        </Collapse>
                      </TableCell>
                    </>
                  )
                })}
              </React.Fragment>
            ) : (
              <TableRow sx={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                <TableCell
                  colSpan={5}
                  variant='body'
                  align='center'
                  className='py-8'
                >
                  <div className='flex justify-center min-h-[60px] flex-col'>
                    <EmptyIcon />
                    <Typography variant='body2'>
                      {t('common:table.no_data')}
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainerCommon>
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
    </>
  )
}
