import { UploadFileCustom } from '@/components/molecules/UploadFileCustom'
import { toastError } from '@/toast'
import { fileUpload } from '@/service/asset/upload'
import { ChangeEvent, useState } from 'react'

interface Props {
  setImage: (val: string) => void
  disabled?: boolean
  helperText?: string
  title?: string
}

const UploadImageBox = (props: Props) => {
  const { setImage, disabled, helperText, title } = props
  const [loading, setLoading] = useState(false)
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target?.files
    setLoading(true)
    if (selectedFiles?.length && selectedFiles?.length > 0) {
      try {
        const formData = new FormData()
        formData.append('file', selectedFiles[0])
        formData.append('featureAlias', 'asset_document')
        const res = await fileUpload(formData)

        setImage(res?.data?.data?.url)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        toastError(e)
      }
    }
  }
  return (
    <UploadFileCustom
      handleFileUpload={handleFileUpload}
      loading={loading}
      disabled={disabled}
      helperText={helperText}
      title={title}
    />
  )
}

export default UploadImageBox
