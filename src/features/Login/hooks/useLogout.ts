import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ServerStateKeys } from '../../../constants';
import { postData } from '../../../services';

export const useLogout = () => {
  const cache = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => postData<null>({ key: ServerStateKeys.Logout }),
    onSuccess: () => {
      cache.invalidateQueries({ queryKey: [ServerStateKeys.User] });
      navigate('/login');
    },
    onError: () => {
      console.log('there was an error');
    },
  });

  return {
    logout: mutate,
  };
};
