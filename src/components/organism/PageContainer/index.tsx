import { layoutType } from '@/components/layouts/MultipleLayouts/layoutTypeRecoil'
import { WHITE } from '@/helper/colors'
import { Box } from '@mui/material'
import { ReactNode } from 'react'
import { useRecoilValue } from 'recoil'

const PageContainer = ({
  title,
  children,
}: {
  title?: ReactNode
  children: ReactNode
}) => {
  return (
    <Box className='w-full h-full'>
      {title && title}

      <Box
        sx={{
          backgroundColor: WHITE,
          minHeight: title ? `calc( 100vh - 145px)` : `calc( 100vh - 116px)`,
        }}
      >
        <Box>{children}</Box>
      </Box>
    </Box>
  )
}

export default PageContainer
