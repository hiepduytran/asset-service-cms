export const getTitleBreadcrumbs = (
  t: any,
  isView: boolean,
  isUpdate: boolean,
  isCopy?: boolean
) => {
  if (isView) return t('common:detail')
  if (isCopy) return t('common:btn.copy')
  if (isUpdate) return t('common:btn.edit')

  return t('common:btn.add')
}
