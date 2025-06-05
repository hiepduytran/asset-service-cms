import { MENU_URL } from '@/routes'
import { Dashboard } from '@mui/icons-material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, Breadcrumbs, IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { ParsedUrlQueryInput } from 'querystring'
import { ReactNode } from 'react'

interface CoreBreadcrumbsProps {
  className?: string
  breadcrumbs?: {
    title: ReactNode
    pathname?: string
    query?: string | ParsedUrlQueryInput | null
  }[]
  isShowDashboard?: boolean
}

export const CoreBreadcrumbs = (props: CoreBreadcrumbsProps) => {
  const { className, breadcrumbs, isShowDashboard = true } = props

  const router = useRouter()

  return (
    <Breadcrumbs
      className={className}
      separator={<KeyboardArrowRightIcon fontSize='small' />}
      classes={{
        root: 'bg-white h-30 flex item-center mb-0',
        separator: 'm-0',
      }}
    >
      {isShowDashboard && (
        <IconButton
          onClick={() => router.push({ pathname: MENU_URL.DASHBOARD })}
        >
          <Dashboard fontSize='small' />
        </IconButton>
      )}

      {breadcrumbs?.map((item, index) => (
        <Box
          key={typeof item.title === 'string' ? item.title : index}
          className='flex gap-2 items-center'
          style={{
            cursor: item.pathname ? 'pointer' : 'not-allowed',
          }}
          onClick={() => {
            if (item.pathname)
              router.push({ pathname: item.pathname, query: item.query })
          }}
        >
          {item.title}
        </Box>
      ))}
    </Breadcrumbs>
  )
}
