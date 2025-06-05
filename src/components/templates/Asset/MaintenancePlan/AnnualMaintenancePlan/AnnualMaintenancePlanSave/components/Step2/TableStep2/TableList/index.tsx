import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableProps,
  TableRow,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import RowItem from './TableRow'
import EmptyIcon from '@/components/icons/EmptyIcon'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import { WeeklyMaintenancePlanSave } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/type'
import { useFormContext } from 'react-hook-form'

const CustomTable = styled(Table)<TableProps>(() => ({
  border: '1px solid #DFE0EB',
  '& td': {
    padding: '12px',
    '&.font-bold': {
      fontWeight: 500,
    },
  },
  '& th': {
    padding: '12px',
    fontWeight: 600,
  },
}))

const TableList = ({
  t,
  fields,
  append,
  remove,
  index,
  isView
}: {
  t: any
  fields: any
  append: any
  remove: any
  index: number
  isView: boolean
}) => {
  const { watch } = useFormContext<WeeklyMaintenancePlanSave>()

  return (
    <Box className='mb-30 overflow-auto'>
      <CustomTable>
        <TableHead>
          <TableRow className='bg-[#F6F7F9]'>
            <TableCell className='w-10'>STT</TableCell>
            <TableCell>{t('table.sparePart')}</TableCell>
            <TableCell>{t('table.attribute')}</TableCell>
            <TableCell>{t('table.quantity')}</TableCell>
            {watch('plantType') !== 'YEAR' && <TableCell>{t('table.issue')}</TableCell>}
            <TableCell>{t('table.selection')}</TableCell>
            <TableCell>{t('table.note')}</TableCell>
            <TableCell className='w-10'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields?.length === 0 ? (
            <TableRow>
              <TableCell
                variant='body'
                align='center'
                className='py-8'
                colSpan={9}
              >
                <div className='flex justify-center min-h-[60px] flex-col'>
                  <EmptyIcon />
                  <Typography variant='body2'>
                    {t('common:table.no_data')}
                  </Typography>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            fields.map((item: any, index1: number) => {
              return (
                <RowItem
                  key={item.keyConfigMaintenance}
                  append={append}
                  remove={remove}
                  index={index}
                  index1={index1}
                  isView={isView}
                />
              )
            })
          )}
          {(isView || watch('plantType') === 'WEEK' || watch('plantType') === 'WEEKLY_INCIDENT') ? null : (
            <ActionTable
              action={t('btn.addSparePart')}
              columns={[
                {
                  header: t('table.sparePart'),
                  fieldName: '',
                },
                {
                  header: t('table.attribute'),
                  fieldName: '',
                },
                {
                  header: t('table.quantity'),
                  fieldName: '',
                },
                {
                  header: t('table.issue'),
                  fieldName: '',
                },
                {
                  header: t('table.selection'),
                  fieldName: '',
                },
                {
                  header: t('table.note'),
                  fieldName: '',
                },
                {
                  header: '',
                  fieldName: '',
                },
              ]}
              append={append}
              defaultValueLine={{
                maintenanceAccessory: null,
                uomName: '',
                quantity: 0,
                problem: '',
                chooseType: null,
              }}
            />
          )}
        </TableBody>
      </CustomTable>
    </Box>
  )
}

export default TableList
