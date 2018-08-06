/** @format */
import React, {Component} from 'react';
import {
    AppRegistry,
    NavigatorIOS,
    StyleSheet
} from 'react-native';

import App from './App';
import {name as appName} from './app.json';

export default class Expenses extends Component {
    render () {
        return (
            <NavigatorIOS
                initialRoute-{{
                    component: App,
                    title: 'Expenses'
                }}
                style={StyleSheet.container}
                />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

AppRegistry.registerComponent('Expenses', () => Expenses);
