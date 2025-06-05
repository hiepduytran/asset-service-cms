import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import MaintenanceAccessoryList from '@/components/templates/Asset/MaintenanceAccessory/MaintenanceAccessoryList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <MaintenanceAccessoryList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Maintenance Accessory List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.MAINTENANCE_ACCESSORY,
      ])),
    },
  }
}

export default Page
