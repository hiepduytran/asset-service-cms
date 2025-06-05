import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import ApproveMaintenancePlanList from '@/components/templates/Asset/MaintenancePlan/ApproveMaintenancePlan/ApproveMaintenancePlanList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ApproveMaintenancePlanList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Approve Maintenance Plan List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.WEEKLY_MAINTENANCE_PLAN,
      ])),
    },
  }
}

export default Page
