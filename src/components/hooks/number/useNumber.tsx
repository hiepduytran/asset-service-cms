import { useAppSelector } from '@/redux/hook'

export const useNumber = () => {
  const { thousandSeparator, floatRounding } = useAppSelector(
    (state) => state.companyConfigData
  )

  const type = thousandSeparator === 'COMMA' ? 'en-US' : 'de-DE'

  const formatNumberIntl = new Intl.NumberFormat(type, {
    maximumFractionDigits: floatRounding ?? 2,
  })

  return {
    formatNumberIntl,
  }
}
