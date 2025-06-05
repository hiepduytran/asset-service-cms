import { IconButton } from '@mui/material'
import { memo } from 'react'

const PrintIcon = ({
  onClick,
  actionColor,
}: {
  onClick?: () => void
  actionColor?: any
}) => {
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
          d='M3.99951 5V2.5H11.9995V5'
          stroke={`${actionColor ? actionColor['print'] : '#00CC6A'}`}
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M11.9995 9.5H3.99951V13.75H11.9995V9.5Z'
          stroke={`${actionColor ? actionColor['print'] : '#00CC6A'}`}
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M3.99951 11H1.74951V6C1.74951 5.44771 2.23454 5 2.83284 5H13.1662C13.7645 5 14.2495 5.44771 14.2495 6V11H11.9995'
          stroke={`${actionColor ? actionColor['print'] : '#00CC6A'}`}
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M11.75 8C12.1642 8 12.5 7.66421 12.5 7.25C12.5 6.83579 12.1642 6.5 11.75 6.5C11.3358 6.5 11 6.83579 11 7.25C11 7.66421 11.3358 8 11.75 8Z'
          fill={`${actionColor ? actionColor['print'] : '#00CC6A'}`}
        />
      </svg>
    </IconButton>
  )
}

export default memo(PrintIcon)
