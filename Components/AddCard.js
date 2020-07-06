import React, { Component, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, } from 'react-native'
import { Styles } from '../utils/styles'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'
import { connect } from 'react-redux'
import AddDeck from './AddDeck'

class AddCard extends Component {

    state = {
        question: '',
        answer: '',
        newDeckName: ''
    }
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return {
            title
        }
    }
    handleChange = (text, name) => {

        this.setState({ [name]: text })
    }

    handlePress = async () => {
        const { dispatch } = this.props
        const { question, answer } = this.state
        const { title } = this.props
        console.log(question)
        console.log(answer)
        const card = {
            question,
            answer
        }
        console.log(card)
        await addCardToDeck(title, card)
        this.setState({
            question: '',
            answer: ''
        })
        // // Update Redux
        await dispatch(addCard(title, card))
        // // Send to DB
        // await addDeck(newTitle)

        // console.log('added')

        this.toHome(title)
        //this.props.goBack()

        // this.setState({ newDeckName: '' })

        //addCardToDeck(this.props.title)
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
                <Text>Add a new question</Text>

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
