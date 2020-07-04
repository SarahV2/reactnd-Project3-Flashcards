import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Styles } from '../utils/styles'
import { fetchDecks } from '../utils/api'

export default class AddDeck extends Component {
    state = {
        decks: ''
    }
    componentDidMount() {

        fetchDecks()
            .then(results => {
                console.log(results)
                this.setState({ decks: results })
            })
    }
    render() {
        const {decks}=this.state
        for (var key in decks) {
            if (decks.hasOwnProperty(key)) {
                console.log(key);
            }
        }
        //const list=
        return (
            <View style={Styles.container}>
                <Text>View List Of Decks</Text>
                <Text>{this.state.decks}</Text>
                
            </View>
        )
    }
}
