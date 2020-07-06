import React, { Component, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Styles } from '../utils/styles'
import { addDeck } from '../utils/api'
import { addDeckToList } from '../actions'
import { connect } from 'react-redux'

class AddDeck extends Component {

    state = {
        newDeckName: ''
    }

    handleChange = (input) => {

        this.setState({ newDeckName: input })

    }

    handlePress = async () => {
        const { dispatch } = this.props
        const newTitle = this.state.newDeckName

        // Update Redux
        dispatch(addDeckToList(newTitle))

        // Save to Storage
        await addDeck(newTitle)

        // Clear Input Field
        this.setState({ newDeckName: '' })

        // Navigate 
        this.toHome(newTitle)

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
