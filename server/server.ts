import * as express from 'express';
import * as next from 'next';
import {RouteResolver} from "../services/RouteResolver";

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // Firstly build map between the url slugs and codenames
    const resolver = new RouteResolver();

    // We need to handle request for this urls otherwise we will have problems with codeName generation and loading of the items
    server.get(`/favicon.ico`, () => {});
    server.get(`/_next/:any`, () => {});

    server.get(`/:parentSlug/:childSlug/:article`, (req, res) => {
        renderPage(resolver, req, res,'/article');
    });

    server.get(`/:parentSlug/:childSlug`, (req, res) => {
        renderPage(resolver, req, res,'/subMenuItem');
    });

    server.get(`/:parentSlug`, (req, res) => {
        renderPage(resolver, req, res,'/menuItem');
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

function renderPage(resolver: RouteResolver, req: any, res: any, actualPage: string) {
    const codeName = resolver.getCodenameFromRoute(req.path);
    const rootCodeName = resolver.getCodenameFromRoute('/' + req.params.parentSlug);

    app.render(req, res, actualPage, { codeName, rootCodeName });
}
