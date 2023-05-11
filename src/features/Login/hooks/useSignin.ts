import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ServerStateKeys } from '../../../constants';
import { postData } from '../../../services';
import { IUser } from '../../../types';
import { IAuth } from '../types';

export const useSignin = (onSuccess: (user: IUser) => void) => {
  const cache = useQueryClient();

  const { mutate, isLoading } = useMutation<IUser, Error, IAuth>({
    mutationFn: (data) => postData<IUser, IAuth>({ key: ServerStateKeys.Signin }, data),
    onSuccess: (user: IUser) => {
      cache.invalidateQueries({ queryKey: [ServerStateKeys.User] }).then(() => {
        onSuccess(user);
      });
    },
    onError: () => {
      console.log('there was an error');
    },
  });

  return {
    signin: mutate,
    isLoading,
  };
};
