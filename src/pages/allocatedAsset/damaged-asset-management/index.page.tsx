import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import DamagedAssetManagement from '@/components/templates/Asset/DamagedAssetManagement/list'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <DamagedAssetManagement />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Quản lý tài sản hư hỏng' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.DAMAGED_ASSET_MANAGEMENT,
      ])),
    },
  }
}

export default Page
