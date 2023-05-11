export interface IContactDto {
  content: IContact[];
  pagination: IPagination;
}

export interface IContact {
  clientId: string;
  clientName: string;
  trn: string;
  endYear: string;
  ard: string;
  companyId: string;
  email: string;
  phoneNumber: string;
  companyAddress: string;
}

export interface IContactsParams {
  page: number;
  search: string;
  order: Order;
  orderBy: keyof IContact;
}
export interface IContactParams {
  id: number;
}

export interface ITitle {
  id: keyof IContact;
  value: string;
}

export interface IPagination {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export type Order = 'asc' | 'desc';
