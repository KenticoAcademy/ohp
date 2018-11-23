import React from 'react';
import { Document } from '../shared/models/document'
import { KenticoClient } from '../shared/services/KenticoClient';
import { Layout } from '../components/Layout';
import { IInitialProps } from '../utils/IInitialProps';

interface IArticleDataProps {
  readonly data: {
      resolvedHtml: string;
      article: Document;
  };
  readonly rootCodeName: string;
}

export default class Article extends React.Component<IArticleDataProps> {
  static async getInitialProps({ query }: IInitialProps): Promise<IArticleDataProps> {
    const data = await KenticoClient
      .item<Document>(query.codeName)
      .depthParameter(5)
      .getPromise()
      .then(response => ({resolvedHtml: response.item.content.getHtml(), article: response.item }));

    return { data, rootCodeName: query.rootCodeName };
  }

  render() {
    return (
      <Layout rootCodeName={this.props.rootCodeName} >
        <h1>{this.props.data.article.title.value}</h1>
        <div dangerouslySetInnerHTML={{ __html: this.props.data.resolvedHtml }} />
      </Layout>
    );
  }
}
