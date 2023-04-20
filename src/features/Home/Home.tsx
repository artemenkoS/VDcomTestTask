import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ContactsIcon from '@mui/icons-material/Contacts';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import { Avatar } from '@mui/material';

import { UserContext } from '../../App';
import { Calendar } from '../Calendar/Calendar';
import { Contacts } from '../Contacts/Contacts';
import { ProjectReport } from '../ProjectReport/ProjectReport';

import { Logo } from '../../styles/common';
import {
  Content,
  ContentLayout,
  Header,
  Layout,
  RouteLink,
  Sidebar,
  Search,
  UserDescription,
  UserInfo,
  UserWrapper,
  LogOut,
} from './styled';

type Props = {
  onLogout(): void;
};

export const Home = (props: Props) => {
  const user = React.useContext(UserContext);
  const [search, setSearch] = React.useState('');

  if (!user) {
    return <Navigate to={'/login'} replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Layout data-id="layout">
      <Sidebar data-id="sidebar">
        <Logo>LOGO</Logo>
        <RouteLink to="/crm/contacts">
          <ContactsIcon />
          &nbsp;Total Contacts
        </RouteLink>
        <RouteLink to="/crm/calendar">
          <CalendarMonthIcon />
          &nbsp;Calendar
        </RouteLink>
        <RouteLink to="/crm/projectReport">
          <DataSaverOffIcon />
          &nbsp;Project Report
        </RouteLink>

        <LogOut onClick={props.onLogout}>Logout</LogOut>
      </Sidebar>

      <ContentLayout data-id="contentLayout">
        <Header data-id="header">
          <Search placeholder="Search by name..." value={search} onChange={handleChange} />
          <UserWrapper>
            <Avatar>
              <PersonIcon />
            </Avatar>
            <UserInfo>
              {user.name}
              <UserDescription>{user.position}</UserDescription>
            </UserInfo>
          </UserWrapper>
        </Header>

        <Content data-id="content">
          <Routes>
            <Route path="/" element={<Contacts search={search} />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="projectReport" element={<ProjectReport />} />
            <Route path="*" element={<p>404</p>} />
          </Routes>
        </Content>
      </ContentLayout>
    </Layout>
  );
};
