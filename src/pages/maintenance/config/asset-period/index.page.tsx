import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import AssetPeriodList from '@/components/templates/Asset/AssetPeriod/AssetPeriodList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <AssetPeriodList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Asset Period List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.ASSET_PERIOD,
      ])),
    },
  }
}

export default Page
