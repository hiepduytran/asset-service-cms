import DoneIcon from '@mui/icons-material/Done'
import { Menu, MenuProps, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

export const MenuItemAssetUseHistory = (
  props: MenuProps & {
    itemList: {
      label: string
      value: string
    }[]
    onItemAction: (item: any) => void
    currentValue?: string
  }
) => {
  const { t } = useTranslation()

  const { itemList = [], onItemAction, currentValue = '', ...rest } = props

  return (
    <Menu {...rest}>
      {itemList.map((item) => {
        return (
          <div
            onClick={() => onItemAction(item)}
            key={item.label}
            className={`${
              item.value === currentValue && 'bg-cyan-50'
            } h-18 hover:bg-cyan-50 rounded-[8px] gap-5 flex items-center cursor-pointer group px-5`}
          >
            <div className={`w-2 h-full group-hover:bg-[#0078D4] `}></div>

            <Typography variant='body1' className='group-hover:text-[#0078D4]'>
              {t(item.label)}
            </Typography>

            <div className={`w-[15px] `}>
              {item.value === currentValue && (
                <DoneIcon
                  color='primary'
                  style={{
                    width: 15,
                    marginTop: 4,
                  }}
                />
              )}
            </div>
          </div>
        )
      })}
    </Menu>
  )
}
