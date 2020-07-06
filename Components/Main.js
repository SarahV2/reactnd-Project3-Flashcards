
import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'
import AddDeck from './AddDeck';
import DeckList from './DecksList'
import Deck from './Deck'
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs'
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation-stack'
import { HeaderBackButton } from 'react-navigation-stack';
import { connect } from 'react-redux'
import AddCard from './AddCard';
import Quiz from './Quiz'

const purple = '#4e4cb8'
const white = '#FFFFFF'

const FlashCardsStatusBar = ({ backgroundColor, ...props }) => {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const sharedHeaderStyle = {
    headerTintColor: white,
    headerStyle: {
        backgroundColor: purple,
    }
}

const Tabs = {
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <MaterialIcons name='library-books' size={30} color={tintColor} />
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: ({ tintColor }) => <MaterialIcons name='add-box' size={30} color={tintColor} />

        }
    }
}

const navigationOptions = {
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? white : white,
        style: {
            height: 56,
            backgroundColor: purple,
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

const MainNavigator = createAppContainer(createStackNavigator({
    Home: {
        screen: MainTabs,
        navigationOptions: {
            header: null,
        },
    },
    Deck: {
        screen: Deck,
        navigationOptions: ({ navigation }) => ({
            headerLeft: (<HeaderBackButton tintColor={'#FFFFFF'} onPress={_ => navigation.navigate('DeckList')} />),
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            },

        })
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: sharedHeaderStyle
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: sharedHeaderStyle

    }
}))

class Main extends React.Component {

    render() {
        return (

            <View style={{ flex: 1 }}>
                <FlashCardsStatusBar backgroundColor={purple} barStyle='light-content' />
                <MainNavigator />
            </View>

        );
    }
}

const mapStateToProps = ({ decks }) => {
    return {
        decks
    }
}
export default connect(mapStateToProps)(Main)