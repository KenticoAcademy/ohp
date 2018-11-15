import {KenticoClient} from "./KenticoClient";
import {NavigationItem} from "../models/navigation_item";

export class RouteResolver {
  private _routes = new Map();

  constructor() {
    this.recalculateRouting();
  }

  private _parseNavigationItems = (navigationItems: NavigationItem[]) => {
    navigationItems.forEach(item => {
      item.children.forEach(base => {
        base.children.forEach(child =>
          this._routes.set(`/${item.url.value}/${base.url.value}/${child.url.value}`, child.system.codename)
        );
        this._routes.set(`/${item.url.value}/${base.url.value}`, base.system.codename);
      });
      this._routes.set(`/${item.url.value}`, item.system.codename);
    });
  };

  recalculateRouting = () => {
    KenticoClient
      .items<NavigationItem>()
      .type('navigation_item')
      .depthParameter(4)
      .getObservable()
      .subscribe(response => this._parseNavigationItems(response.items));
  };

  getCodenameFromRoute = (route: string) => {
    const lastSlashIndex = route.lastIndexOf('/');
    const mapRoute = lastSlashIndex === (route.length - 1) ? route.substr(0, lastSlashIndex) : route;
    return this._routes.get(mapRoute);
  };
}

