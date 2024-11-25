import { USER_TYPE } from '@/constants';

export type UserStored = {
  phone: string;
  email: string;
  fullName: string;
  userType: USER_TYPE;
};
