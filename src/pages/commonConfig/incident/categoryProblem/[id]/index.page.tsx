import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveProblemCategory from '@/components/templates/Asset/ProblemCategory/ProblemCategorySave'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveProblemCategory />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Problem Category Save' }))

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
