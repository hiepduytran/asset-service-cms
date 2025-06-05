import { TRANSLATE } from "@/routes"
import { useTranslation } from "react-i18next"

export const useCustomTableDefault = (props: any) => {
    const { t } = useTranslation(TRANSLATE.ASSET_DECLARATION_CATEGORY_LIST)
    return [
        {},
        { t },
    ] as const
}