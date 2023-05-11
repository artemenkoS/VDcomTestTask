import { useQuery } from '@tanstack/react-query';

import { ServerStateKeys } from '../constants';
import { fetchData } from '../services';
import { IUser } from '../types';

export const useUserData = () => {
  const { data, isLoading, error } = useQuery<IUser, Error>({
    queryKey: [ServerStateKeys.User],
    queryFn: () => fetchData<IUser>({ key: ServerStateKeys.User }),
    retry: 0,
  });

  return { data, isLoading, error };
};
