import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import IncidentLogList from '@/components/templates/Asset/IncidentLogList/list'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <IncidentLogList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Danh sách ghi nhận sự cố' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.INCIDENT_LOG_LIST,
        TRANSLATE.WEEKLY_MAINTENANCE_PLAN,
      ])),
    },
  }
}

export default Page
