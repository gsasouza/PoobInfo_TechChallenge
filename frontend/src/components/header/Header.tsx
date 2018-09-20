import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolbarMUI from '@material-ui/core/Toolbar';
import styled from 'styled-components';

import IconButton from '../common/IconButton';


const Toolbar = styled(ToolbarMUI)`
  display: flex;
  padding: 0 10px;
  justify-content: flex-start;
`;

type Props = {
  toggleSidebar: () => void,
}

class Header extends React.Component<Props> {
  render() {

    const { toggleSidebar } = this.props;

    return (
      <AppBar position="absolute">
        <Toolbar>
          <IconButton color={'inherit'} onClick={toggleSidebar}>
            {'menu'}
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
