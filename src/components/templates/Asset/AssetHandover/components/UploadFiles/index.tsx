import { CoreImage } from '@/components/atoms/CoreImage'
import { authAssetApi } from '@/config/auth'
import { GREY, PRIMARY } from '@/helper/colors'
import { TransferAssetDetail } from '@/service/asset/assetHandover/detail/type'
import { toastError } from '@/toast'
import { Box, CircularProgress, Typography } from '@mui/material'
import Image from 'next/image'
import { ChangeEvent, useRef, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

export const fileUploadAsset = (data: any) => {
  return authAssetApi({
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/api/v1/upload-file',
    data,
    // params: { featureAlias: 'asset_document' },
  })
}

type Props = {
  isView: boolean
}

const UploadFiles = (props: Props) => {
  const { isView } = props
  const { control, watch } = useFormContext<TransferAssetDetail>()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOpenFileInput = () => {
    inputRef.current && inputRef.current?.click()
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'uploadSignature',
    keyName: 'key',
  })

  const [loading, setLoading] = useState(false)

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target?.files
    setLoading(true)
    if (selectedFiles?.length && selectedFiles?.length > 0) {
      try {
        const formData = new FormData()
        Array.from(selectedFiles).forEach((file, index) => {
          formData.append('files', file)
        })
        const res = await fileUploadAsset(formData)
        res.data.data.map((item: any) => {
          append({
            name: item.name,
            url: item.url,
          })
        })
        setLoading(false)
      } catch (e) {
        setLoading(false)
        toastError(e)
      }
    }
  }

  const fileList = fields
    ?.map((i, index) => ({ ...i, index }))
    ?.filter((x) => {
      return ['pdf'].includes(x?.name.split('.').pop()?.toLowerCase() as string)
    })
  const imageList = fields
    ?.map((i, index) => ({ ...i, index }))
    ?.filter((x) =>
      ['jpeg', 'jpg', 'png'].includes(
        x?.name.split('.').pop()?.toLowerCase() as string
      )
    )

  return (
    <Box className='flex items-center'>
      <Box>
        {!isView && (
          <Box className=''>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '350px',
                height: '78px',
                bgcolor: '#E8F0FF',
                border: '1px dashed #3E74D0',
                borderRadius: '8px',
                mb: '4px',
                cursor: 'pointer',
                color: '#1D4FA3',
                fontWeight: 500,
              }}
              onClick={handleOpenFileInput}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  <Image
                    src={require('@/assets/svg/ic_attach_file.svg')}
                    alt='attach'
                  />
                  Upload file
                  <input
                    ref={inputRef}
                    className='hidden'
                    type='file'
                    accept='image/png, image/jpeg, image/jpg, application/pdf'
                    onChange={handleFileUpload}
                  // multiple
                  />
                </>
              )}
            </Box>
            {(watch('uploadSignature') ?? []).length > 0 ? (
              fileList.map((item) => {
                return (
                  <Typography
                    key={item.url}
                    variant='caption'
                    color={GREY}
                    fontSize={13}
                    className='w-full'
                  >
                    {item.name}
                  </Typography>
                )
              })
            ) : (
              <Typography
                variant='caption'
                color={GREY}
                fontSize={13}
                className='w-full'
              >
                No file chosen
              </Typography>
            )}
          </Box>
        )}

        <Box className='my-5'>
          {
            fileList.length > 0 ? (
              <Box>
                {fileList?.map((item, index) => {
                  return (
                    <Box
                      key={item?.key}
                      className='flex items-center justify-between w-[350px] mb-5 cursor-pointer'
                      onClick={() => window.open(item?.url)}
                    >
                      <Box className='flex items-center space-x-4'>
                        <Image
                          src={require('@/assets/svg/pdf.svg')}
                          alt='pdf'
                        />
                        <Typography color={PRIMARY}>{item?.name}</Typography>
                      </Box>
                      {!isView && (
                        <Image
                          src={require('@/assets/svg/icon_delete_image.svg')}
                          alt='attach'
                          className='cursor-pointer'
                          onClick={(e) => {
                            e.stopPropagation();
                            remove(item?.index);
                          }}
                        />
                      )}
                    </Box>
                  )
                })}
              </Box>
            ) : null
            // <Typography variant='caption' color={GREY} fontSize={13}>
            //   No file chosen
            // </Typography>
          }
        </Box>
      </Box>
      {imageList?.length > 0 && (
        <Box className='flex my-10 ml-20'>
          {imageList?.map((i) => (
            <Box key={i?.key} className='mr-15 w-[100px] h-[100px] relative'>
              <CoreImage
                src={i?.url}
                alt='img'
                width={100}
                height={100}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
              {!isView && (
                <Image
                  src={require('@/assets/svg/icon_delete_image.svg')}
                  alt='attach'
                  className='absolute top-[-10px] right-[-10px] cursor-pointer'
                  onClick={() => remove(i?.index)}
                />
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default UploadFiles
