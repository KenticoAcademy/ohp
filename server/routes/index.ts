import * as express from 'express';
import { nextApp } from '../next/nextApp';
import { renderPage } from '../services/renderPage';
import { RouteResolver } from '../../shared/services/RouteResolver';

const handler = nextApp.getRequestHandler();
const router = express.Router();

// We need to handle request for this urls otherwise we will have problems with codeName generation and loading of the items
router.get('/favicon.ico', () => {});
router.get(`/_next/:any`, () => {});

router.get(`/:parentSlug/:childSlug/:article`, (req, res) => renderPage(RouteResolver, req, res,'/article'));
router.get(`/:parentSlug/:childSlug`, (req, res) => renderPage(RouteResolver, req, res,'/subMenuItem'));
router.get(`/:parentSlug`, (req, res) => renderPage(RouteResolver, req, res,'/menuItem'));
router.get('*', (req, res) => handler(req, res));

export {
  router as routes,
};
