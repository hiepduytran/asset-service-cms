import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import TrackAssetList from '@/components/templates/Asset/TrackAssetList/TrackAssetList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>
const allocationChooseType = 'DEPARTMENT'
const Page: NextPageWithLayout<Props> = () => <TrackAssetList allocationChooseType={allocationChooseType} />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Track Asset List Department' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.TRACK_ASSET_LIST,
      ])),
    },
  }
}

export default Page
