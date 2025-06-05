import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { Task } from '@/service/asset/implementMaintenancePlan/action/type'
import { useTranslation } from 'next-i18next'

type Props = {
  appendTask: any
}
const defaultValues = {
  name: '',
}
export const useDialogAddTask = (props: Props) => {
  const { appendTask } = props

  const { t } = useTranslation(TRANSLATE.IMPLEMENT_MAINTENANCE_PLAN)
  const { hideDialog } = useDialog()

  const methods = useFormCustom<Omit<Task, 'isCheck'>>({
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmit = handleSubmit((data) => {
    appendTask([
      {
        name: data.name.trim(),
        isCheck: false,
      },
    ])
    hideDialog()
  })

  return [
    {
      methods,
    },
    { t, onSubmit },
  ] as const
}
