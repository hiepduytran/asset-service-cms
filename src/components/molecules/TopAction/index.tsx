import CancelIcon from '@/components/icons/CancelIcon'
import EditIcon from '@/components/icons/EditIcon'
import PrintIcon from '@/components/icons/PrintIcon'
import { IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

export type ActionType =
  | 'delete'
  | 'watch'
  | 'edit'
  | 'append'
  | 'remove'
  | 'copy'
  | 'export'
  | 'import'
  | 'history'
  | 'view'
  | 'print'
  | 'cancel'

type Props = {
  actionText?: any
  actionColor?: any
  actionList: ActionType[]
  onWatchAction?: () => void
  onDeleteAction?: () => void
  onEditAction?: () => void
  onAppendAction?: () => void
  onRemoveAction?: () => void
  onCopyAction?: () => void
  onExportAction?: () => void
  onImportAction?: () => void
  onHistoryAction?: () => void
  onViewAction?: () => void
  onCancelAction?: () => void
}

export const TopAction = ({
  actionText,
  actionColor,
  actionList,
  onWatchAction,
  onDeleteAction,
  onEditAction,
  onAppendAction,
  onRemoveAction,
  onCopyAction,
  onHistoryAction,
  onViewAction,
  onExportAction,
  onImportAction,
  onCancelAction,
}: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { actionType } = router.query

  return (
    <div className='flex items-center gap-5'>
      {actionList.includes('print') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onViewAction}
        >
          <PrintIcon actionColor={actionColor} />
          <Typography
            variant='body2'
            sx={{ color: actionColor ? actionColor['print'] : '#00CC6A' }}
          >
            {actionText ? actionText['print'] : 'In'}
          </Typography>
        </div>
      )}
      {actionType !== 'VIEW' && actionList.includes('view') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onViewAction}
        >
          <IconButton>
            <Image
              src={require('@/assets/svg/action/view.svg')}
              alt='view'
              width={16}
              height={16}
            />
          </IconButton>
          <Typography variant='body2'>{t('btn.view')}</Typography>
        </div>
      )}
      {actionList.includes('copy') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onCopyAction}
        >
          <IconButton>
            <Image
              src={require('@/assets/svg/action/copy.svg')}
              alt='copy'
              width={16}
              height={16}
            />
          </IconButton>
          <Typography variant='body2'>{t('btn.copy')}</Typography>
        </div>
      )}

      {actionType === 'VIEW' && actionList.includes('edit') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onEditAction}
        >
          <EditIcon />
          <Typography variant='body2' sx={{ color: '#0078D4' }}>
            {t('btn.edit')}
          </Typography>
        </div>
      )}

      {actionType === 'VIEW' && actionList.includes('watch') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onWatchAction}
        >
          <IconButton>
            <Image
              src={require('@/assets/svg/action/watch.svg')}
              alt='watch'
              width={16}
              height={16}
            />
          </IconButton>
          <Typography variant='body2'>{t('detail')}</Typography>
        </div>
      )}

      {actionType === 'VIEW' && actionList.includes('delete') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onDeleteAction}
        >
          <IconButton>
            <Image
              src={require('@/assets/svg/action/delete.svg')}
              alt='delete'
              width={16}
              height={16}
            />
          </IconButton>
          <Typography variant='body2' sx={{ color: '#FF4956' }}>
            {t('btn.delete')}
          </Typography>
        </div>
      )}

      {actionList.includes('append') && (
        <IconButton onClick={onAppendAction}>
          <Image
            src={require('@/assets/svg/action/append.svg')}
            alt='append'
            width={16}
            height={16}
          />
        </IconButton>
      )}

      {actionList.includes('remove') && (
        <IconButton onClick={onRemoveAction}>
          <Image
            src={require('@/assets/svg/action/remove.svg')}
            alt='remove'
            width={16}
            height={16}
          />
        </IconButton>
      )}

      {actionList.includes('import') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onImportAction}
        >
          <IconButton>
            <Image
              src={require('@/assets/svg/action/import.svg')}
              alt='copy'
              width={16}
              height={16}
            />
          </IconButton>
          <Typography variant='body2'>{t('btn.import')}</Typography>
        </div>
      )}

      {actionList.includes('export') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onExportAction}
        >
          <IconButton>
            <Image
              src={require('@/assets/svg/action/export.svg')}
              alt='copy'
              width={16}
              height={16}
            />
          </IconButton>
          <Typography
            variant='body2'
            style={{
              color: '#F58020',
            }}
          >
            {t('btn.export')}
          </Typography>
        </div>
      )}

      {actionList.includes('history') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onHistoryAction}
        >
          <IconButton>
            <Image
              src={require('@/assets/svg/action/history.svg')}
              alt='copy'
              width={16}
              height={16}
            />
          </IconButton>
          <Typography variant='body2'>{t('btn.history')}</Typography>
        </div>
      )}

      {actionType === 'VIEW' && actionList.includes('cancel') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onCancelAction}
        >
          <CancelIcon className='flex' />
          <Typography variant='body2' sx={{ color: '#FF4956' }}>
            {t('btn.destroy')}
          </Typography>
        </div>
      )}
    </div>
  )
}
