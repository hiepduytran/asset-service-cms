import MinusIcon from '@/assets/svg/minus.svg'
import PlusIcon from '@/assets/svg/plusCircle.svg'
import { IconButton } from '@mui/material'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  totalItem: number
  index: number
  handleRemoveItem: () => void
  handleAddItem: () => void
  disabledDeleteButton?: boolean
  className?: string
  disabledAddButton?: boolean
}

const DynamicAction = (props: Props) => {
  const {
    totalItem,
    index,
    handleRemoveItem,
    handleAddItem,
    disabledDeleteButton,
    className,
    disabledAddButton,
  } = props

  const router = useRouter()
  const { actionType } = router.query
  const isView = actionType === 'VIEW'

  return (
    <div className={clsx('flex items-center mx-4 w-24', className)}>
      {disabledAddButton || isView ? null : (
        <IconButton
          color='primary'
          size='small'
          onClick={handleAddItem}
          disabled={disabledAddButton}
        >
          <Image width={20} height={20} src={PlusIcon} alt='' />
        </IconButton>
      )}
      {disabledDeleteButton || (totalItem === 1 && index === 0) || isView ? null : (
        <IconButton
          color='secondary'
          onClick={handleRemoveItem}
          disabled={disabledDeleteButton || (totalItem === 1 && index === 0)}
        >
          <Image width={20} height={20} src={MinusIcon} alt='' />
        </IconButton>
      )}
    </div>
  )
}

export default React.memo(DynamicAction)
