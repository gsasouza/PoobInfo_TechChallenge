import * as React from 'react';
import { Route, Switch, } from 'react-router-dom';

import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';

import { Column } from '../components/common';

type Props = {}

type State = {
  isSidebarOpen: boolean
}

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
        <Switch>
          <Route
            path={'/'}
            exact={true}
            render={() => <div /> }
          />
        </Switch>
      </Column>
    );
  }
}

export default Dashboard;
