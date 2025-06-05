import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const GetInputSchema: ZodSchema<RequestBody['GET']> = z.object({
  search: z.string().optional(),
  companyId: z.number().nullable().optional(),
  activated: z.boolean().nullable().optional(),
  page: z.number(),
  size: z.number(),
})

export type GetInput = z.infer<typeof GetInputSchema>
