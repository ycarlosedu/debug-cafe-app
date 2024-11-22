export const IS_DEV_MODE = () => process.env.NODE_ENV === 'development';

export const API_URL = IS_DEV_MODE() ? 'http://192.168.100.9:3000' : 'http://192.168.100.1:3000';

export const INVALID = {
  EMAIL: 'Email inválido',
  PHONE: 'Telefone inválido',
  CEP: 'CEP inválido',
  CPF: 'CPF inválido',
  CREDIT_CARD: 'Cartão inválido',
  EXPIRATION_DATE: 'A data deve ser no formato Mês/Ano',
};

export const REQUIRED = {
  FIELD: 'Campo obrigatório',
  MIN: (min: number) => `Mínimo de ${min} caracteres`,
  MAX: (max: number) => `Máximo de ${max} caracteres`,
  MAX_STARS: 'Máximo de 5 estrelas',
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
  STAFF = 'staff',
  MANAGER = 'manager',
  DELIVERY = 'delivery',
}

export enum ORDER_STATUS {
  PENDING = 'pending',
  IN_PREPARATION = 'in_preparation',
  ON_THE_WAY = 'on_the_way',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
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
