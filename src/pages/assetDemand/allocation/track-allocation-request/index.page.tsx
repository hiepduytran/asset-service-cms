import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import TrackAllocationRequestList from '@/components/templates/Asset/TrackAllocationRequest/TrackAllocationRequestList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <TrackAllocationRequestList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Track Allocation Request List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.TRACK_ALLOCATION_REQUEST,
      ])),
    },
  }
}

export default Page
