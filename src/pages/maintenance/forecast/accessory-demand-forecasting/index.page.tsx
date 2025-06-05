import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import AccessoryDemandForecastingList from '@/components/templates/Asset/AccessoryDemandForecasting'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <AccessoryDemandForecastingList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Accessory Demand Forecasting List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', TRANSLATE.ACCESSORY_DEMAND_FORECASTING])),
        },
    }
}

export default Page
