import React, { Component, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, } from 'react-native'
import { Styles } from '../utils/styles'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'
import { connect } from 'react-redux'

class AddCard extends Component {

    state = {
        question: '',
        answer: '',
        newDeckName: '',
        inputError: false,
        invalidValue: ''

    }
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return {
            title
        }
    }

    handleChange = (text, name) => {
        this.setState({ [name]: text, inputError: false })
    }

    handlePress = async () => {

        const { dispatch } = this.props
        const { question, answer } = this.state
        const { title } = this.props
        if (!!question.trim() && !!answer.trim()) {
            const card = {
                question,
                answer
            }

            // Save to Storage
            await addCardToDeck(title, card)

            // Update Redux
            await dispatch(addCard(title, card))

            // Empty Input Fields and reset the error state
            this.setState({
                question: '',
                answer: '',
                inputError: false,
                invalidValue: ''
            })

            // Navigate back to the deck screen
            this.toHome(title)
        }
        else {
            this.setState({ inputError: true })

            // Check which input field (state) is causing the issue and then reset its value
            if (!(!!question.trim())) {
                this.setState({ question: '', invalidValue: 'question' })
            }
            else {
                this.setState({ answer: '', invalidValue: 'answer' })
            }
        }
    }
    toHome = (title) => {
        this.props.navigation.navigate(
            'Deck',
            { title }
        )
    }

    render() {
        const { inputError, invalidValue } = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={Styles.container}
                keyboardVerticalOffset={Platform.select({ ios: 120, android: 500 })}
                enabled>
                <View style={Styles.container}>
                    <Text style={{ paddingTop: 30, marginTop: 10, fontSize: 20, padding: 10 }}>Add a new question</Text>
                    {inputError && (<Text style={{ color: 'rgb(255,0,0)' }}>Please Enter a valid {invalidValue} </Text>)}
                    <TextInput onChangeText={(text) => { this.handleChange(text, 'question') }}
                        style={Styles.inputField} placeholder='New Question'
                        value={this.state.question}
                    />

                    <TextInput onChangeText={(text) => { this.handleChange(text, 'answer') }}
                        style={Styles.inputField} placeholder='Answer'
                        value={this.state.answer}
                    />

                    <TouchableOpacity style={Styles.button} onPress={this.handlePress}>
                        <Text style={Styles.buttonText}>Add Card</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = (state, { navigation }) => {
    const { title } = navigation.state.params
    return {
        title,
    }
}

const mapDispatchToProps = dispatch => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
