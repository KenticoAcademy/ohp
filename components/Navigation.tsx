import Link from 'next/link'
import React from "react";
import {KenticoClient} from "../services/KenticoClient";
import {NavigationItem} from "../models/navigation_item";

interface NavigationState {
    readonly root?: NavigationItem;
}

export default class Navigation extends React.Component<{}, NavigationState>{

    constructor(props: any) {
        super(props);
        this.state = {
            root: undefined,
        };
    }

    //Not working just a first try
     async componentDidMount() {
        const root = await KenticoClient
            .item<NavigationItem>('root')
            .getPromise()
            .then(response => response.item);

        this.setState(() => { root })
    }

    render() {
        const x = this.state.root
            ? this.state.root.children.map(nav => <Link href={nav.url.value}>{nav.title.value}</Link>)
            : undefined;

        return (
            <div>
                {x}
            </div>
        );
    }
}
