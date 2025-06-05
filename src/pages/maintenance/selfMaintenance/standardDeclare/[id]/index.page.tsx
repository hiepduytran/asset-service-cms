import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import StandardDeclareAction from '@/components/templates/Asset/Maintenance/SelfMaintenance/StandardDeclare/action'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <StandardDeclareAction />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Khai báo tiêu chuẩn tự bảo dưỡng' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        TRANSLATE.COMMON,
        TRANSLATE.MAINTENANCE,
      ])),
    },
  }
}

export default Page
