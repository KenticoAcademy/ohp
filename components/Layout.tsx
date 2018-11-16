import React from 'react';
import TopLevelMenu from "../components/TopLevelMenu";
import SideMenu from "./SideMenu";

interface LayoutDataProps {
    readonly children: JSX.Element[] | JSX.Element;
    readonly rootCodeName: string;
}

export default class Layout extends React.Component<LayoutDataProps> {
    render() {
        return (
            <div>
                <TopLevelMenu />
                <div style={{ float: 'left', width: '15%', paddingTop: '50px'}}>
                    <SideMenu rootCodeName={this.props.rootCodeName}/>
                </div>
                <div style={{ float: 'right', width: '85%'}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
