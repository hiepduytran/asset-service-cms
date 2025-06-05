import { Grid, Typography } from '@mui/material'
import React from 'react'
import { useStep4 } from './useStep4'
import { CoreTable } from '@/components/organism/CoreTable'

export default function StepFour() {
  const [values, handles] = useStep4()
  const { columns,
    dataConsumable,
    dataReplacementMaterial } = values
  const { t } = handles
  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography
          sx={{
            fontWeight: 'bold',
            marginY: '20px',
            fontSize: '14px'
          }}
        >
          {t('consumableParts')}
        </Typography>
        <CoreTable
          columns={columns}
          data={dataConsumable}
          paginationHidden
          isShowColumnStt
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography
          sx={{
            fontWeight: 'bold',
            marginY: '20px',
            fontSize: '14px'
          }}
        >
          {t('replacementParts')}
        </Typography>
        <CoreTable
          columns={columns}
          data={dataReplacementMaterial}
          paginationHidden
          isShowColumnStt
        />
      </Grid>
    </Grid>
  )
}
