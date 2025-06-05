import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import CheckImplMaintenancePlanSave from '@/components/templates/Asset/CheckImpleMaintenancePlan/CheckImpleMaintenancePlanSave'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <CheckImplMaintenancePlanSave />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Kiểm tra thực hiện kế hoạch bảo dưỡng' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.CHECK_IMPLEMENT_MAINTENANCE_PLAN,
      ])),
    },
  }
}

export default Page
