import { CircularProgress, Typography } from '@mui/material'
import UploadIcon from '@/assets/svg/upload.svg'
import Image from 'next/image'
import React, { useRef } from 'react'
import useUploadImage from './useUploadImage'
import Link from 'next/link'
import { CoreImage } from '@/components/atoms/CoreImage'
type Prop = {
  index: number
}
export default function UploadImage(props: Readonly<Prop>) {
  const { index } = props
  const [{ methods, isLoading }, { handleFileUpload }] = useUploadImage(props)
  const refElement = useRef<HTMLInputElement>(null)
  const { getValues } = methods

  return (
    <div
      className='flex items-center gap-4'
      onClick={() => {
        if (refElement && refElement.current) refElement.current.click()
      }}
    >
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <div className='flex flex-col gap-2'>
          {getValues(`asset.${index}.imageUrls`)?.map((item: string) => (
            <Link key={item} href={item} target='_blank'>
              <CoreImage src={item} alt='Chi tiết ảnh' width={60} height={60} />
            </Link>
          ))}
        </div>
      )}
      <div className='flex items-center justify-left gap-4'>
        <Image src={UploadIcon} alt='' />
        <Typography color={'#0078D4'}>Upload File</Typography>
        <input
          className='hidden'
          type='file'
          accept='image/png, image/jpeg, image/jpg'
          onChange={handleFileUpload}
          multiple
          ref={refElement}
        />
      </div>
    </div>
  )
}
