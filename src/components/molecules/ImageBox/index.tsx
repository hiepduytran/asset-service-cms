import { CoreImage } from '@/components/atoms/CoreImage'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { memo } from 'react'
import { Box } from '@mui/material'

interface Props {
  url: string
  className?: string
  removeImage: () => void
  isViewProp?: boolean
}

const ImageBox = (props: Props) => {
  const router = useRouter()
  const { url, className, isViewProp, removeImage } = props
  const { actionType } = router.query

  const isView = isViewProp ?? actionType === 'VIEW'

  return (
    <div className={className}>
      {!isView && (
        <Box
          className='absolute cursor-pointer top-2 right-2'
          onClick={removeImage}
        >
          <Image
            alt='remove'
            width={16}
            height={16}
            src={require('@/assets/svg/iconRemove.svg')}
          />
        </Box>
      )}

      {url && <CoreImage src={url} alt='img' width={80} height={80} />}
    </div>
  )
}

export default memo(ImageBox)
