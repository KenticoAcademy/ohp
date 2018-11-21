import React from 'react';
import { SideMenuSection } from './SideMenuSection';
import { KenticoClient } from '../shared/services/KenticoClient';
import { NavigationItem } from '../shared/models/navigation_item';

interface NavigationState {
  readonly root: NavigationItem;
}

interface NavigationProps {
  readonly rootCodeName: string;
}

export class SideMenu extends React.Component<NavigationProps, NavigationState> {
  constructor(props: NavigationProps) {
    super(props);

    this.state = {
      root: new NavigationItem(),
    }
  }

  componentDidMount() {
    KenticoClient
      .item<NavigationItem>(this.props.rootCodeName)
      .depthParameter(4)
      .getObservable()
      .subscribe(response => this.setState({ root: response.item }));
  }

  render() {
    const topLevelMenuItems = this.state.root.children
      ? this.state.root.children.map((nav, key) =>
        <SideMenuSection
          key={key}
          nav={nav}
          rootUrl={this.state.root.url.value}
        />)
      : undefined;

    return (
      <div style={{ display: 'block' }}>
        {topLevelMenuItems}
      </div>
    );
  }
}
