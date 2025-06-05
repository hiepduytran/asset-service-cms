import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import ApproveAllocationRequestList from '@/components/templates/Asset/ApproveAllocationRequest/ApproveAllocationRequestList'
import AssetHandoverAction from '@/components/templates/Asset/AssetHandover/action'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <AssetHandoverAction />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Bàn giao tài sản' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.ASSET_HANDOVER,
      ])),
    },
  }
}

export default Page
