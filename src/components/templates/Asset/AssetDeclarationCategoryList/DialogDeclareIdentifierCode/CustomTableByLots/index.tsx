import {
  TableContainerCommon,
  TableHeadCommon,
} from '@/components/organism/CoreTable'
import {
  Box,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import { TableCellHeaderNoneBorder } from '../..'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useCustomTableByLots } from './useCustomTableLots'
import React from 'react'
import CoreInput from '@/components/atoms/CoreInput'
import { useFormContext } from 'react-hook-form'
import Image from 'next/image'
import { GREEN } from '@/helper/colors'
import { useDialog2 } from '@/components/hooks/dialog/useDialog'
import { DialogAddNew } from './DialogAddNew'
import NotePencil from '@/assets/svg/NotePencil.svg'

const CustomTableByLots = (props: any) => {
  const [values, handles] = useCustomTableByLots(props)
  const { openStates, totalIdentifiedQuantity } = values
  const { handleOpen, t } = handles
  const { index, quantityUnidentified, isLoadingSerialLot, productId, productCategory, uomName, uomId, sku } = props
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useFormContext()
  const { showDialog2 } = useDialog2()
  const isErrorsEmpty = Object.keys(errors).length === 0

  return (
    <div className='p-20 py-10'>
      <TableContainerCommon layout='Layout1'>
        <Table>
          <TableHeadCommon layout='Layout1'>
            <TableRow>
              <TableCellHeaderNoneBorder style={{ width: '50px' }}>
                STT
              </TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder>
                {t('table.location')}
              </TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder>
                {t('table.lot')}
              </TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder>
                {t('table.quantity')}
              </TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder>
                {t('table.identifiedQuantity')}
              </TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder></TableCellHeaderNoneBorder>
            </TableRow>
          </TableHeadCommon>
          <TableBody>
            {watch(`pickIn.${index}.locationLot`)?.map(
              (item1: any, index1: number) => (
                <React.Fragment key={index1}>
                  <TableRow>
                    <TableCellHeaderNoneBorder>
                      <IconButton
                        sx={{ padding: 0 }}
                        onClick={(e) => handleOpen(index1)}
                      >
                        {openStates[index1] ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCellHeaderNoneBorder>
                    <TableCellHeaderNoneBorder colSpan={5}>
                      {item1?.code} ({item1?.quantity} {uomName})
                    </TableCellHeaderNoneBorder>
                  </TableRow>
                  {openStates[index1] &&
                    item1?.lot?.map((item2: any, index2: number) => (
                      <TableRow key={index2}>
                        <TableCell>{index2 + 1}</TableCell>
                        <TableCell></TableCell>
                        <TableCell>{item2?.code}</TableCell>
                        <TableCell>{item2?.quantity} {uomName}</TableCell>
                        <TableCell>
                          <CoreInput
                            control={control}
                            name={`pickIn.${index}.locationLot.${index1}.lot.${index2}.identifiedQuantity`}
                            placeholder={t('placeholder.quantityIdentified')}
                            type='number'
                            required
                            rules={{
                              required: t('common:validation.required'),
                              validate: {
                                isValidQuantity: (v: number) =>
                                  totalIdentifiedQuantity <= quantityUnidentified || t('validation.cannotExceedUndeclaredQuantity'),
                              },
                            }}
                            disableDecimal
                            disableNegative
                            disableZero
                            className='w-60'
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  <Typography className='text-[#242424]'>
                                    {uomName}
                                  </Typography>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box
                            className='flex items-center gap-2'
                            onClick={() => {
                              isErrorsEmpty && (
                                showDialog2(
                                  <DialogAddNew
                                    control={control}
                                    setValue={setValue}
                                    watch={watch}
                                    handleSubmit={handleSubmit}
                                    index={index}
                                    index1={index1}
                                    index2={index2}
                                    quantityUnidentified={quantityUnidentified}
                                    quantityIdentified={watch(
                                      `pickIn.${index}.locationLot.${index1}.lot.${index2}.identifiedQuantity`
                                    )}
                                    productId={productId}
                                    productCategory={productCategory}
                                    uomName={uomName}
                                    uomId={uomId}
                                    sku={sku}
                                  />
                                )
                              )
                            }}
                          >
                            {
                              !watch(`pickIn.${index}.locationLot.${index1}.lot.${index2}.isSubmit`) ? (
                                <>
                                  <Image
                                    src={require('@/assets/svg/action/add.svg')}
                                    alt='plus'
                                    width={16}
                                    height={16}
                                  />
                                  <Typography
                                    sx={{
                                      color: GREEN,
                                      cursor: 'pointer',
                                      marginY: '5px',
                                    }}
                                  >
                                    {t('addSerialAndIdentifierCode')}
                                  </Typography>
                                </>
                              ) : (
                                <Image
                                  alt=''
                                  src={NotePencil}
                                  height={20}
                                  width={20}
                                  style={{ cursor: 'pointer' }}
                                />
                              )
                            }
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                </React.Fragment>
              )
            )}
          </TableBody>
        </Table>
      </TableContainerCommon>
    </div>
  )
}
export default CustomTableByLots
