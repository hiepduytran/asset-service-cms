import { IconButton } from '@mui/material'
import { memo } from 'react'

const PlusIcon = ({ onClick, color }: { onClick?: () => void, color?: string }) => {
  return (
    <IconButton onClick={onClick}>
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M2.5 8H13.5'
          stroke={color ?? '#00CC6A'}
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M8 2.5V13.5'
          stroke={color ?? '#00CC6A'}
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </IconButton>
  )
}

export default memo(PlusIcon)
