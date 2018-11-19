import {nextApp} from '../next/nextApp';
import {IRouteResolver} from '../../shared/services/RouteResolver';

export const renderPage = (resolver: IRouteResolver, req: any, res: any, actualPage: string) => {
  const codeName = resolver.getCodenameFromRoute(req.path);
  const rootCodeName = resolver.getCodenameFromRoute('/' + req.params.parentSlug);

  return nextApp.render(req, res, actualPage, { codeName, rootCodeName });
};
