import { NoneLayout } from '@/components/layouts/WrapLayout/NoneLayout'
import { Meta } from '@/components/meta'
import PageWelcome from '@/components/templates/common/Welcome'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'

type Props = HttpResponse<any>

const Page: NextPageWithLayout<Props> = () => <PageWelcome />

Page.getLayout = NoneLayout
Page.getMeta = Meta(() => ({ title: 'Maintain' }))

export default Page
