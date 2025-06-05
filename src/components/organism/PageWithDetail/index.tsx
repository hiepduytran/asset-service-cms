import { PRIMARY } from '@/helper/colors'
import { Typography } from '@mui/material'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

const PageWithDetail = ({
  title,
  children,
  tabName,
  topAction,
  paddingContent,
  className,
  isHeight,
}: {
  title?: ReactNode
  children: ReactNode
  tabName?: string
  topAction?: ReactNode
  paddingContent?: number
  className?: string
  isHeight?: boolean
}) => {
  const router = useRouter()
  const { actionType } = router.query
  const isView = actionType === 'VIEW'
  return (
    <div className={clsx('overflow-auto', className)}>
      {title}

      <div className='flex flex-col'>
        <div
          id='tab'
          className='w-full h-18'
          style={{
            display: 'flex',
            justifyContent: isView ? 'space-between' : 'start',
            borderBottom: '2px solid #0078D4',
          }}
        >
          <div
            style={{
              backgroundColor: PRIMARY,
              borderRadius: '4px 4px 0px 0px',
              padding: '10px 20px 10px 20px',
              color: 'white',
            }}
          >
            <Typography>{tabName ?? 'Chi tiết'} </Typography>
          </div>
          {topAction && topAction}
        </div>
        <div
          style={{
            boxShadow: '0px 0px 8px 0px #0000000D',
            minHeight: title
              ? `calc( 100vh - 185px)`
              : isHeight
              ? 0
              : `calc( 100vh - 116px)`,
            border: '1px solid #DFE0EB',
            padding: `${paddingContent ?? 32}px`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default PageWithDetail
