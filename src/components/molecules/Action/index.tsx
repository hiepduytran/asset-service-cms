import { IconButton } from '@mui/material'
import Image from 'next/image'

export type ActionType =
  | 'delete'
  | 'watch'
  | 'view'
  | 'edit'
  | 'append'
  | 'remove'
  | 'copy'
  | 'export'
  | 'import'
  | 'history'

type Props = {
  actionList: ActionType[]
  onWatchAction?: () => void
  onDeleteAction?: () => void
  onEditAction?: () => void
  onViewAction?: () => void
  onAppendAction?: () => void
  onRemoveAction?: () => void
  onCopyAction?: () => void
  onExportAction?: () => void
}

export const Action = ({
  actionList,
  onWatchAction,
  onDeleteAction,
  onEditAction,
  onViewAction,
  onAppendAction,
  onRemoveAction,
  onCopyAction,
  onExportAction,
}: Props) => {
  return (
    <div className='flex items-center'>
      {actionList.includes('watch') && (
        <IconButton onClick={onWatchAction}>
          <Image
            src={require('@/assets/svg/action/watch.svg')}
            alt='watch'
            width={16}
            height={16}
          />
        </IconButton>
      )}

      {actionList.includes('view') && (
        <IconButton onClick={onViewAction}>
          <Image
            src={require('@/assets/svg/action/view.svg')}
            alt='view'
            width={16}
            height={16}
          />
        </IconButton>
      )}

      {actionList.includes('edit') && (
        <IconButton onClick={onEditAction}>
          <Image
            src={require('@/assets/svg/action/edit.svg')}
            alt='edit'
            width={16}
            height={16}
          />
        </IconButton>
      )}

      {actionList.includes('delete') && (
        <IconButton onClick={onDeleteAction}>
          <Image
            src={require('@/assets/svg/action/delete.svg')}
            alt='delete'
            width={16}
            height={16}
          />
        </IconButton>
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

      {actionList.includes('copy') && (
        <IconButton onClick={onCopyAction}>
          <Image
            src={require('@/assets/svg/action/copy.svg')}
            alt='copy'
            width={16}
            height={16}
          />
        </IconButton>
      )}

      {actionList.includes('export') && (
        <IconButton onClick={onExportAction}>
          <Image
            src={require('@/assets/svg/action/export.svg')}
            alt='copy'
            width={16}
            height={16}
          />
        </IconButton>
      )}

      {actionList.includes('import') && (
        <IconButton onClick={onCopyAction}>
          <Image
            src={require('@/assets/svg/action/import.svg')}
            alt='copy'
            width={16}
            height={16}
          />
        </IconButton>
      )}

      {actionList.includes('history') && (
        <IconButton onClick={onCopyAction}>
          <Image
            src={require('@/assets/svg/action/history.svg')}
            alt='copy'
            width={16}
            height={16}
          />
        </IconButton>
      )}
    </div>
  )
}
