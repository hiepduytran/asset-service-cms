import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { toast } from 'react-toastify'
import { ErrorMessage } from '@/toast/componets/error'
import { SuccessMessage } from '@/toast/componets/success'

export const toastSuccess = (msg: string, title?: string, onClick?: () => void) => {
  if (msg)
    toast(<SuccessMessage message={msg} title={title} onClick={onClick && onClick()} />, {
      closeButton: () => (
        <div className="px-12 my-auto border-l">
          <CloseOutlinedIcon fontSize="small" />
        </div>
      ),
      className: 'vds-toast__success',
      autoClose: onClick ? 99999 : 5000,
    })
}

export const errorMsgWithClick = (
  message: any,
  title?: any,
  onClick?: () => void,
) => {
  toast(<ErrorMessage title={title} message={message} onClick={onClick} />, {
    closeButton: () => (
      <div className="px-12 my-auto border-l">
        <CloseOutlinedIcon fontSize="small" />
      </div>
    ),
    className: 'vds-toast__error',
    autoClose: 99999,
  })
}

export const toastError = (error: any, setError?: any) => {
  if (Array.isArray(error) && error.length > 0) {
    error.forEach((item) => {
      if (item && Array.isArray(item.fields) && setError) {
        item.fields.forEach((ele: any) => {
          if (ele !== 'orgId')
            setError(ele, {
              type: 'be',
              message: item.message,
            })
        })
      } else toastError(item.message)
    })
  } else if (typeof error === 'string') {
    toast(<ErrorMessage message={error} />, {
      closeButton: () => (
        <div className="px-12 my-auto border-l">
          <CloseOutlinedIcon fontSize="small" color={'error'} />
        </div>
      ),
      className: 'vds-toast__error',
    })
  } else
    toast(<ErrorMessage message="Có lỗi xảy ra" />, {
      closeButton: () => (
        <div className="px-12 my-auto border-l">
          <CloseOutlinedIcon fontSize="small" color={'error'} />
        </div>
      ),
      className: 'vds-toast__error',
    })
}

