import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import AssetStatusManagement from '@/components/templates/Asset/AssetStatusManagement/list'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <AssetStatusManagement />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Quản lý tình trạng tài sản' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.ASSET_STATUS_MANAGEMENT,
      ])),
    },
  }
}

export default Page
