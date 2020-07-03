
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'
import { setData, getMyData, getDecks, setInitialData, fetchDecks } from './utils/api'
import { blue,white } from './utils/colors'
import AddDeck from './Components/AddDeck';
import DeckList from './Components/DecksList'
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs'
import { FontAwesome, Ionicons } from '@expo/vector-icons'


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
  componentDidMount() {

    fetchDecks()
      .then(results => {
        console.log(results)
      })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlashCardsStatusBar backgroundColor={blue} barStyle='light-content' />
        {/* <Text>Open up App.js to start working on your app!</Text> */}
        {/* <StatusBar style="auto" /> */}
        <MainTabs />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
