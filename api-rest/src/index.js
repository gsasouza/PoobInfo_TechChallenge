
import '@babel/polyfill';

import { PORT } from './common/config';
import connectDatabase from './common/connectDatabase';
import app from './app';

(async () => {
  try {
    await connectDatabase();
  }
  catch (e) {
    console.log('Failed to conenect database', e);
  }

  app.listen(PORT, () => console.log('Server started'))
})();

