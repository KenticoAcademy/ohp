import React from 'react';
import { KenticoClient } from "../services/KenticoClient";
import { GetInitialPropsObject } from "../models/InitialPropsAttributes";
import { Document } from "../models/document";
import Navigation from "../components/Navigation";

interface ArticleDataProps {
    readonly article: Document;
}

export default class Article extends React.Component<ArticleDataProps> {
    static async getInitialProps({ query }: GetInitialPropsObject): Promise<ArticleDataProps> {
        const article = await KenticoClient
            .item<Document>(query.codeName)
            .getPromise()
            .then(response => response.item);

        return { article };
    }

    render() {
        return (
            <div>
                <Navigation />
                <h1>{this.props.article.title.value}</h1>
                <div dangerouslySetInnerHTML={{ __html: this.props.article.content.value }} />
            </div>
        );
    }
}
