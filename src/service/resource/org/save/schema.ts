import { ZodSchema, z } from 'zod'
import { RequestBody } from './type'

export const SaveInputSchema: ZodSchema<RequestBody['SAVE']> = z.object({
  id: z.number().nullable().optional(),
  code: z
    .string()
    .min(1, 'Đây là trường bắt buộc')
    .max(25, 'Trường này không được vượt quá 25 kí tự')
    .regex(/^[a-zA-Z0-9\-\/_]*$/, 'Mã bao gồm kí tự chữ, số và -/_'),
  name: z.string().min(1, 'Đây là trường bắt buộc'),
  taxCode: z.string().min(1, 'Đây là trường bắt buộc'),
  email: z.string().min(1, 'Đây là trường bắt buộc'),
  address: z.string().min(1, 'Đây là trường bắt buộc'),
  logo: z.string().min(1, 'Đây là trường bắt buộc'),
  phone: z.string().min(1, 'Đây là trường bắt buộc'),
  parentId: z.number().nullable().optional(),
  companyId: z.number({
    required_error: 'Đây là trường bắt buộc',
    invalid_type_error: 'Đây là trường bắt buộc',
  }),
  description: z.string().optional(),
  activated: z.boolean(),
  cityId: z.number().nullable(),
  districtId: z.number().nullable(),
  wardId: z.number().nullable(),
  isDefault: z.boolean(),
})

export type SaveInput = z.infer<typeof SaveInputSchema>
