import { MENU_URL } from '@/routes'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function useWarehouseReceiptDetail(props: any) {
  const { dataChild } = props
  const { t } = useTranslation(MENU_URL.RECOVERY)
  const methods = useFormContext()
  const { reset } = methods

  return [{ methods }, { t }] as const
}
