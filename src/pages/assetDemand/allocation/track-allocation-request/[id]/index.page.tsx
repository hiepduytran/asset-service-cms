import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import TrackAllocationRequestSave from '@/components/templates/Asset/TrackAllocationRequest/TrackAllocationRequestSave'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <TrackAllocationRequestSave />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Track Allocation Request Save' }))

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
