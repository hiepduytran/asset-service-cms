import { useAppSelector } from '@/redux/hook'
import { memo } from 'react'
import { RED } from '@/helper/colors'

const CancelIcon = ({ className }: { className?: string }) => {
  const themeColor = useAppSelector((state) => state.themeColorData)

  const color = themeColor.errorColor ?? RED
  return (
    <div className={className}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 3.5L3.5 12.5" stroke="#FF4956" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12.5 12.5L3.5 3.5" stroke="#FF4956" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export default memo(CancelIcon)
