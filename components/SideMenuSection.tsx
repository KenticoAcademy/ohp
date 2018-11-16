import React from 'react';
import Link from 'next/link';
import {NavigationItem} from "../models/navigation_item";

interface SideMenuSectionDataProps {
    readonly key: number;
    readonly nav: NavigationItem;
    readonly rootUrl: string;
}

interface SideMenuSectionState {
    readonly isExpanded: boolean;
}

export default class SideMenuSection extends React.Component<SideMenuSectionDataProps, SideMenuSectionState> {

    constructor(props: SideMenuSectionDataProps) {
        super(props);
        this.state = {
            isExpanded: false,
        }
    }

    renderArticleLink = (nav: NavigationItem, key: number, parent: NavigationItem): JSX.Element => (
        <div style={{ paddingTop: '5px', paddingBottom: '5px' }}>
            <Link key={key} href={'/' + this.props.rootUrl + '/' + parent.url.value + '/' + nav.url.value}>
                {nav.title.value}
            </Link>
        </div>
    );

    handleSubMenuClick = () =>
        this.setState((prevState) => ({ isExpanded: !prevState.isExpanded }));

    render() {
        return (
            <div key={this.props.key} style={{ paddingRight: '50px', paddingLeft: '50px', paddingBottom: '15px'}}>
                <b
                    style={{ color: 'orange', textDecoration: 'underline',  cursor: 'pointer' }}
                    onClick={this.handleSubMenuClick}
                >
                    {this.props.nav.title.value}
                </b>
                <div style={{ paddingRight: '10px', paddingLeft: '10px'}}>
                    {
                        this.state.isExpanded
                            ? this.props.nav.children.map((article, index) => this.renderArticleLink(article, index, this.props.nav))
                            : undefined
                    }
                </div>
            </div>
        );
    }
}
