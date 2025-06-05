import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
const defaultValues = {
  search: '',
  page: 0,
  size: 10,
}
export default function useJobDeclaration() {
  const { t } = useTranslation(TRANSLATE.JOB_DECLARATION)
  const router = useRouter()
  const methods = useFormCustom({ defaultValues })
  const { handleSubmit, reset } = methods

  const [queryPage, setQueryPage] = useState<any>(defaultValues)

  const onChangePageSize = (input: any) => {
    const { page, size } = input
    setQueryPage({ ...queryPage, page, size })
  }

  const onSubmit = handleSubmit((data) => {
    setQueryPage(data)
  })
  const onReset = () => {
    setQueryPage(defaultValues)
    reset(defaultValues)
  }

  return [
    {
      methods,
      router,
      queryPage,
    },
    { t, onSubmit, onReset, onChangePageSize },
  ] as const
}
