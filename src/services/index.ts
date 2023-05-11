import axios from 'axios';
import queryString from 'query-string';

import { ServerStateKeys } from '../constants';
import { IRequest } from '../types';

type KeyTypes = (string | number)[];

function endpointTemplate(literals: TemplateStringsArray, ...keys: number[]) {
  return function (values?: KeyTypes): string {
    const result: KeyTypes = [literals[0]];
    keys.forEach((key, i) => {
      result.push(values?.[key] ?? '', literals[i + 1]);
    });

    return result.join('');
  };
}

export const API = {
  [ServerStateKeys.Contact]: endpointTemplate`/contacts/${0}`,
  [ServerStateKeys.Contacts]: () => '/contacts',
  [ServerStateKeys.Logout]: () => '/logout',
  [ServerStateKeys.Signin]: () => '/signin',
  [ServerStateKeys.User]: () => '/user',
} as const;

export const getEndpoint = <Params = {}>({ key, ids, params }: IRequest<Params>): string => {
  return API[key](ids) + (params ? '?' + queryString.stringify(params) : '');
};

export const fetchData = <T, Params = {}>(endPointData: IRequest<Params>): Promise<T> =>
  axios.get(getEndpoint<Params>(endPointData)).then((res) => res.data);

export const postData = <T, Data = {}, Params = {}>(endPointData: IRequest<Params>, data?: Data): Promise<T> =>
  axios(getEndpoint<Params>(endPointData), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  }).then((res) => res.data);
