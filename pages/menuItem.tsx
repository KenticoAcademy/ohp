import React from 'react';
import {KenticoClient} from "../services/KenticoClient";
import {GetInitialPropsObject} from "../models/InitialPropsAttributes";

export default class MenuItem extends React.Component {
    static async getInitialProps({ query }: GetInitialPropsObject) {
        const article = await KenticoClient.item(query.codeName);

        return { article };
    }


    render() {
        return (
            <div>
                <div>Working MenuItem!!!</div>
            </div>);
    }
}
