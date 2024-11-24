import { AddressFormValues } from '@/components/forms/address-form';
import { applyMask, REGEX } from '@/utils/regex';
import { request } from '@/utils/request';

type GetMyAddressResponse = AddressFormValues & {
  id: string;
};
const get = async (): Promise<GetMyAddressResponse> => {
  return request.get(`/addresses/me`);
};

type UpdateAddressResponse = {
  address: AddressFormValues;
  message: string;
};
const update = async (data: AddressFormValues): Promise<UpdateAddressResponse> => {
  return request.put(`/addresses/me`, {
    ...data,
    cep: applyMask(data.cep, REGEX.ONLY_NUMBERS),
  });
};

const create = async (data: AddressFormValues): Promise<UpdateAddressResponse> => {
  return request.post(`/addresses`, {
    ...data,
    cep: applyMask(data.cep, REGEX.ONLY_NUMBERS),
  });
};

export const myAddress = {
  get,
  update,
  create,
};
