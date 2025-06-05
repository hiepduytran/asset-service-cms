import { IconButton, TableCell, TableRow, Typography } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import React from "react"
import { useRowItem } from "./useRowItem"
import { TableCellHeaderNoneBorder } from "../../.."
import { useFormContext } from "react-hook-form"
import CoreInput from "@/components/atoms/CoreInput"
import CoreAutoCompleteAPI from "@/components/atoms/CoreAutoCompleteAPI"
import { getListCountry } from "@/service/resource/countries"
import { getListPartner } from "@/service/resource/getPartner"
import { CoreDatePicker } from "@/components/atoms/CoreDatePicker"
import Image from "next/image"
import { PRIMARY } from "@/helper/colors"
import { REGEX } from "@/helper/regex"
import { getListProducer } from "@/service/product/getListProducer"

const RowItem = (props: any) => {
    const { control, watch } = useFormContext()
    const [values, handles] = useRowItem(props)
    const { fields, openStates } = values
    const { append, remove, t, handleOpen, handleAppend } = handles
    const { item1, index, index1, totalQuantity, quantityUnidentified, uomName, productId } = props
    return (
        <>
            <TableRow>
                <TableCellHeaderNoneBorder>
                    <IconButton sx={{ padding: 0 }} onClick={(e) => handleOpen(index1)}>
                        {openStates[index1] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCellHeaderNoneBorder>
                <TableCellHeaderNoneBorder colSpan={8}>
                    {item1?.code} ({item1?.quantity} {uomName})
                </TableCellHeaderNoneBorder>
            </TableRow>
            {
                openStates[index1] && (
                    fields.map((item2: any, index2: number) => {
                        return (
                            <TableRow key={item2.uniqueKey}>
                                <TableCell>{index2 + 1}</TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                    <CoreInput
                                        control={control}
                                        name={`pickIn.${index}.locationLot.${index1}.lot.${0}.asset.${index2}.code`}
                                        label=""
                                        placeholder={t('placeholder.serialAndIdentifierCode')}
                                        required
                                        rules={{
                                            required: t('common:validation.required'),
                                            pattern: {
                                                value: REGEX.CODE_NEW,
                                                message: t('common:validation.code_new'),
                                            },
                                        }}
                                        inputProps={{
                                            maxLength: 50,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <CoreAutoCompleteAPI
                                        control={control}
                                        name={`pickIn.${index}.locationLot.${index1}.lot.${0}.asset.${index2}.country`}
                                        label=""
                                        placeholder={t('placeholder.origin')}
                                        fetchDataFn={getListCountry}
                                    />
                                </TableCell>
                                <TableCell>
                                    <CoreAutoCompleteAPI
                                        control={control}
                                        name={`pickIn.${index}.locationLot.${index1}.lot.${0}.asset.${index2}.partner`}
                                        label=""
                                        placeholder={t('placeholder.manufacturer')}
                                        fetchDataFn={getListPartner}
                                    />
                                </TableCell>
                                <TableCell>
                                    <CoreAutoCompleteAPI
                                        control={control}
                                        name={`pickIn.${index}.locationLot.${index1}.lot.${0}.asset.${index2}.producer`}
                                        label=""
                                        placeholder={t('placeholder.supplier')}
                                        fetchDataFn={getListProducer}
                                        params={{
                                            productId: productId
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <CoreDatePicker
                                        control={control}
                                        name={`pickIn.${index}.locationLot.${index1}.lot.${0}.asset.${index2}.orderDate`}
                                        label=""
                                        placeholder='dd/mm/yyyy'
                                    />
                                </TableCell>
                                <TableCell>
                                    <CoreDatePicker
                                        control={control}
                                        name={`pickIn.${index}.locationLot.${index1}.lot.${0}.asset.${index2}.startDate`}
                                        label=""
                                        placeholder='dd/mm/yyyy'
                                        minDate={watch(`pickIn.${index}.locationLot.${index1}.lot.${0}.asset.${index2}.orderDate`)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => {
                                            remove(index2)
                                        }}>
                                        <Image
                                            src={require('@/assets/svg/action/delete.svg')}
                                            alt='delete'
                                            width={16}
                                            height={16}
                                        />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })
                )
            }
            <TableRow>
                <TableCell colSpan={9}>
                    <div className='flex items-center gap-10 h-15 px-2'>
                        <Typography
                            variant='body1'
                            style={{
                                color: PRIMARY,
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                !openStates[index1] && handleOpen(index1)
                                totalQuantity < quantityUnidentified && handleAppend()
                            }}
                        >
                            {t('addSerialAndIdentifierCode')}
                        </Typography>
                    </div>
                </TableCell>
            </TableRow>
        </>
    )
}
export default RowItem
