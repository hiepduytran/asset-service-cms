import React from 'react'
import useDialogJobDeclaration from './useDialogJobDeclaration'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { Box, Typography } from '@mui/material'
import { CoreButton } from '@/components/atoms/CoreButton'

const DialogJobDeclaration = () => {
  const [{ isLoading }, { t, hideDialog, onSubmit }] = useDialogJobDeclaration()
  return (
    <CoreDialog title='XÁC NHẬN' onClose={hideDialog} width={450}>
      <Box className='flex justify-center max-w-[350px] m-auto align-middle text-center mt-15'>
        <Typography
          variant='subtitle1'
          style={{
            lineHeight: 1.5,
          }}
        >
          {`${t('common:delete_dialog')}`}
        </Typography>
      </Box>

      <div className='flex justify-center gap-10 py-10'>
        <CoreButton
          theme='cancel'
          onClick={() => {
            hideDialog()
          }}
        >
          {t('common:btn.cancel')}
        </CoreButton>
        <CoreButton theme='submit' onClick={onSubmit} loading={isLoading}>
          {t('common:btn.agree')}
        </CoreButton>
      </div>
    </CoreDialog>
  )
}

export default DialogJobDeclaration
