import { InternalAccessValues } from '@/app/(internal)/internal-access/[user]';
import { RegisterUserFormValues } from '@/components/forms/register-user-info-form';
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

const changeUserType = async (values: InternalAccessValues): Promise<SignInResponse> => {
  return request.post('/auth/change-user-type', values);
};

const guestSignIn = async (): Promise<SignInResponse> => {
  return request.post('/auth/guest');
};

export const auth = {
  signIn,
  signUp,
  changeUserType,
  guestSignIn,
};
