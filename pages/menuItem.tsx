import React from 'react';
import { Document } from '../shared/models/document'
import { IInitialProps } from '../utils/IInitialProps';
import { KenticoClient } from '../shared/services/KenticoClient';
import { Layout } from '../components/Layout';

interface IMenuItemDataProps {
  readonly menuItem: Document;
  readonly rootCodeName: string;
}

export default class MenuItem extends React.Component<IMenuItemDataProps> {
  static async getInitialProps({ query }: IInitialProps): Promise<IMenuItemDataProps> {
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
        <h1>MENU ITEM</h1>
      </Layout>
    );
  }
}
