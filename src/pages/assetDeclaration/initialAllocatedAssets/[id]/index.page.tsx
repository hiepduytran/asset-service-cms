import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import InitialAllocatedAssetsSave from '@/components/templates/Asset/InitialAllocatedAssets/InitialAllocatedAssetsSave'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <InitialAllocatedAssetsSave />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Initial Allocated Assets Save' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.INITIAL_ALLOCATED_ASSETS,
      ])),
    },
  }
}

export default Page
