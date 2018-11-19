import React from 'react';
import { Document } from '../shared/models/document'
import { IInitialProps } from '../utils/IInitialProps';
import { KenticoClient } from '../shared/services/KenticoClient';
import { Layout } from '../components/Layout';

interface ISubMenuItemDataProps {
  readonly menuItem: Document;
  readonly rootCodeName: string;
}

export default class SubMenuItem extends React.Component<ISubMenuItemDataProps> {
  static async getInitialProps({ query }: IInitialProps): Promise<ISubMenuItemDataProps> {
    const menuItem = await KenticoClient
      .item<Document>(query.codeName)
      .depthParameter(5)
      .getPromise()
      .then(response => response.item);

    return { menuItem, rootCodeName: query.rootCodeName };
  }

  render() {
    return (
      <Layout rootCodeName={this.props.rootCodeName}>
        <p>SubMenu ITEM</p>
      </Layout>
    );
  }
}
