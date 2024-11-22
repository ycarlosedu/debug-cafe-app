import { z } from 'zod';

import { INVALID, REQUIRED } from '@/constants';

export const signInSchema = z.object({
  email: z.string().min(1, REQUIRED.FIELD).email(INVALID.EMAIL),
  password: z.string().min(1, REQUIRED.FIELD),
});

export type SignInValues = z.infer<typeof signInSchema>;
