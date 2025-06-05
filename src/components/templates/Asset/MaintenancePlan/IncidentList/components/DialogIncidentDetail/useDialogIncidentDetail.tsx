import { TRANSLATE } from '@/routes'
import { useTranslation } from 'next-i18next'

export const useDialogIncidentDetail = () => {
    const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)

    return [
        {},
        { t },
    ] as const
}
