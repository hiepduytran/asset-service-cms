import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Typography from '@mui/material/Typography'
import { ChangeEvent } from 'react'
import CoreLoading from '../CoreLoading'

type UploadFileProps = {
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void
  loading?: boolean
  disabled?: boolean
  helperText?: string
  title?: string
}

export const UploadFileCustom: React.FC<UploadFileProps> = ({
  handleFileUpload,
  loading,
  disabled,
  helperText,
  title,
}) => {
  return (
    <div className='flex flex-col justify-between gap-1'>
      <Typography fontSize={14} fontWeight={500} className='contents'>
        {title || 'Ảnh sản phẩm'}
      </Typography>
      <label className='flex flex-wrap mt-2 flex-col gap-3 items-center justify-center w-[120px] h-[128px]  border border-solid border-[#DFE0EB]  rounded-md cursor-pointer'>
        {loading ? (
          <CoreLoading />
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <CloudUploadIcon className='mb-4' />
            <Typography variant='caption'>Upload</Typography>
            <input
              className='hidden'
              type='file'
              accept='image/png, image/jpeg, image/jpg'
              onChange={handleFileUpload}
              multiple
              disabled={disabled}
            />
          </div>
        )}
      </label>
      {helperText && <Typography variant='body2'>{helperText}</Typography>}
    </div>
  )
}
