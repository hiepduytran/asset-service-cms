import { ReactElement } from 'react'

type Type = 'input' | 'autocomplete' | 'date' | 'datetime' | 'time'

export const getPlaceholder = (
  t: any,
  type: Type,
  placeholder: any,
  label: ReactElement | string,
  isView: boolean,
  value: any,
  multiple = false
): string => {
  if (isView) return ''

  if (multiple && value?.length > 0) return ''

  if (!multiple && Boolean(value)) return ''

  if (placeholder) return String(placeholder)

  if (type === 'input')
    return String(
      t('form.input.placeholder', {
        label: typeof label === 'string' ? label?.toLowerCase() : '',
      })
    )

  if (type === 'autocomplete')
    return String(
      t('form.autocomplete.placeholder', {
        label: typeof label === 'string' ? label?.toLowerCase() : '',
      })
    )

  if (type === 'datetime') return 'DD/MM/YYYY HH:mm'

  if (type === 'date') return 'DD/MM/YYYY'

  if (type === 'time') return 'HH:mm'

  return ''
}
