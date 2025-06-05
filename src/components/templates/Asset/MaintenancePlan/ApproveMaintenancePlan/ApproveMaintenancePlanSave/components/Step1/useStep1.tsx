import { TRANSLATE } from '@/routes'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'

export const useStep1 = () => {
    const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)

    return [
        {},
        { t },
    ] as const
}
