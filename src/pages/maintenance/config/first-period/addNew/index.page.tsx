import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import CycleSave from '@/components/templates/Asset/AssetPeriod/AssetPeriodSave'
import MaintenancePartSave from '@/components/templates/Asset/MaintenanceAccessory/MaintenanceAccessorySave'
import StartOfCycleSave from '@/components/templates/Asset/FirstPeriod/FirstPeriodSave'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import FirstPeriodSave from '@/components/templates/Asset/FirstPeriod/FirstPeriodSave'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <FirstPeriodSave />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'First Period Save' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.FIRST_PERIOD,
      ])),
    },
  }
}

export default Page
