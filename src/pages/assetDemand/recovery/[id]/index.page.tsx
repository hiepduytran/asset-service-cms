import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import RecoverySave from '@/components/templates/Asset/Recovery/RecoverySave'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <RecoverySave />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Recovery Save' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', TRANSLATE.RECOVERY])),
    },
  }
}

export default Page
