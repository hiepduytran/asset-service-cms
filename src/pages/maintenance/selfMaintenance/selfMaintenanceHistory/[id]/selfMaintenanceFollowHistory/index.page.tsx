import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SelfMaintenanceFollowHistory from '@/components/templates/Asset/Maintenance/SelfMaintenance/SelfMaintenanceHistory/action/components/selfMaintenanceFollowHistory'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SelfMaintenanceFollowHistory />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Theo dõi lịch sử tự BD' }))

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
