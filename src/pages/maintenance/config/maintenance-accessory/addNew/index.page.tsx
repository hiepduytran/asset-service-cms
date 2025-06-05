import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import MaintenanceAccessorySave from '@/components/templates/Asset/MaintenanceAccessory/MaintenanceAccessorySave'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <MaintenanceAccessorySave />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Maintenance Accessory Save' }))

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
