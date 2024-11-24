import { CreditCardFormValues } from '@/components/forms/credit-card-form';
import { CreditCard } from '@/models/credit-card';
import { applyMask, REGEX } from '@/utils/regex';
import { request } from '@/utils/request';

type GetMyCreditCardsResponse = CreditCard[];
const getAll = async (): Promise<GetMyCreditCardsResponse> => {
  return request.get(`/credit-cards`);
};

type AddCreditCardResponse = {
  creditCard: CreditCard;
  message: string;
};

const add = async (data: CreditCardFormValues): Promise<AddCreditCardResponse> => {
  return request.post(`/credit-cards`, {
    ...data,
    cardNumber: applyMask(data.cardNumber, REGEX.ONLY_NUMBERS),
    cpf: applyMask(data.cpf, REGEX.ONLY_NUMBERS),
  });
};

type DeleteCreditCardResponse = {
  id: string;
  message: string;
};
const deleteCard = async (id: string): Promise<DeleteCreditCardResponse> => {
  return request.delete(`/credit-cards/${id}`);
};

export const myCreditCards = {
  getAll,
  add,
  deleteCard,
};
