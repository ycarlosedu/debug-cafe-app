import { ChangeUserInfoFormValues } from '@/components/forms/change-user-info-form';
import { UserStored } from '@/models/user';
import { applyMask, REGEX } from '@/utils/regex';
import { request } from '@/utils/request';

type GetUserInfoResponse = UserStored;
const getInfo = async (): Promise<GetUserInfoResponse> => {
  return request.get(`/users/me`);
};

type UpdateInfoResponse = {
  user: UserStored;
  message: string;
};
const updateInfo = async (data: ChangeUserInfoFormValues): Promise<UpdateInfoResponse> => {
  return request.put(`/users/me`, {
    ...data,
    phone: applyMask(data.phone, REGEX.ONLY_NUMBERS),
  });
};

export const user = {
  getInfo,
  updateInfo,
};
