import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Props } from '.'

interface FormDataBank {
  id?: number
  bankId: number,
  bank: {
    logoUrl: string
    id: number
    name: string
  }
  accountNumber: string
  accountHolder: string
}

export const useBankDialog = (arg: Props) => {
  const { isEdit, data } = arg
  const { control, watch, reset, setValue, handleSubmit } =
    useForm<FormDataBank>({
      defaultValues: {},
      mode: 'onTouched',
    })
  useEffect(() => {
    if (isEdit) {
      reset({
        ...data,
        bank: {
          logoUrl: data?.logoUrl,
          id: data?.bankId,
          name: data?.bank,
        },
      })
    }
  }, [data, isEdit, reset])
  return [{ control }, { handleSubmit, watch, setValue }] as const
}
