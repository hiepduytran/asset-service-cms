import ImageBox from '@/components/molecules/ImageBox'
import UploadImageBox from '@/components/molecules/UploadImageBox'
import { GREY, RED } from '@/helper/colors'
import { Box, Typography } from '@mui/material'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Controller, useFormContext } from 'react-hook-form'

type Props = {
  title?: string
  isViewProp?: boolean
  rules?: any
  name: string
}

const UploadImagesProduct = (props: Props) => {
  const { title, isViewProp, rules, name } = props
  const router = useRouter()
  const isView = router.query.actionType === 'VIEW'
  const { control, setValue, watch } = useFormContext()
  const listImage = watch(`${name}`) ?? []

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }
    const newImages = Array.from(listImage ?? [])
    const [removed] = newImages.splice(result.source.index, 1)
    newImages.splice(result.destination.index, 0, removed)
    setValue('images', newImages)
  }

  const removeImage = useCallback(
    (index: number) => {
      const list = watch(`${name}`) ?? []
      setValue(
        `${name}`,
        list.filter((_: any, i: number) => i !== index)
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setValue, watch]
  )

  return (
    <Box className='flex space-x-15'>
      {isViewProp ? (
        <></>
      ) : (
        !isView && (
          <Box>
            <Controller
              control={control}
              name='imageUrls'
              render={(field) => (
                <>
                  <UploadImageBox
                    setImage={(url: string) =>
                      setValue(
                        `${name}`,
                        listImage ? listImage.concat(url) : [url]
                      )
                    }
                    title={title}
                  />
                  {field.fieldState.error?.message && !listImage?.length && (
                    <Typography
                      variant='body2'
                      style={{ color: RED, marginTop: 6 }}
                    >
                      {field.fieldState.error?.message}
                    </Typography>
                  )}
                </>
              )}
              rules={!isView ? rules : {}}
            />
          </Box>
        )
      )}

      <Box className='items-center justify-center w-1/2 mt-6'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='imageUrls' direction='horizontal'>
            {(provided) => (
              <div
                className='flex items-center gap-8'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {listImage?.map((src: string, index: number) => (
                  <Draggable
                    key={'key' + index}
                    draggableId={index.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ImageBox
                          url={src}
                          removeImage={() => removeImage(index)}
                          isViewProp={isView}
                          className='relative w-[90px] h-[90px] border border-solid border-[#DFE0EB] rounded-md flex items-center justify-center'
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {_.size(listImage) > 0 && !isView && (
          <Typography
            variant='caption'
            className='italic'
            color={GREY}
            fontSize={12}
          >
            Để thay đổi thứ tự ảnh bạn nhấn giữ hình ảnh và kéo hình ảnh đến vị
            trí các bạn muốn
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default UploadImagesProduct
