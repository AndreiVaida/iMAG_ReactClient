import React from "react";
import AppNavigator from "./configurations/AppNavigator";
import {createAppContainer} from "react-navigation";

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return (
            <AppContainer
                ref={nav => {
                    this.navigator = nav;
                }}
            />
        );
    }
}