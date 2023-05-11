import { ServerStateKeys } from './constants';

export interface IUser {
  id: string;
  name: string;
  position: string;
}

export interface IRequest<T = {}> {
  key: ServerStateKeys;
  ids?: (string | number)[];
  params?: T;
  id?: number;
}
