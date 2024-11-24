import { CreditCardFormValues } from '@/components/forms/credit-card-form';
import { applyMask, REGEX } from '@/utils/regex';
import { request } from '@/utils/request';

type GetMyCreditCardsResponse = {
  id: string;
  cardNumber: string;
}[];
const getAll = async (): Promise<GetMyCreditCardsResponse> => {
  return request.get(`/credit-card`);
};

type AddCreditCardResponse = {
  creditCard: {
    cardNumber: string;
  };
  message: string;
};

const add = async (data: CreditCardFormValues): Promise<AddCreditCardResponse> => {
  return request.post(`/address`, {
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
  return request.delete(`/credit-card/${id}`);
};

export const myCreditCards = {
  getAll,
  add,
  deleteCard,
};
