import * as React from 'react';
import { Route, Switch, } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import { Column } from '../components/common';

import CompanyList from './company/CompanyList';
import CompanyForm from './company/CompanyForm';
import CustomerList from './customer/CustomerList';
import CustomerForm from './customer/CustomerForm';

type Props = {}

type State = {
  isSidebarOpen: boolean
}

const Content = styled.div`
  margin: 30px;
  width: 100%;
  margin-top: 70px;
`;

class Dashboard extends React.Component<Props, State> {

  sidebarItems = [
    {
      label: 'Companies',
      icon: 'account_balance',
      path: '/companies'
    },
    {
      label: 'Customers',
      icon: 'account_box',
      path: '/customers'
    },
  ];

  state = {
    isSidebarOpen: true,
  };

  toggleSidebar = () => this.setState(({ isSidebarOpen }) => ({ isSidebarOpen: !isSidebarOpen }));

  render() {
    const { isSidebarOpen } = this.state;
    return (
      <Column>
        <Header toggleSidebar={this.toggleSidebar}/>
        <Sidebar isOpen={isSidebarOpen} items={this.sidebarItems}/>
        <Content>
          <Switch>
            <Route
              path={'/companies'}
              exact={true}
              render={(props) => <CompanyList {...props} /> }
            />
            <Route
              path={'/companies/add'}
              exact={true}
              render={(props) => <CompanyForm{...props} /> }
            />
            <Route
              path={'/companies/edit/:_id'}
              exact={true}
              render={(props) => <CompanyForm isEditing {...props} /> }
            />
            <Route
              path={'/customers'}
              exact={true}
              render={(props) => <CustomerList {...props} /> }
            />
            <Route
              path={'/customers/add'}
              exact={true}
              render={(props) => <CustomerForm {...props} /> }
            />
            <Route
              path={'/customers/edit/:_id'}
              exact={true}
              render={(props) => <CustomerForm isEditing {...props} /> }
            />
          </Switch>
        </Content>
      </Column>
    );
  }
}

export default Dashboard;
