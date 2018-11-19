import Link from 'next/link'
import React from 'react';
import { KenticoClient } from '../shared/services/KenticoClient';
import { NavigationItem } from '../shared/models/navigation_item';
import { isExternalUrl } from '../utils/isExternalUrl';

interface NavigationState {
  readonly root: NavigationItem;
}

export class TopLevelMenu extends React.Component<{}, NavigationState>{
  constructor() {
    super({});

    this.state = {
      root: new NavigationItem(),
    }
  }

  private renderTopLevelItem = (nav: NavigationItem, key: number) => (
    <div key={key} style={{ paddingRight: '50px', paddingLeft: '50px' }}>
      <Link href={isExternalUrl(nav.url.value) ? nav.url.value : '/' + nav.url.value}>
        {nav.title.value}
      </Link>
    </div>
  );

  componentDidMount() {
    KenticoClient
      .item<NavigationItem>('root')
      .depthParameter(1)
      .getObservable()
      .subscribe(response => this.setState({ root: response.item }));
  }

  render() {
    const topLevelMenuItems = this.state.root.children
      ? this.state.root.children.map((nav, key) => this.renderTopLevelItem(nav, key))
      : undefined;

    return (
      <div style={{ display: 'flex' }}>
        {topLevelMenuItems}
      </div>
    );
  }
}
