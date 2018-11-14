import React from 'react';
import {KenticoClient} from "../services/KenticoClient";
import {RouteResolver} from "../services/RouteResolver";

interface ArticleDataProps {
    readonly article: any;
}

export default class Article extends React.Component<ArticleDataProps> {
    static async getInitialProps({ req }: any) {
        const routeResolver = new RouteResolver();
        const codeName = routeResolver.getCodenameFromRoute(req.path);
        const article = await KenticoClient.item(codeName);

        return { article };
    }

    render() {
        return (
            <div>
                <h1>{this.props.article.title}</h1>
                <div>Working Article!!!</div>
            </div>);
    }
}
