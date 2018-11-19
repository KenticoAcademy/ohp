import React from 'react';
import { Document } from '../shared/models/document'
import { KenticoClient } from '../shared/services/KenticoClient';
import { Layout } from '../components/Layout';
import { IInitialProps } from '../utils/IInitialProps';

interface IArticleDataProps {
  readonly article: Document;
  readonly rootCodeName: string;
}

export default class Article extends React.Component<IArticleDataProps> {
  static async getInitialProps({ query }: IInitialProps): Promise<IArticleDataProps> {
    const article = await KenticoClient
      .item<Document>(query.codeName)
      .depthParameter(5)
      .getPromise()
      .then(response => response.item);

    return { article, rootCodeName: query.rootCodeName };
  }

  render() {
    return (
      <Layout rootCodeName={this.props.rootCodeName} >
        <h1>{this.props.article.title.value}</h1>
        <div dangerouslySetInnerHTML={{ __html: this.props.article.content.value }} />
      </Layout>
    );
  }
}
