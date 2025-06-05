import React from 'react'
import { CoreTable } from '@/components/organism/CoreTable'
import { useTableStep3 } from './useTableStep3'
import { Box } from '@mui/material'

export default function TableStep3(props: {
    index: number,
    isView: boolean,
}) {
    const [values, handles] = useTableStep3(props)
    const { columnsTableStep3, dataTableStep3 } = values
    return (
        <Box className='mb-30'>
            <CoreTable
                columns={columnsTableStep3}
                data={dataTableStep3}
                isShowColumnStt
                paginationHidden
            />
        </Box>
    )
}
