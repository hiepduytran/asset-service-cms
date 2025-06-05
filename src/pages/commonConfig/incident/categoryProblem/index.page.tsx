import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import ProblemCategoryList from '@/components/templates/Asset/ProblemCategory/ProblemCategoryList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ProblemCategoryList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Problem Category List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.PROBLEM_CATEGORY,
      ])),
    },
  }
}

export default Page
