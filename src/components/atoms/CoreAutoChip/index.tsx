import { GRAY_SCALE, GREY } from '@/helper/colors'
import CloseIcon from '@mui/icons-material/Close'
import { Chip } from '@mui/material'
import React from 'react'
import { ChipProps } from '@mui/material/Chip/Chip'


export const CoreAutoChip = (props: ChipProps) => {
  return <Chip
    variant="outlined"
    deleteIcon={<CloseIcon sx={{ width: 16 }} />}
    style={{
      borderRadius: 4,
      height: 22,
      borderColor: GRAY_SCALE,
      color: GREY,
      marginTop: 0,
    }}
    classes={{
      label: 'p-2 pl-5',
    }}
    {...props}

  />
}
