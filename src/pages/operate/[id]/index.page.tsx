import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import OperateSave from '@/components/templates/Asset/Operate/OperateSave'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <OperateSave />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Operate Save' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', TRANSLATE.OPERATE, TRANSLATE.WEEKLY_MAINTENANCE_PLAN])),
    },
  }
}

export default Page
