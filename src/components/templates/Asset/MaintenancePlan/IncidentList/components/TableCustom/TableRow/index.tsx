import { CoreTable } from '@/components/organism/CoreTable'
import PageWithDetail from '@/components/organism/PageWithDetail'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
  Checkbox,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
} from '@mui/material'
import { useTableRow } from './useTableRow'
import { IncidentList } from '@/service/asset/incidentList/getList/type'
import { convertAssetStatus, convertPlanStatus } from '@/enum'
import { useRouter } from 'next/router'
import { MENU_URL } from '@/routes'

const RowItem = (props: {
  index: number
  incidentList: IncidentList
  selectedRows?: any
  setSelectedRows?: any
}) => {
  const { incidentList, index, selectedRows, setSelectedRows } = props
  const router = useRouter()
  const assetId = incidentList.asset.id
  const dic = incidentList.asset.code
  const assetName = incidentList.product.name
  const [values, handles] = useTableRow({ assetId })
  const { columnsChild, open, tableDataChild, isLoadingChild } = values
  const { handleOpen, t } = handles

  return (
    <>
      <TableRow sx={{
        cursor: 'pointer',
        backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
        '&:hover': { backgroundColor: '#b2e4f9' },
      }}
        onDoubleClick={(e) => {
          router.push({
            pathname: `${MENU_URL.INCIDENT_HISTORY_LIST}/[id]`,
            query: {
              id: assetId,
              code: dic,
              name: assetName
            },
          })
        }}
      >
        <TableCell>
          <Checkbox
            size="small"
            checked={!!selectedRows?.find(
              (item: any) =>
                item?.asset?.code === dic
            )}
            onChange={(event) => {
              const isChecked = event.target.checked;
              setSelectedRows((prev: any) => {
                if (isChecked) {
                  const exists = prev.find(
                    (item: any) =>
                      item?.asset?.code === dic
                  );
                  if (!exists) {
                    return [...prev, incidentList];
                  }
                }
                return prev.filter(
                  (item: any) =>
                    !(item?.asset?.code === dic)
                );
              });
            }}
          />
        </TableCell>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{incidentList?.asset?.code}</TableCell>
        <TableCell>{incidentList?.product?.name}</TableCell>
        <TableCell>{incidentList?.department?.name}</TableCell>
        <TableCell>
          {incidentList?.incidentQuantity}
          <IconButton
            sx={{
              padding: 0,
            }}
            onClick={(e) => {
              handleOpen()
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{convertAssetStatus(incidentList?.isActive)}</TableCell>
        <TableCell>{convertPlanStatus(incidentList?.isPlaned)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            padding: `${open ? 10 : 0}px 0px ${open ? 10 : 0}px 0px`,
          }}
          colSpan={10}
        >
          <Collapse in={open}>
            <PageWithDetail
              tabName={`${t('common:detail')}`}
              isHeight
              className='mx-5'
            >
              <CoreTable
                data={tableDataChild}
                columns={columnsChild}
                paginationHidden
                isShowColumnStt
                isLoading={isLoadingChild}
              />
            </PageWithDetail>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default RowItem
