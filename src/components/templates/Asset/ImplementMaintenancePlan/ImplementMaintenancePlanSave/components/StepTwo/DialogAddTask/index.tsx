import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { Box } from '@mui/material'
import { useDialogAddTask } from './useDialogAddTask'

type Props = {
  appendTask: any
}

export const DialogAddTask = (props: Props) => {
  const { appendTask } = props

  const { hideDialog } = useDialog()
  const [{ methods }, { t, onSubmit }] = useDialogAddTask({
    appendTask,
  })
  const { control, reset } = methods

  return (
    <CoreDialog
      onClose={hideDialog}
      fontSize={16}
      width={500}
      title={`${t('text.add_additional_work')}`.toUpperCase()}
    >
      <Box className='py-15 px-20'>
        <CoreInput
          control={control}
          label={t('label.name_work')}
          name='name'
          multiline={true}
          isViewProp={false}
          required={true}
          rules={{
            required: t('common:validation.required'),
          }}
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
            reset()
          }}
        >
          {t('btn.cancel')}
        </CoreButton>
        <CoreButton theme='submit' onClick={onSubmit}>
          {t('common:btn.save')}
        </CoreButton>
      </div>
    </CoreDialog>
  )
}
