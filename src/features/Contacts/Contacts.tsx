import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Checkbox,
  Paper,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  TableRow,
} from '@mui/material';
import { SwitchBaseProps } from '@mui/material/internal/SwitchBase';
import { useQuery } from '@tanstack/react-query';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import queryString from 'query-string';

import { EditModal } from './components/EditModal/EditModal';
import { DeleteModal } from './components/DeleteModal/DeleteModal';
import { AddModal } from './components/AddModal/AddModal';
import { DEFAULT_ORDER, DEFAULT_ORDER_BY, DEFAULT_PAGE, DEFAULT_PER_PAGE, TITLES } from './constants';
import { IContact, IContactDto, Order } from './types';

import { CellText, EditContainer, PaginationLayout, RouteTitle, PreloaderWrap, AddContactButton } from './styled';

interface IContactsParams {
  page: number;
  search: string;
  order: Order;
  orderBy: keyof IContact;
}

const fetchPContacts = (params: IContactsParams): Promise<IContactDto> =>
  fetch('/contacts?' + queryString.stringify(params)).then((res) => res.json());

type Props = { search: string };

export function Contacts({ search }: Props) {
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [order, setOrder] = React.useState<Order>(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState<keyof IContact>(DEFAULT_ORDER_BY);
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

  const [editContact, setEditContact] = React.useState<IContact | null>(null);
  const [deleteContact, setDeleteContact] = React.useState<IContact | null>(null);
  const [newIsOpen, setNewIsOpen] = React.useState(false);

  const { isLoading, isError, data } = useQuery<IContactDto>({
    queryKey: ['contacts', page, search, order, orderBy],
    queryFn: () => fetchPContacts({ page, search, order, orderBy }),
    keepPreviousData: true,
  });

  React.useEffect(() => {
    setPage(DEFAULT_PAGE);
  }, [search]);

  const handleChangePagination = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSelectAllClick: SwitchBaseProps['onChange'] = (e, checked) => {
    const newValues = checked ? data?.content?.map((contact) => contact.clientId) : undefined;
    setSelectedIds(new Set(newValues));
  };

  const handleSortClick = (id: keyof IContact) => () => {
    setOrderBy(id);
    setOrder((order) => {
      if (orderBy === id) {
        return order === 'asc' ? 'desc' : 'asc';
      } else {
        return DEFAULT_ORDER;
      }
    });
  };

  const handleSelectClick =
    (id: string): SwitchBaseProps['onChange'] =>
    (e, checked) => {
      const values = new Set(selectedIds);
      if (checked) {
        values.add(id);
      } else {
        values.delete(id);
      }
      setSelectedIds(values);
    };

  if (isLoading) {
    return (
      <PreloaderWrap>
        <CircularProgress />
      </PreloaderWrap>
    );
  }

  if (isError) {
    return <PreloaderWrap>Something went wrong</PreloaderWrap>;
  }

  return (
    <>
      <EditContainer>
        <RouteTitle>Total Contacts</RouteTitle>
        <AddContactButton
          onClick={() => {
            setNewIsOpen(true);
          }}
        >
          Add +
        </AddContactButton>
      </EditContainer>
      <TableContainer component={Paper} sx={{ minWidth: 800, maxWidth: '100%' }}>
        <Table
          style={{
            tableLayout: 'fixed',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={false}
                  checked={!!selectedIds.size && selectedIds.size === data?.content?.length}
                  onChange={handleSelectAllClick}
                  inputProps={{}}
                />
              </TableCell>

              {TITLES.map((title) => (
                <TableCell key={title.id} sortDirection={orderBy === title.id ? order : false}>
                  <TableSortLabel
                    active={orderBy === title.id}
                    direction={orderBy === title.id ? order : 'asc'}
                    onClick={handleSortClick(title.id)}
                  >
                    <div
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {title.value}
                    </div>
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.content.map((contact) => (
              <TableRow key={contact.clientId}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={false}
                    checked={selectedIds.has(contact.clientId)}
                    onChange={handleSelectClick(contact.clientId)}
                  />
                </TableCell>
                {TITLES.map((title) => (
                  <TableCell size="small">
                    <CellText>{contact[title.id]}</CellText>
                  </TableCell>
                ))}
                <TableCell size="small">
                  <IconButton size="small" onClick={() => setEditContact(contact)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton size="small" onClick={() => setDeleteContact(contact)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {editContact && <EditModal contact={editContact} onClose={() => setEditContact(null)} />}
        {deleteContact && <DeleteModal contact={deleteContact} onClose={() => setDeleteContact(null)} />}
        {newIsOpen && <AddModal isOpen={newIsOpen} onClose={() => setNewIsOpen(false)} />}
      </TableContainer>

      {data?.pagination && (
        <PaginationLayout>
          <Pagination
            count={data.pagination.totalPages > DEFAULT_PER_PAGE ? DEFAULT_PER_PAGE : data.pagination.totalPages}
            page={page}
            onChange={handleChangePagination}
          />
        </PaginationLayout>
      )}
    </>
  );
}
