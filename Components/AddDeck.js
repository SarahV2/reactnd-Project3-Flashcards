import React, { Component, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Styles } from '../utils/styles'
import { addDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'

export default class AddDeck extends Component {

    state = {
        newDeckName: ''
    }


    handleChange = (input) => {
        console.log(input)
        this.setState({ newDeckName: input })

    }

    handlePress = async() => {
        // alert(this.state.newDeckName)

        // Send to DB
        await addDeck(this.state.newDeckName)

        console.log('added')
        this.toHome()
    }
    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'AddDeck'
        }))
    }
    render() {
        return (
            <View style={Styles.container}>
                <Text>Add a new Deck</Text>
                <TextInput onChangeText={(text) => this.handleChange(text)}
                    style={Styles.inputField} placeholder='New Deck Name' />
                <TouchableOpacity style={Styles.button} onPress={this.handlePress}>
                    <Text style={Styles.buttonText}>Add</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
