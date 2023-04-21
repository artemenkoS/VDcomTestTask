import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ContactsIcon from '@mui/icons-material/Contacts';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import { Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

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
  SidebarContent,
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
        <SidebarContent>
          <RouteLink to="/">
            <ContactsIcon />
            &nbsp;Total Contacts
          </RouteLink>
          <RouteLink to="/calendar">
            <CalendarMonthIcon />
            &nbsp;Calendar
          </RouteLink>
          <RouteLink to="/project-report">
            <DataSaverOffIcon />
            &nbsp;Project Report
          </RouteLink>
        </SidebarContent>

        <LogOut onClick={props.onLogout}>
          <LogoutIcon />
          <span>Logout</span>
        </LogOut>
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
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/project-report" element={<ProjectReport />} />
            <Route path="/*" element={<p>404</p>} />
          </Routes>
        </Content>
      </ContentLayout>
    </Layout>
  );
};
