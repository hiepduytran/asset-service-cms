import { CoreButton } from '@/components/atoms/CoreButton'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { CoreTable } from '@/components/organism/CoreTable'
import { Box, Typography } from '@mui/material'
import { useDialogRequestMaintenancePart } from './useDialogRequestMaintenancePart'

type Props = {
  id: number
  refetchPlanMaintenance?: any
  status: string
}
export const DialogRequestMaintenancePart = (props: Props) => {
  const { status } = props
  const [
    {
      tableData,
      columns,
      dataPlanMaintenance,
      isLoadingPlanMaintenance,
      isLoadingMutateRequestMaintenancePart,
    },
    { t, onSubmit, hideDialog },
  ] = useDialogRequestMaintenancePart(props)

  return (
    <CoreDialog
      onClose={hideDialog}
      fontSize={16}
      width={900}
      title={`${t('text.request')}`}
    >
      {isLoadingPlanMaintenance ? (
        <div className='mb-25'>
          <CoreLoading />
        </div>
      ) : (
        <>
          <Box className='border-[1px] border-solid border-[#DFE0EB] bg-[#F6F7F9] mt-15 h-[50px] flex justify-between px-7 items-center'>
            <Typography color={'#242424'} fontWeight={700}>
              {`${t('text.code_request')}`}: {dataPlanMaintenance?.request.code}
            </Typography>
            <div className='flex gap-6 items-center'>
              <TopAction
                actionList={['print']}
                actionText={{ print: 'In yêu cầu NVL' }}
                actionColor={{ print: '#242424' }}
              />
              <Typography sx={{ color: '#F58020' }}>Đang xử lý</Typography>
            </div>
          </Box>
          <Box className='p-10'>
            <CoreTable
              tableName='asset'
              columns={columns}
              data={tableData}
              paginationHidden={true}
              isLoading={isLoadingPlanMaintenance}
              isShowColumnStt
            />
          </Box>
          {(status === 'NOT_ALLOCATION' || status === null) && (
            <div className='flex justify-center gap-10 py-10'>
              <CoreButton
                theme='cancel'
                onClick={() => {
                  hideDialog()
                }}
              >
                {t('common:btn.destroy')}
              </CoreButton>
              <CoreButton
                theme='submit'
                onClick={onSubmit}
                loading={isLoadingMutateRequestMaintenancePart}
              >
                Gửi yêu cầu
              </CoreButton>
            </div>
          )}
        </>
      )}
    </CoreDialog>
  )
}
