import { UserStored } from '@/models/user';
import { SignInValues } from '@/schemas';
import { request } from '@/utils/request';

type SignInResponse = {
  token: string;
  user: UserStored;
};
const signIn = async (values: SignInValues): Promise<SignInResponse> => {
  return request.post('/auth/login', values);
};

export const auth = {
  signIn,
};
