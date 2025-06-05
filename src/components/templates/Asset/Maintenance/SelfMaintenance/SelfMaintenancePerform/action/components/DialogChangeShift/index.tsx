import { CoreButton } from '@/components/atoms/CoreButton'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import { CoreDialog } from '@/components/organism/CoreDialog'
import useDialogChangeShift from './useDialogChangeShift'

const DialogChangeShift = ({
  hideDialogChangeShift,
}: {
  hideDialogChangeShift: any
}) => {
  const [{ methods }, { t, onChangeShift }] = useDialogChangeShift({
    hideDialogChangeShift,
  })
  const { control, getValues, watch } = methods
  return (
    <CoreDialog
      title={'Chọn ca làm việc'.toUpperCase()}
      onClose={hideDialogChangeShift}
      width={400}
    >
      <form className='p-15'>
        <div className='flex justify-center gap-24'>
          {(getValues('maintenanceShifts') ?? []).map((shift) =>
            shift.shift.map((item) => {
              return (
                <CoreCheckbox
                  key={item.id}
                  name={`maintenanceShift_${item.id}`}
                  control={control}
                  label={`${t(item.name)}`}
                  isViewProp={
                    Number(`maintenanceShift_${item.id}`.split('_')[1]) >=
                    getValues('currentShift.id')
                  }
                  sx={{
                    opacity:
                      Number(`maintenanceShift_${item.id}`.split('_')[1]) >=
                      getValues('currentShift.id')
                        ? 0.4
                        : 1,
                  }}
                />
              )
            })
          )}
        </div>
        <div className='flex justify-center gap-10 mt-10'>
          <CoreButton theme='cancel' onClick={hideDialogChangeShift}>
            {t('common:btn.destroy')}
          </CoreButton>
          <CoreButton theme='submit' onClick={onChangeShift}>
            {t('common:btn.confirm')}
          </CoreButton>
        </div>
      </form>
    </CoreDialog>
  )
}

export default DialogChangeShift
