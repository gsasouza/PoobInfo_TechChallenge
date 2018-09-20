import * as React from 'react';
import DrawerMUI from '@material-ui/core/Drawer';
import MenuList from '@material-ui/core/MenuList';
import styled from 'styled-components';

import SidebarItem from './SidebarItem';

const Drawer = styled(DrawerMUI)`
  > div {
    position: unset !important;
    z-index: -1;
    margin-top: 64px;
    width: ${props => props.open ? 250 : 0 }px;
  }
  height: calc(100vh - 64px);
  position: relative;
  white-space: nowrap;
`;

type Props = {
  isOpen: boolean,
  items: Array<{ label: string, icon: string, path: string }>,
}

class Sidebar extends React.Component<Props> {
  render() {
    const { isOpen, items } = this.props;
    return (
      <Drawer
        variant="permanent"
        open={isOpen}
      >
        <MenuList>
          {items.map(({ label, icon, path }) => <SidebarItem key={label} label={label} path={path}> {icon} </SidebarItem>)}
        </MenuList>
      </Drawer>
    );
  }
}

export default Sidebar;
