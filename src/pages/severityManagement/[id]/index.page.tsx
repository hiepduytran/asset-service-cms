import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import OperateList from '@/components/templates/Asset/Operate/OperateList'
import SeverityManagementAction from '@/components/templates/Asset/SeverityManagement/action'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SeverityManagementAction />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Severity Management' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.SEVERITY_MANAGEMENT,
      ])),
    },
  }
}

export default Page
