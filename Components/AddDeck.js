import React, { Component } from 'react'
import {View,Text} from 'react-native'
import {Styles} from '../utils/styles'
export default class AddDeck extends Component {
    render() {
        return (
            <View style={Styles.container}>
                <Text>Add a new Deck</Text>
            </View>
        )
    }
}
