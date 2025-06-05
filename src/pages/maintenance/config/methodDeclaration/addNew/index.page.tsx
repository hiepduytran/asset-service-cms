import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import MethodDeclarationSave from '@/components/templates/Asset/MethodDeclaration/MethodDeclarationSave'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <MethodDeclarationSave />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Method Declaration Save' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.METHOD_DECLARATION,
      ])),
    },
  }
}

export default Page
