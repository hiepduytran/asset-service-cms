import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import ApproveAllocationRequestSave from '@/components/templates/Asset/ApproveAllocationRequest/ApproveAllocationRequestSave'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ApproveAllocationRequestSave />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Approve Allocation Request Save' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.APPROVE_ALLOCATION_REQUEST,
      ])),
    },
  }
}

export default Page
