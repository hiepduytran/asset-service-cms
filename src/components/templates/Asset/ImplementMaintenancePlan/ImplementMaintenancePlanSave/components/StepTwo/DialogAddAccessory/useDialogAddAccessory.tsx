import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { DialogAddAccessory } from '@/service/asset/implementMaintenancePlan/action/type'
import { useTranslation } from 'next-i18next'

type Props = {
  taskLineResponsesAppend: any
}
export const useDialogAddAccessory = (props: Props) => {
  const { taskLineResponsesAppend } = props

  const { t } = useTranslation(TRANSLATE.IMPLEMENT_MAINTENANCE_PLAN)
  const { hideDialog } = useDialog()

  const methods = useFormCustom<DialogAddAccessory>()
  const { handleSubmit, control, getValues, watch } = methods

  const onSubmit = handleSubmit((data) => {
    const { product, name } = data
    taskLineResponsesAppend({
      product: product.product,
      note: '',
      request: '',
      task: [
        {
          name: name ? name.trim() : '',
          isCheck: false,
        },
      ],
    })
    hideDialog()
  })

  return [
    {
      methods,
    },
    { t, onSubmit },
  ] as const
}
