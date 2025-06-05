import { ActionType } from '@/components/molecules/Action'

export const getListTopAction = (
  isView: boolean,
  isUpdate: boolean,
  isCopy?: boolean
): ActionType[] => {
  if (isView) return ['edit', 'delete']
  if (isCopy) return []
  if (isUpdate) return ['delete']
  return []
}
