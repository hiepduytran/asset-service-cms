import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import ApproveMaintenancePlan from '@/components/templates/Asset/MaintenancePlan/ApproveMaintenancePlan/ApproveMaintenancePlanSave'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ApproveMaintenancePlan />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Approve Maintenance Plan Save' }))

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
