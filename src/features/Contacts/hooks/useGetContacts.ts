import { useQuery } from '@tanstack/react-query';
import { IContact, IContactDto, Order } from '../types';

import queryString from 'query-string';

interface IContactsParams {
  page: number;
  search: string;
  order: Order;
  orderBy: keyof IContact;
}

const fetchPContacts = (params: IContactsParams): Promise<IContactDto> =>
  fetch('/contacts?' + queryString.stringify(params)).then((res) => res.json());

export const useGetContacts = ({ page, search, order, orderBy }: IContactsParams) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['contacts', page, search, order, orderBy],
    queryFn: () => fetchPContacts({ page, search, order, orderBy }),
    keepPreviousData: true,
  });

  return {
    isLoading,
    isError,
    data,
  };
};
