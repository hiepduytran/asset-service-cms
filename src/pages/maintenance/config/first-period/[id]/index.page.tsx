import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import FirstPeriodSave from '@/components/templates/Asset/FirstPeriod/FirstPeriodSave'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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
