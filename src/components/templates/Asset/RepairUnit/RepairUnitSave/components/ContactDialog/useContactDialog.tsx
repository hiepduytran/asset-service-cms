import { Contact } from '@/service/partner/partner/get/type'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Props } from '.'

export const useContactDialog = (arg: Props) => {
  const { isEdit, data } = arg
  const { control, watch, reset, setValue, handleSubmit } = useForm<Contact>({
    defaultValues: {},
    mode: 'onTouched',
  })
  useEffect(() => {
    if (isEdit) {
      reset(data)
    }
  }, [data, isEdit, reset])
  return [{ control }, { handleSubmit, watch, setValue }] as const
}
