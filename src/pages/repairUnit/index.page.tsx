import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import RepairUnitList from '@/components/templates/Asset/RepairUnit/RepairUnitList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <RepairUnitList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Repair Unit List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.REPAIR_UNIT,
      ])),
    },
  }
}

export default Page
