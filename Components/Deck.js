import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Styles } from '../utils/styles'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation';

class Deck extends Component {
    state = {
        deck: {},
        numOfCards: 0
    }

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return {
            title
        }
    }

    handlePress = () => {
        const { addCard } = this.props
        addCard()
    }
    startQuiz = () => {
        const { navigation, title } = this.props
        navigation.navigate(
            'Quiz',
            { title })
    }

    // Displays an alert when the user tries to start a quiz from a deck
    // that has less than two cards

    handleError = () => {
        alert('You need at least two cards in the deck to start a quiz')
    }

    render() {
        const { title } = this.props
        const { numOfCards } = this.props

        return (
            <View style={Styles.container}>
                <Text style={Styles.title}>{title}</Text>
                <Text style={Styles.subTitle}>{numOfCards} {numOfCards > 1 || numOfCards == 0 ? 'cards' : 'card'}</Text>

                <TouchableOpacity onPress={this.handlePress}>
                    <Text style={Styles.button}>Add Card</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={numOfCards >=2 ? this.startQuiz : this.handleError} >
                    <Text style={[Styles.button, { backgroundColor: '#000000', color: '#FFFFFF' }]} >Start Quiz</Text>
                </TouchableOpacity>



            </View>
        )
    }
}

const mapStateToProps = (state, { navigation }) => {
    const { title } = navigation.state.params
    const numOfCards = state[title].questions.length;
    return {
        title,
        numOfCards
    }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
    const { title } = navigation.state.params
    return {
        goBack: () => navigation.goBack(),
        addCard: () => navigation.navigate(
            'AddCard',
            { title }
        )
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Deck))
