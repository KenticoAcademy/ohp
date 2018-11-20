import * as express from 'express';
import {routes} from './routes';
import {nextApp} from './next/nextApp';
import {DataIndexer} from "../search/services/DataIndexer";

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const app = express();
app.use('/', routes);

(async () => {
  try {
    // Index document objects on Algolia
    const indexer = new DataIndexer();
    indexer.addDocumentObjects();

    await nextApp.prepare();
    app.listen(port);
    console.log(`server listening on port ${port}`);
  }
  catch (err) {
    console.error(err.message);
  }
})();
