import { TRANSLATE } from '@/routes'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function useAssetDeliveryDetail(props: any) {
  const { t } = useTranslation(TRANSLATE.TRACK_ALLOCATION_REQUEST)
  const methods = useFormContext()

  return [{ methods }, { t }] as const
}
