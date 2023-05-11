import { useGetContact } from './hooks/useGetContact';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const Contact = () => {
  const { contactId } = useParams();
  console.log(contactId);

  return <div>hi</div>;
};
