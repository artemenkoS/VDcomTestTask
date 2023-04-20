import { ITitle } from './types';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 5;
export const DEFAULT_ORDER = 'asc';
export const DEFAULT_ORDER_BY = 'clientName';

export const TITLES: ITitle[] = [
  { id: 'clientId', value: 'Client ID' },
  { id: 'clientName', value: 'Client name' },
  { id: 'trn', value: 'TRN/PPSN' },
  { id: 'endYear', value: 'Year end' },
  { id: 'ard', value: 'ARD' },
  { id: 'companyId', value: 'Company number' },
  { id: 'email', value: 'Email' },
  { id: 'phoneNumber', value: 'Phone number' },
  { id: 'companyAddress', value: 'Company address' },
];
