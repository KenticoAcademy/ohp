import React from 'react';
import {KenticoClient} from "../services/KenticoClient";
import {GetInitialPropsObject} from "../models/InitialPropsAttributes";
import Layout from "../components/Layout";
import {Document} from "../models/document";

interface MenuItemDataProps {
    readonly menuItem: Document;
    readonly rootCodeName: string;
}

export default class MenuItem extends React.Component<MenuItemDataProps> {
    static async getInitialProps({ query }: GetInitialPropsObject): Promise<MenuItemDataProps> {
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
