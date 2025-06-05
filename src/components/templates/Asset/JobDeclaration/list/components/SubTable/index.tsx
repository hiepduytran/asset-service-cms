import CoreNavbar from '@/components/organism/CoreNavbar'
import MachineDetail from '../MachineDetail'
import Overview from '../Overview'
type Props = {
  type: string
  id: number
}
export default function SubTableJobDeclaration(props: Props) {
  const { type, id } = props
  return (
    <CoreNavbar
      breadcrumbs={[
        ...(type === 'ALL' || type === 'OVERVIEW'
          ? [
              {
                title: 'Công việc tổng quản',
                content: <Overview id={id} type={type} />,
              },
            ]
          : []),
        ...(type === 'ALL' || type !== 'OVERVIEW'
          ? [
              {
                title: 'Công việc theo chi tiết máy',
                content: <MachineDetail id={id} type={type} />,
              },
            ]
          : []),
      ]}
      isFitContent
      styles={{
        marginTop: '15px',
        marginBottom: '15px',
      }}
      minWidthTab={200}
    />
  )
}
