import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import Config from '@/components/templates/Asset/Config'
import RequestAllocationList from '@/components/templates/Asset/RequestAllocation/RequestAllocationList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <Config />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Config' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', TRANSLATE.CONFIG])),
    },
  }
}

export default Page
