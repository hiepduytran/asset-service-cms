import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SelfMaintenanceFollowAction from '@/components/templates/Asset/Maintenance/SelfMaintenance/SelfMaintenanceFollow/action'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SelfMaintenanceFollowAction />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Theo dõi danh sách phiếu tự BD' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        TRANSLATE.COMMON,
        TRANSLATE.MAINTENANCE,
      ])),
    },
  }
}

export default Page
