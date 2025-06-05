import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import AssetPeriodSave from '@/components/templates/Asset/AssetPeriod/AssetPeriodSave'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <AssetPeriodSave />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Asset Period Save' }))

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
