import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import JobDeclarationAction from '@/components/templates/Asset/JobDeclaration/action'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <JobDeclarationAction />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Incident Report Save' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.JOB_DECLARATION,
      ])),
    },
  }
}

export default Page
