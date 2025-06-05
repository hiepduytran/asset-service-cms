import DeleteIcon from '@/assets/svg/action/delete.svg'
import EditIcon from '@/assets/svg/action/edit.svg'
import { CoreImage } from '@/components/atoms/CoreImage'
import { toastError } from '@/toast'
import { fileUpload } from '@/service/resource/uploadFile'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Box, CircularProgress, IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, useRef, useState } from 'react'

interface Props {
  textUpload?: string
  url?: string | null
  setUrl: (val: string | null) => void
  isViewProp?: boolean
}

const UploadBox = (props: Props) => {
  const { url, setUrl, textUpload = 'Upload', isViewProp } = props
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { actionType } = router.query
  const isView = isViewProp ?? actionType === 'VIEW'

  const refElement = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target?.files
    setLoading(true)
    if (selectedFiles && selectedFiles[0]?.size > 5242880) {
      toastError('File vượt quá 5MB')
      event.stopPropagation()
      setLoading(false)
    }
    if (selectedFiles?.length && selectedFiles?.length > 0) {
      try {
        const formData = new FormData()
        formData.append('file', selectedFiles[0])
        const res = await fileUpload(formData)
        setUrl(res?.data?.data?.url)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        toastError(e)
      }
    }
  }

  return (
    <Box
      sx={{
        border: '1px dashed #DFE0EB',
        height: '100px',
        width: '100px',
        borderRadius: '4px',
        position: 'relative',
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {url ? (
            <CoreImage src={url} alt="" width={100} height={100} />
          ) : (
            <Box className="flex flex-col items-center mt-10">
              <CloudUploadIcon />
              <Typography variant="body1">{textUpload}</Typography>
            </Box>
          )}
          <input
            className="hidden"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileUpload}
            multiple
            ref={refElement}
          />
          {!isView && (
            <>
              <IconButton
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  backgroundColor: url ? '#DFE0EB' : undefined,
                }}
                onClick={() => {
                  if (refElement?.current)
                    refElement.current.click()
                }}
              >
                <Image src={EditIcon} alt="" width={16} height={16} />
              </IconButton>
              <IconButton
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  backgroundColor: url ? '#DFE0EB' : undefined,
                }}
                onClick={() => setUrl(null)}
              >
                <Image src={DeleteIcon} alt="" width={16} height={16} />
              </IconButton>
            </>
          )}
        </>
      )}
    </Box>
  )
}

export default UploadBox
