import React, { Component, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Styles } from '../utils/styles'
import { addDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { addEntry } from '../actions'
import { connect } from 'react-redux'

class AddDeck extends Component {

    state = {
        newDeckName: ''
    }

    handleChange = (input) => {
        console.log(input)
        this.setState({ newDeckName: input })

    }

    handlePress = async () => {
        const newTitle = this.state.newDeckName

        // Update Redux
        await this.props.dispatch(addEntry(
            newTitle))
        // Send to DB
        await addDeck(newTitle)

        console.log('added')

        this.toHome(newTitle)

        this.setState({ newDeckName: '' })
    }
    toHome = (title) => {
        this.props.navigation.navigate(
            'Deck',
            { title }
        )
    }
    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={Styles.container}>
                <Text>Add a new Deck</Text>
                <TextInput onChangeText={(text) => this.handleChange(text)}
                    style={Styles.inputField} placeholder='New Deck Name'
                    value={this.state.newDeckName} />
                <TouchableOpacity style={Styles.button} onPress={this.handlePress}>
                    <Text style={Styles.buttonText}>Create Deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}
export default connect()(AddDeck)
