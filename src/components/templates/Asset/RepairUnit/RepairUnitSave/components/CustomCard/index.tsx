import { CoreImage } from '@/components/atoms/CoreImage'
import { Action } from '@/components/molecules/Action'
import { Box, Typography } from '@mui/material'

interface Option {
  value: any
  label: string
}
interface Props {
  data: Option[]
  onDelete?: () => void
  onEdit?: () => void
  urlImg: string
  title?: string
  isView?: boolean
}

export const CustomCard = (props: Props) => {
  const { data, urlImg, onDelete, onEdit, title = '', isView = false } = props
  return (
    <Box
      className='flex items-center w-full p-8'
      sx={{ border: '1px solid #DFE0EB' }}
    >
      <CoreImage
        src={urlImg}
        alt={'image'}
        width={60}
        height={60}
        className='mr-8'
      />
      <Box>
        <Typography variant='body2'>{title}</Typography>
        {data.map((item, index) => {
          return (
            <Typography
              variant='body2'
              style={{ marginBottom: '4px' }}
              key={index}
            >
              {item.label}
              {': '}
              {item.value}
            </Typography>
          )
        })}
      </Box>
      <Box className='flex justify-end grow self-baseline'>
        <Action
          actionList={isView ? [] : ['edit', 'delete']}
          onDeleteAction={onDelete}
          onEditAction={onEdit}
        />
      </Box>
    </Box>
  )
}
