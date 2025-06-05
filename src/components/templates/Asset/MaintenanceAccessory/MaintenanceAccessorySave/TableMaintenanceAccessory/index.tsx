import { CoreTable } from '@/components/organism/CoreTable'
import React from 'react'
import { useTableMaintenanceAccessory } from './useTableMaintenanceAccessory'
import { Box, Typography } from '@mui/material'
import { BLUE } from '@/helper/colors'

type Props = {
  index: number
}

export default function TableMaintenanceAccessory({ index }: Props) {
  const { columns, dataTable, isView, appendMaintenancePart, t } =
    useTableMaintenanceAccessory({ index })
  return (
    <CoreTable
      tableName='asset'
      columns={columns}
      data={dataTable}
      isShowNoDataText={false}
      paginationHidden={true}
      actionTable={
        !isView ? (
          <Box className='flex items-center whitespace-nowrap'>
            <Typography
              sx={{
                padding: '15px 20px 15px 12px',
                color: BLUE,
                cursor: 'pointer',
              }}
              onClick={() => appendMaintenancePart({} as any)}
            >
              {`${t('text.add_accessory')}`}
            </Typography>
          </Box>
        ) : (
          <></>
        )
      }
    />
  )
}
