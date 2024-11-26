import { toBrazillianCurrency } from '../format/currency';

export enum REGEX {
  EMAIL_ADRESS = '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$',
  PHONE_NUMBER = '^\\([1-9]{2}\\) (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$',
  CPF = '(^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$)',
  CNPJ = '(^\\d{2}\\.\\d{3}\\.\\d{3}\\/\\d{4}-\\d{2}$)',
  CPF_CNPJ = '(^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$)|(^\\d{2}\\.\\d{3}\\.\\d{3}\\/\\d{4}-\\d{2}$)',
  CEP = '^\\d{5}-\\d{3}$',
  CREDIT_CARD = '^\\d{4} \\d{4} \\d{4} \\d{4}$',
  EXPIRATION_DATE = '^(0[1-9]|1[0-2])\\/?([0-9]{4})$',
  ONLY_NUMBERS = '^[0-9]*$',
  ONLY_NUMBERS_AND_DOTS = '^[0-9.,]*$',
  BR_PRICE = '^(R\\$ )?\\d{1,3}(\\.\\d{3})*(,\\d{2})?$',
}

export const validate = (value: string, regex: REGEX) => {
  const reg = new RegExp(regex);
  return reg.test(value);
};

export const applyMask = (value: string, regex: REGEX) => {
  switch (regex) {
    case REGEX.PHONE_NUMBER:
      return value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    case REGEX.CPF:
      return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    case REGEX.CNPJ:
      return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    case REGEX.CPF_CNPJ:
      if (value.length > 14) {
        return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      } else {
        return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      }
    case REGEX.CEP:
      return value.replace(/^(\d{5})(\d{3})/, '$1-$2');
    case REGEX.CREDIT_CARD:
      return value.replace(/^(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
    case REGEX.EXPIRATION_DATE:
      return value.replace(/^(\d{2})(\d{4})/, '$1/$2');
    case REGEX.ONLY_NUMBERS:
      return value.replace(/\D/g, '');
    case REGEX.BR_PRICE:
      return toBrazillianCurrency(parseFloat(value || '0'));
    default:
      return value;
  }
};
