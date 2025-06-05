import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import MaintenanceForecastingList from '@/components/templates/Asset/MaintenanceForecasting'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <MaintenanceForecastingList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Maintenance Forecasting List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.MAINTENANCE_FORECASTING,
      ])),
    },
  }
}

export default Page
