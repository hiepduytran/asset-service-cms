import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SelfMaintenanceForm from '@/components/templates/Asset/Maintenance/SelfMaintenance/SelfMaintenanceForm/list'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SelfMaintenanceForm />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Lập phiếu tự bảo dưỡng' }))

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
