import _ from 'lodash'
import { useDate } from '@/components/hooks/date/useDate'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'

type Props = {
  row: any
  render?: any
  fieldName?: string
}

export const CellContent = (props: Props) => {
  const { render, row, fieldName } = props
  const { checkDateValid, convertToDate } = useDate()

  if (row && render) {
    return render(row)
  }

  if (row && fieldName) {
    const val = _.get(row, fieldName)

    if (_.isNumber(val)) return <CurrencyFormatCustom amount={val} />

    if (checkDateValid(val)) return convertToDate(val)

    return val
  }

  return null
}
