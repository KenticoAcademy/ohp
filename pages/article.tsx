import React from 'react';
import { KenticoClient } from "../services/KenticoClient";
import { GetInitialPropsObject } from "../models/InitialPropsAttributes";
import { Document } from "../models/document";
import Layout from "../components/Layout";

interface ArticleDataProps {
    readonly article: Document;
    readonly rootCodeName: string;
}

export default class Article extends React.Component<ArticleDataProps> {
    static async getInitialProps({ query }: GetInitialPropsObject): Promise<ArticleDataProps> {
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
