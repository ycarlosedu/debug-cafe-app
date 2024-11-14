export const INVALID = {
  EMAIL: 'Email inválido',
  PHONE: 'Telefone inválido',
  CEP: 'CEP inválido',
};

export const REQUIRED = {
  FIELD: 'Campo obrigatório',
  MIN: (min: number) => `Mínimo de ${min} caracteres`,
  MAX: (max: number) => `Máximo de ${max} caracteres`,
};

export const ERROR = {
  GENERIC: 'Erro inesperado, tente novamente mais tarde!',
};

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
