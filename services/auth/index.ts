import { RegisterUserFormValues } from '@/components/forms/user-info-form';
import { UserStored } from '@/models/user';
import { SignInValues } from '@/schemas';
import { applyMask, REGEX } from '@/utils/regex';
import { request } from '@/utils/request';

type SignInResponse = {
  token: string;
  user: UserStored;
};
const signIn = async (values: SignInValues): Promise<SignInResponse> => {
  return request.post('/auth/login', values);
};

const signUp = async (values: RegisterUserFormValues): Promise<SignInResponse> => {
  return request.post('/auth/register', {
    ...values,
    phone: applyMask(values.phone, REGEX.ONLY_NUMBERS),
  });
};

export const auth = {
  signIn,
  signUp,
};
