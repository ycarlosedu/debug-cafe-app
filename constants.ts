export const IS_DEV_MODE = () => process.env.NODE_ENV === 'development';

export const API_URL = IS_DEV_MODE()
  ? 'http://192.168.100.9:3000'
  : 'https://debug-cafe-server.onrender.com';

export const INVALID = {
  EMAIL: 'Email inválido',
  PHONE: 'Telefone inválido',
  CEP: 'CEP inválido',
  CPF: 'CPF inválido',
  CREDIT_CARD: 'Cartão inválido',
  EXPIRATION_DATE: 'A data deve ser no formato Mês/Ano',
  URL: 'URL inválida',
  NUMBER: 'Número inválido',
  MIN_VALUE: (min: number | string) => `Valor mínimo: ${min}`,
  MAX_VALUE: (max: number | string) => `Valor máximo: ${max}`,
};

export const REQUIRED = {
  FIELD: 'Campo obrigatório',
  MIN: (min: number) => `Mínimo de ${min} caracteres`,
  MAX: (max: number) => `Máximo de ${max} caracteres`,
  MAX_STARS: 'Máximo de 5 estrelas',
  MIN_OPTIONS: 'Selecione ao menos uma opção',
};

export const ERROR = {
  GENERIC: 'Erro inesperado, tente novamente mais tarde!',
};

export enum PRODUCT_CATEGORY {
  HOT_COFFEES = 'Cafés Quentes',
  ICED_COFFEES = 'Cafés Gelados',
  SWEET_STUFF = 'Doces',
  SALTY_SNACKS = 'Salgados',
  DRINKS = 'Bebidas',
  COMBOS = 'Combos',
}

export enum USER_TYPE {
  GUEST = 'GUEST',
  CLIENT = 'CLIENT',
  STAFF = 'STAFF',
  MANAGER = 'MANAGER',
  DELIVERY = 'DELIVERY',
}

export const USER_TYPE_LABEL = {
  [USER_TYPE.GUEST]: 'Convidado',
  [USER_TYPE.CLIENT]: 'Cliente',
  [USER_TYPE.STAFF]: 'Funcionário',
  [USER_TYPE.MANAGER]: 'Supervisor',
  [USER_TYPE.DELIVERY]: 'Motoboy',
};

export const isUserFromTeam = (userType?: USER_TYPE) => {
  if (!userType) return false;
  return [USER_TYPE.STAFF, USER_TYPE.MANAGER, USER_TYPE.DELIVERY].includes(userType);
};

export enum ORDER_STATUS {
  PENDING = 'PENDING',
  IN_PREPARATION = 'IN_PREPARATION',
  ON_THE_WAY = 'ON_THE_WAY',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

export const ORDER_STATUS_LABEL = {
  [ORDER_STATUS.PENDING]: 'Pendente',
  [ORDER_STATUS.IN_PREPARATION]: 'Em Preparação',
  [ORDER_STATUS.ON_THE_WAY]: 'Em Trânsito',
  [ORDER_STATUS.DELIVERED]: 'Entregue',
  [ORDER_STATUS.CANCELED]: 'Cancelado',
};

export const ORDER_STATUS_ICON = {
  [ORDER_STATUS.PENDING]: 'clock',
  [ORDER_STATUS.IN_PREPARATION]: 'utensils',
  [ORDER_STATUS.ON_THE_WAY]: 'truck',
  [ORDER_STATUS.DELIVERED]: 'check',
  [ORDER_STATUS.CANCELED]: 'xmark',
};

export const ORDER_STATUS_COLOR = {
  [ORDER_STATUS.PENDING]: 'orange',
  [ORDER_STATUS.IN_PREPARATION]: 'yellow',
  [ORDER_STATUS.ON_THE_WAY]: 'blue',
  [ORDER_STATUS.DELIVERED]: 'green',
  [ORDER_STATUS.CANCELED]: 'red',
};
