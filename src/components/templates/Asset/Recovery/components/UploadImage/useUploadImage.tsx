import { MENU_URL } from '@/routes'
import { fileUpload } from '@/service/asset/upload'
import { toastError } from '@/toast'
import { ChangeEvent, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function useUploadImage(props: { index: number }) {
  const { index } = props
  const { t } = useTranslation(MENU_URL.RECOVERY)
  const methods = useFormContext()
  const { setValue } = methods
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target?.files
    if (selectedFiles?.length && selectedFiles?.length > 0) {
      try {
        const formData = new FormData()
        Array.from(selectedFiles).forEach((file, index) => {
          formData.append('files', file)
        })
        setIsLoading(true)
        const res = await fileUpload(formData)
        setValue(
          `asset.${index}.imageUrls`,
          res?.data?.data?.map((item: any) => item?.url)
        )
        setIsLoading(false)
      } catch (e) {
        toastError(e)
        setIsLoading(false)
      }
    }
  }
  return [
    { methods, isLoading },
    { handleFileUpload, t },
  ] as const
}
