
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'
import { blue, white } from './utils/colors'
import AddDeck from './Components/AddDeck';
import DeckList from './Components/DecksList'
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import reducer from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const FlashCardsStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />

    }
  }
}

const navigationOptions = {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? white : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? blue : blue,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }

}

const MainTabs = createAppContainer(Platform.OS === 'ios' ?
  createBottomTabNavigator(Tabs, navigationOptions) :
  createMaterialTopTabNavigator(Tabs, navigationOptions))

export default class App extends React.Component {

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <FlashCardsStatusBar backgroundColor={blue} barStyle='light-content' />
          {/* <StatusBar style="auto" /> */}
          <MainTabs />
        </View>
      </Provider>
    );
  }
}
