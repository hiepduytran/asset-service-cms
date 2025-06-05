import { CoreTable } from '@/components/organism/CoreTable'
import PageWithDetail from '@/components/organism/PageWithDetail'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import { Fragment } from 'react'
import { useTableRow } from './useTableRow'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import CoreInput from '@/components/atoms/CoreInput'
import { PRIMARY } from '@/helper/colors'
import { getListAccessoryByDIC } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/getListAccessoryByDIC'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import AutoCompleteAPIStep2 from '../../../AutoCompleteAPIStep2'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import { WeeklyMaintenancePlanSave } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/type'

const RowItem = (props: {
  index: number,
  index1: number,
  append: any,
  remove: any,
  isView: boolean
}) => {
  const { control, watch, setValue } = useFormContext<WeeklyMaintenancePlanSave>()
  const { index, index1, remove, isView } = props
  const [values, handles] = useTableRow({ index, index1, isView })
  const { columns, tableData, open, fieldsConfigLine } = values
  const { t, handleOpen, appendConfigLine, removeConfigLine } = handles
  return (
    <Fragment>
      <TableRow
        sx={{ cursor: 'pointer' }}
      >
        <TableCell>
          {index1 + 1}
        </TableCell>
        <TableCell>
          <AutoCompleteAPIStep2
            control={control}
            name={`planConfig.${index}.planConfigMaintenance.${index1}.maintenanceAccessory`}
            label=''
            placeholder={t('placeholder.selectAccessory')}
            fetchDataFn={getListAccessoryByDIC}
            params={{ productId: watch(`planLine.${index}.sku.productId`) }}
            onChangeValue={(data) => {
              setValue(`planConfig.${index}.planConfigMaintenance.${index1}.accessoryId`, data?.id)
              setValue(`planConfig.${index}.planConfigMaintenance.${index1}.maintenanceAccessory`, data?.product)
              setValue(`planConfig.${index}.planConfigMaintenance.${index1}.uomName`, data?.uom?.name)
              setValue(`planConfig.${index}.planConfigMaintenance.${index1}.uom`, data?.uom)
              setValue(`planConfig.${index}.planConfigMaintenance.${index1}.quantity`, 1)
              setValue(`planConfig.${index}.planConfigMaintenance.${index1}.planConfigLine`, [{
                uomName: '',
                type: '',
                product: null,
                uom: null,
                quantity: 0,
                factoryQty: 0,
                internalQty: 0
              }])
            }}
            isViewProp={isView || watch('plantType') === 'WEEK' || watch('plantType') === 'WEEKLY_INCIDENT'}
          />
        </TableCell>
        <TableCell>
          <CoreInput
            control={control}
            name={`planConfig.${index}.planConfigMaintenance.${index1}.uomName`}
            isViewProp
          />
        </TableCell>
        <TableCell>
          <CoreInput
            control={control}
            name={`planConfig.${index}.planConfigMaintenance.${index1}.quantity`}
            isViewProp
          />
        </TableCell>
        {
          watch('plantType') !== 'YEAR' && (
            <TableCell>
              <CoreInput
                control={control}
                name={`planConfig.${index}.planConfigMaintenance.${index1}.problem`}
                placeholder={t('placeholder.enterProblem')}
                isViewProp={isView || watch('plantType') !== 'EMERGENCY_TROUBLESHOOTING'}
              />
            </TableCell>
          )
        }
        <TableCell>
          <CoreAutocomplete
            control={control}
            name={`planConfig.${index}.planConfigMaintenance.${index1}.chooseType`}
            placeholder={`${t('placeholder.chooseOption')}`}
            options={[
              { value: 'INTERNAL_REPAIR', label: t('repairType.internal') },
              { value: 'REPLACE', label: t('repairType.replace') },
              { value: 'OUTSOURCED_REPAIR', label: t('repairType.outsourced') },
            ]}
          />
        </TableCell>
        <TableCell>
          {!!fieldsConfigLine.length ? (
            <>
              {fieldsConfigLine.length}
              <IconButton sx={{
                padding: 0
              }}
                onClick={(e) => {
                  handleOpen()
                }}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton></>
          ) : (
            isView ? null : (
              <Typography
                variant='body1'
                style={{
                  color: PRIMARY,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  appendConfigLine({
                    uomName: '',
                    type: '',
                    product: null,
                    uom: null,
                    quantity: 0,
                    factoryQty: 0,
                    internalQty: 0
                  })
                  handleOpen()
                }}
              >
                {t('listStep.addMaintenanceParts')}
              </Typography>
            )
          )}
        </TableCell>
        <TableCell>
          {isView ? null : (
            <IconButton
              onClick={() => {
                remove(index1)
              }}
            >
              <Image
                src={require('@/assets/svg/action/delete.svg')}
                alt='delete'
                width={16}
                height={16}
              />
            </IconButton>
          )}
        </TableCell>
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
              tabName={`${t('tabName.maintenanceAccessoryDetail')}`}
              isHeight
              className='mx-5'
            >
              <CoreTable
                data={tableData}
                columns={columns}
                paginationHidden
                isShowColumnStt
                actionTable={
                  isView ? null : (
                    <ActionTable
                      action={t('listStep.addMaintenanceParts')}
                      columns={columns}
                      append={appendConfigLine}
                      defaultValueLine={{
                        uomName: '',
                        type: '',
                        product: null,
                        uom: null,
                        quantity: 0,
                        factoryQty: 0,
                        internalQty: 0
                      }}
                    />
                  )
                }
              />
            </PageWithDetail>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default RowItem
