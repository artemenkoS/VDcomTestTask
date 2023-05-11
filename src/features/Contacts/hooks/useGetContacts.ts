import { useQuery } from '@tanstack/react-query';

import { IContactDto, IContactsParams } from '../types';
import { ServerStateKeys } from '../../../constants';
import { fetchData } from '../../../services';

export const useGetContacts = (params: IContactsParams) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: [ServerStateKeys.Contacts, ...Object.values(params)],
    queryFn: () => fetchData<IContactDto, IContactsParams>({ key: ServerStateKeys.Contacts, params }),
    keepPreviousData: true,
    // useErrorBoundary: true,
  });

  return {
    isLoading,
    isError,
    data,
  };
};
