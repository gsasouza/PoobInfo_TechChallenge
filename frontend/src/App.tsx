import * as React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';

import { Snackbar } from './components/common';
import AppRouter from './router/AppRouter';
import theme from './Theme';

class App extends React.Component {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>
          <Snackbar>
            <AppRouter />
          </Snackbar>
        </MuiThemeProvider>
      </ThemeProvider>
    );
  }
}

export default App;
