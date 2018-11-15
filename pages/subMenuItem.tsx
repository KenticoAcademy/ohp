import React from 'react';
import {KenticoClient} from "../services/KenticoClient";
import {GetInitialPropsObject} from "../models/InitialPropsAttributes";

export default class SubMenuItem extends React.Component {
    static async getInitialProps({ query }: GetInitialPropsObject) {
        const article = await KenticoClient.item(query.codeName);

        return { article };
    }


    render() {
        return (
            <div>
                <div>Working SubMenuItem!!!</div>
            </div>);
    }
}
