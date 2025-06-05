import { Typography } from '@mui/material'
import { ReactNode, useId, useState } from 'react'

type Props = {
  isFitContent?: boolean
  breadcrumbs: {
    title: string
    content: ReactNode
    rightAction?: ReactNode
    minWidthTabItem?: number
  }[]
  padding?: string
  styles?: any
  minWidthTab?: number
}

const CoreNavbar = (props: Props) => {
  const { breadcrumbs, isFitContent, padding, styles, minWidthTab } = props
  const [currentTab, setCurrentTab] = useState(0)
  const key = useId()

  return (
    <div
      style={{ marginTop: styles ? styles.marginTop : '0', ...styles }}
      className=''
    >
      <div className=' flex items-center h-[40px] w-full'>
        {breadcrumbs.map((item, index) => (
          <div key={key}>
            <Typography
              variant='body1'
              sx={{
                borderTopLeftRadius: '0.375rem',
                borderTopRightRadius: '0.375rem',
                justifyContent: 'center',
                padding: 1,
                minWidth: item.minWidthTabItem
                  ? item.minWidthTabItem
                  : minWidthTab ?? 100,
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                borderBottom: '3px solid #0078D4',
                cursor: currentTab == index ? 'not-allowed' : 'pointer',
                backgroundColor: currentTab == index ? '#0078D4' : undefined,
                color: currentTab == index ? 'white' : undefined,
              }}
              onClick={() => setCurrentTab(index)}
            >
              {item.title}
            </Typography>
          </div>
        ))}
        <div
          style={{
            borderBottom: '3px solid #0078D4',
            width: '100%',
            height: '40px',
            alignItems: 'revert',
          }}
        >
          <div className='right-10 mt-6 absolute'>
            {breadcrumbs[currentTab]?.rightAction}
          </div>
        </div>
      </div>
      <div
        style={{
          boxShadow: '0px 0px 8px 0px #0000000D',
          minHeight: isFitContent ? undefined : `calc( 100vh - 195px)`,
          border: '1px solid #DFE0EB',
          padding: padding || '32px',
        }}
      >
        {breadcrumbs[currentTab]?.content}
      </div>
    </div>
  )
}

export default CoreNavbar
