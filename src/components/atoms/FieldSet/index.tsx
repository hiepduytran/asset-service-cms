import { Typography } from '@mui/material'

type Props = {
  title: string
  children: any
  required?: boolean
  styles?: any
}

const FieldSet = ({ title, required, children, styles }: Props) => {
  return (
    <fieldset
      style={{
        display: 'flex',
        border: '1px solid #DFE0EB',
        borderRadius: '4px',
        ...styles,
      }}
    >
      <legend>
        <Typography variant='body2' style={{ color: '#747475' }}>
          {title}
          <span className='text-rose-600' style={{ fontSize: '13px' }}>
            {required && '*'}
          </span>
        </Typography>
      </legend>
      {children}
    </fieldset>
  )
}

export default FieldSet
