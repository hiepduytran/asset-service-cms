import { CoreTable } from "@/components/organism/CoreTable"
import { useCustomTable } from "./useCustomTable"

const CustomTable = (props: any) => {
    const [values, handles] = useCustomTable(props)
    const { columns, dataTable } = values
    const { } = handles
    const { isLoadingSerialLot } = props

    return (
        <div className='p-20 py-10'>
            <CoreTable
                columns={columns}
                data={dataTable}
                isShowColumnStt
                paginationHidden
                isLoading={isLoadingSerialLot}
            />
        </div>
    )
}
export default CustomTable
