import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreTable } from '@/components/organism/CoreTable'
import { BLUE } from '@/helper/colors'
import { Box, Typography } from '@mui/material'
import { DialogAddTask } from '../DialogAddTask'
import { useTableTask } from './useTableTask'

type Props = {
  index: number
}

export default function TableTask({ index }: Props) {
  const { showDialog } = useDialog()

  const [{ columns, dataTable, isView, isViewProp }, { appendTask, t }] =
    useTableTask({
      index,
    })
  return (
    <CoreTable
      isShowColumnStt
      tableName='asset'
      columns={columns}
      data={dataTable}
      isShowNoDataText={false}
      paginationHidden={true}
      actionTable={
        isViewProp ? (
          <></>
        ) : (
          <Box className='flex items-center whitespace-nowrap'>
            <Typography
              sx={{
                padding: '15px 20px 15px 12px',
                color: BLUE,
                cursor: 'pointer',
              }}
              onClick={() =>
                showDialog(<DialogAddTask appendTask={appendTask} />)
              }
            >
              {`${t('text.add_additional_work')}`}
            </Typography>
          </Box>
        )
      }
    />
  )
}
