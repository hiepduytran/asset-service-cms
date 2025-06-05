import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { getAssetAccessoryList } from '@/service/asset/implementMaintenancePlan/action'
import { TaskLineResponse } from '@/service/asset/implementMaintenancePlan/action/type'
import { Box } from '@mui/material'
import CoreAutoCompleteAPIImplementMaintenancePlan from '../../AutoCompleAPI'
import { useDialogAddAccessory } from './useDialogAddAccessory'
type Props = {
  taskLineResponsesFields: (TaskLineResponse & { key: string })[]
  taskLineResponsesAppend: any
  assetAccessoryId: number
}

export const DialogAddAccessory = (props: Props) => {
  const { taskLineResponsesAppend, assetAccessoryId, taskLineResponsesFields } =
    props
  const { hideDialog } = useDialog()

  const [{ methods }, { t, onSubmit }] = useDialogAddAccessory({
    taskLineResponsesAppend,
  })

  const { control, getValues } = methods

  return (
    <CoreDialog
      onClose={hideDialog}
      fontSize={16}
      width={500}
      title={`${t('text.add_accessory')}`}
    >
      <Box className='py-15 px-20'>
        <CoreAutoCompleteAPIImplementMaintenancePlan
          control={control}
          name='product'
          fetchDataFn={getAssetAccessoryList}
          params={{ productId: assetAccessoryId }}
          label={t('label.product')}
          placeholder={t('placeholder.product')}
          labelPath='name'
          valuePath='id'
          objectPath='product'
          className='mb-10'
          required={true}
          rules={{
            required: t('common:validation.required'),
          }}
          exceptValues={(() => {
            return taskLineResponsesFields.map((item, _) => {
              return item.product
            })
          })()}
        />
        <CoreInput
          control={control}
          name='name'
          label={t('label.name_work')}
          placeholder={t('placeholder.name_work')}
          multiline={true}
          minRows={3}
          inputProps={{
            maxLength: 1000,
          }}
        />
      </Box>
      <div className='flex justify-center gap-10 py-10'>
        <CoreButton
          theme='cancel'
          onClick={() => {
            hideDialog()
          }}
        >
          {t('btn.cancel')}
        </CoreButton>
        <CoreButton theme='submit' onClick={onSubmit}>
          {`${t('common:btn.save')}`}
        </CoreButton>
      </div>
    </CoreDialog>
  )
}
