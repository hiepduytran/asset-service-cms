import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import ImplementMaintenancePlanSave from '@/components/templates/Asset/ImplementMaintenancePlan/ImplementMaintenancePlanSave'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ImplementMaintenancePlanSave />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Thực hiện kế hoạch bảo dưỡng' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.IMPLEMENT_MAINTENANCE_PLAN,
      ])),
    },
  }
}

export default Page
