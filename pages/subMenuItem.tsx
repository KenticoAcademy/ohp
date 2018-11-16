import React from 'react';
import {KenticoClient} from "../services/KenticoClient";
import {GetInitialPropsObject} from "../models/InitialPropsAttributes";
import Layout from "../components/Layout";
import {Document} from "../models/document";

interface SubMenuItemDataProps {
    readonly menuItem: Document;
    readonly rootCodeName: string;
}

export default class SubMenuItem extends React.Component<SubMenuItemDataProps> {
    static async getInitialProps({ query }: GetInitialPropsObject): Promise<SubMenuItemDataProps> {
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
