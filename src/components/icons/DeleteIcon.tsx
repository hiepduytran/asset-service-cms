import { IconButton } from '@mui/material'
import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const DeleteIcon = (props: any) => {
  const { handleDeleteRow, confirmDeleteMsg } = props
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { t } = useTranslation()

  const handleOk = async () => {
    setLoading(true)
    await handleDeleteRow()
    setOpen(false)
    setLoading(false)
  }

  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(true)
        }}
      >
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='cursor-pointer'
        >
          <path
            d='M13.4998 3.5L2.49976 3.50001'
            stroke='#FF3B30'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M6.5 6.5V10.5'
            stroke='#FF3B30'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M9.5 6.5V10.5'
            stroke='#FF3B30'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M5.5 1.5H10.5'
            stroke='#FF3B30'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12.4998 3.5V13C12.4998 13.1326 12.4471 13.2598 12.3533 13.3536C12.2595 13.4473 12.1324 13.5 11.9998 13.5H3.99976C3.86715 13.5 3.73997 13.4473 3.6462 13.3536C3.55243 13.2598 3.49976 13.1326 3.49976 13V3.5'
            stroke='#FF3B30'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </IconButton>
    </>
  )
}

export default memo(DeleteIcon)
