import {
  TableContainerCommon,
  TableHeadCommon,
} from '@/components/organism/CoreTable'
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
import SubTableJobDeclarationMachineDetail from '../SubTable'
import useTableJobDeclaration from './useTableJobDeclaration'
import EmptyIcon from '@/components/icons/EmptyIcon'

export type Props = {
  title: string
  name: 'detailsWorkOverview' | 'detailsWorkRepair'
}
export default function TableJobDeclarationMachineDetail({
  title,
  name,
}: Props) {
  const [
    { methods, id, isUpdate, isView, tableData, open },
    { t, append, setOpen, setOpenNoData },
  ] = useTableJobDeclaration({
    name,
  })

  const { getValues, watch } = methods

  return (
    <div>
      <Typography sx={{ margin: '20px 0', fontWeight: 600 }}>
        {title}
      </Typography>
      <TableContainerCommon>
        <Table aria-label='collapsible table'>
          <TableHeadCommon>
            <TableRow>
              <TableCell
                sx={{ fontWeight: 600, width: isView ? '190px' : '200px' }}
              >
                STT
              </TableCell>
              <TableCell sx={{ fontWeight: 600, width: '650px' }} align='left'>
                <div className='flex items-center gap-2'>
                  <Typography
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    Chi tiết máy
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: '#FF4956',
                    }}
                  >
                    *
                  </Typography>
                </div>
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, width: isView ? '650px' : '400px' }}
                align='left'
              >
                <div className='flex items-center gap-2'>
                  <Typography
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    Công việc cần làm
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: '#FF4956',
                    }}
                  >
                    *
                  </Typography>
                </div>
              </TableCell>
              {!isView && <TableCell sx={{ fontWeight: 600 }} align='left' />}
            </TableRow>
          </TableHeadCommon>
          <TableBody>
            {tableData.length > 0 ? (
              tableData?.map((item, index) => {
                return (
                  <>
                    <TableRow
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
                        '&:hover': { backgroundColor: '#b2e4f9' },
                      }}
                      key={item.key}
                    >
                      <TableCell>
                        {index > 8 ? index + 1 : `0${index + 1}`}
                      </TableCell>
                      <TableCell>{item.product}</TableCell>
                      <TableCell align='left'>
                        <div className='flex items-center'>
                          {(watch(`${name}.${index}.repairWorkDetails`) ?? [])
                            .length > 0 ? (
                            <>
                              <Typography>
                                {
                                  (
                                    watch(
                                      `${name}.${index}.repairWorkDetails`
                                    ) ?? []
                                  ).length
                                }
                              </Typography>
                              <IconButton
                                aria-label='expand row'
                                size='small'
                                onClick={() => {
                                  setOpen((prev) => {
                                    return { [item.key]: !prev[item.key] }
                                  })
                                }}
                              >
                                {open && open[item.key] ? (
                                  <KeyboardArrowUpIcon />
                                ) : (
                                  <KeyboardArrowDownIcon />
                                )}
                              </IconButton>
                            </>
                          ) : isView ? (
                            0
                          ) : (
                            item.repairWorkDetails
                          )}
                        </div>
                      </TableCell>
                      {!isView && (
                        <TableCell align='left'>
                          <div className='flex items-center'>{item.action}</div>
                        </TableCell>
                      )}
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                      >
                        <Collapse
                          in={open && open[item.key]}
                          timeout='auto'
                          unmountOnExit
                        >
                          <SubTableJobDeclarationMachineDetail
                            name={name}
                            index={index}
                            item={item}
                            setOpenNoData={setOpenNoData}
                          />
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                )
              })
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
          {isView ? (
            <></>
          ) : (
            <TableCell
              colSpan={2}
              sx={{
                border: 'none',
                width: '200px',
              }}
              onClick={() => {
                append(null)
              }}
            >
              <div className='flex text-[#0078D4] text-[13px] cursor-pointer select-none'>
                Thêm chi tiết máy
              </div>
            </TableCell>
          )}
        </Table>
      </TableContainerCommon>
    </div>
  )
}
