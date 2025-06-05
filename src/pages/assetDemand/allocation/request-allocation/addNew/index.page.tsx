import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import RequestAllocationSave from '@/components/templates/Asset/RequestAllocation/RequestAllocationSave'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <RequestAllocationSave />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Request Allocation Save' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.REQUEST_ALLOCATION,
      ])),
    },
  }
}

export default Page
