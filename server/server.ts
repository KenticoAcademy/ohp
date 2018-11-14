import * as express from 'express';
import * as next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.get(`/:parentSlug/:childSlug/:article`, (req, res) => {
        const actualPage = '/article';
        const queryParams = { title: req.params.article };

        app.render(req, res, actualPage, queryParams)
    });

    server.get(`/:parentSlug/:childSlug`, (req, res) => {
        const actualPage = '/subMenuItem';
        const queryParams = { title: req.params.childSlug };

        app.render(req, res, actualPage, queryParams)
    });

    server.get(`/:parentSlug`, (req, res) => {
        const actualPage = '/menuItem';
        const queryParams = { title: req.params.parentSlug };

        app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err: any) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
})
.catch((ex: any) => {
    console.error(ex.stack);
    process.exit(1);
});
