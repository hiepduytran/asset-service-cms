import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import StandardApprovalAction from '@/components/templates/Asset/Maintenance/SelfMaintenance/StandardApproval/action'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <StandardApprovalAction />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Phê duyệt tiêu chuẩn' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        TRANSLATE.COMMON,
        TRANSLATE.STANDARD_APPROVAL,
      ])),
    },
  }
}

export default Page
