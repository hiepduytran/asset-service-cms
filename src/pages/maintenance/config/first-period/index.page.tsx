import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import FirstPeriodList from '@/components/templates/Asset/FirstPeriod/FirstPeriodList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <FirstPeriodList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'First Period List' }))

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
