import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import IncidentReportList from '@/components/templates/Asset/IncidentReport/IncidentReportList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <IncidentReportList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Incident Report List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', TRANSLATE.INCIDENT_REPORT, TRANSLATE.OPERATE])),
    },
  }
}

export default Page
