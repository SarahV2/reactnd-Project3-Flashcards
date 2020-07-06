import React, { Component, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Styles } from '../utils/styles'
import { addDeck } from '../utils/api'
import { addDeckToList } from '../actions'
import { connect } from 'react-redux'

class AddDeck extends Component {

    state = {
        newDeckName: '',
        inputError: false
    }

    handleChange = (input) => {

        this.setState({ newDeckName: input, inputError: false })

    }

    handlePress = async () => {
        const { dispatch } = this.props
        const newTitle = this.state.newDeckName

        if (!!newTitle.trim()) {

            // Update Redux
            dispatch(addDeckToList(newTitle))

            // Save to Storage
            await addDeck(newTitle)

            // Clear Input Field
            this.setState({
                newDeckName: '',
                inputError: false
            })

            // Navigate 
            this.toHome(newTitle)
        }

        else {
            this.setState({ inputError: true, newDeckName: '' })
        }

    }
    toHome = (title) => {
        this.props.navigation.navigate(
            'Deck',
            { title }
        )
    }
    render() {
        const { inputError } = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={Styles.container}>
                <Text style={{ fontSize: 20, }}>Add a new Deck</Text>
                <TextInput onChangeText={(text) => this.handleChange(text)}
                    style={Styles.inputField} placeholder='New Deck Name'
                    value={this.state.newDeckName} />
                {inputError && (<Text style={{ color: 'rgb(255,0,0)' }}>Please Input a valid name</Text>)}
                <TouchableOpacity style={Styles.button} onPress={this.handlePress}>
                    <Text style={Styles.buttonText}>Create Deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}
export default connect()(AddDeck)
