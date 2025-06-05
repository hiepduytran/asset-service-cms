import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SelfMaintenancePerform from '@/components/templates/Asset/Maintenance/SelfMaintenance/SelfMaintenancePerform/list'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SelfMaintenancePerform />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Thực hiện tự BD' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        TRANSLATE.COMMON,
        TRANSLATE.MAINTENANCE,
        TRANSLATE.WEEKLY_MAINTENANCE_PLAN,
      ])),
    },
  }
}

export default Page
