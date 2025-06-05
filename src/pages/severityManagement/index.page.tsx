import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SeverityManagement from '@/components/templates/Asset/SeverityManagement/list'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SeverityManagement />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Severity Management' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', TRANSLATE.SEVERITY_MANAGEMENT])),
    },
  }
}

export default Page
