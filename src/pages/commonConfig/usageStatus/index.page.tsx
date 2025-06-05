import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import UsageStatusList from '@/components/templates/Asset/UsageStatus/UsageStatusList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <UsageStatusList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Usage Status List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
                TRANSLATE.USAGE_STATUS,
            ])),
        },
    }
}

export default Page
