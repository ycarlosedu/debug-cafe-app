import { z, ZodTypeAny } from 'zod';

import { INVALID, REQUIRED } from '@/constants';
import { toBrazillianCurrency } from '@/utils/format/currency';

export const zodInputStringToNumberPipe = (zodPipe: ZodTypeAny) =>
  z
    .string()
    .transform((value) => (!value ? 0 : value))
    .refine((value) => !value || !isNaN(Number(value)), {
      message: INVALID.NUMBER,
    })
    .pipe(zodPipe);

export const signInSchema = z.object({
  email: z.string().min(1, REQUIRED.FIELD).email(INVALID.EMAIL),
  password: z.string().min(1, REQUIRED.FIELD),
});

export type SignInValues = z.infer<typeof signInSchema>;

export const addProductSchema = z.object({
  name: z.string().min(1, REQUIRED.FIELD).max(255, REQUIRED.MAX(255)),
  image: z.string().min(1, REQUIRED.FIELD).url(INVALID.URL),
  price: z
    .number()
    .min(0, INVALID.MIN_VALUE(toBrazillianCurrency(0)))
    .max(9999, INVALID.MAX_VALUE(toBrazillianCurrency(9999))),
  description: z.string().min(1, REQUIRED.FIELD).max(255, REQUIRED.MAX(255)),
  categories: z.array(z.string().cuid()).min(1, REQUIRED.MIN_OPTIONS),
});

export type AddProductValues = z.infer<typeof addProductSchema>;

export const addCategorySchema = z.object({
  name: z.string().min(1, REQUIRED.FIELD).max(255, REQUIRED.MAX(255)),
  image: z.string().min(1, REQUIRED.FIELD).url(INVALID.URL),
});

export type AddCategoryValues = z.infer<typeof addCategorySchema>;
