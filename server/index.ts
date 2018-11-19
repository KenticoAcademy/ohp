import * as express from 'express';
import {default as routes} from './routes';
import {nextApp} from './next/nextApp';

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const app = express();
app.use('/', routes);

(async () => {
  try {
    await nextApp.prepare();
    app.listen(port);
    console.log(`server listening on port ${port}`);
  }
  catch (err) {
    console.error(err.message);
  }
})();
