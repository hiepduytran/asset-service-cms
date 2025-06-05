import { ZodSchema, z } from 'zod'

export const SaveInputSchema: ZodSchema<any> = z.object({
  id: z.number().nullable().optional(),
  code: z
    .string()
    .min(1, 'Đây là trường bắt buộc')
    .max(25, 'Trường này không được vượt quá 25 kí tự')
    .regex(/^[a-zA-Z0-9\-\/_]*$/, 'Mã bao gồm kí tự chữ, số và -/_'),
  name: z.string().min(1, 'Đây là trường bắt buộc'),
  logo: z.string().min(1, 'Đây là trường bắt buộc'),
  phone: z.string().min(1, 'Đây là trường bắt buộc'),
  email: z.string().min(1, 'Đây là trường bắt buộc'),
  address: z.string().min(1, 'Đây là trường bắt buộc'),
  taxCode: z.string().min(1, 'Đây là trường bắt buộc'),
  parentId: z.number().nullable().optional(),
  countryId: z.number(),
  currencyId: z.number(),
  languageId: z.number(),
  description: z.string().optional(),
  timezone: z.string(),
  activated: z.boolean(),
  thousandSeparator: z.string().nullable(),
  decimalSeparator: z.string().nullable(),
  floatRounding: z.number().nullable().optional(),
  cityId: z.number().nullable(),
  districtId: z.number().nullable(),
  wardId: z.number().nullable(),
})

export type SaveInput = z.infer<typeof SaveInputSchema>
