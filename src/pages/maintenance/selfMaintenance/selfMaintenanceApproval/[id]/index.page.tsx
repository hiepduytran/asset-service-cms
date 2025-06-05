import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SelfMaintenanceApproval from '@/components/templates/Asset/Maintenance/SelfMaintenance/SelfMaintenanceApproval/action'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SelfMaintenanceApproval />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Phê duyệt phiếu tự BD' }))

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
