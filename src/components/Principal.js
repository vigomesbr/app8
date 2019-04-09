import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Conversas from './Conversas';
import Contatos from './Contatos';
import TabBarMenu from './TabBarMenu';

export default class Principal extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'conversas', title: 'Conversas' },
      { key: 'contatos', title: 'Contatos' },
    ],
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          conversas: Conversas,
          contatos: Contatos,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => <TabBarMenu {...props} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});