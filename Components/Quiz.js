import React, { Component } from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import { Styles } from '../utils/styles'
import { getDeck } from '../utils/api'
import { connect } from 'react-redux'
import Button from './Button'
class Quiz extends Component {
    state = {
        showAnswer: false,
        correctAnswers: 0,
        numOfAnsweredQ: 0,
        deck: {},
        questions: [],
        numOfCards: 0,
        remainingQuestions: 0,
        currentQuestion: {},
        score: 0,
        showScore:false
    }

    componentDidMount() {
        const { title } = this.props
        getDeck(title).then(result => {
            this.setState({
                deck: result,
                questions: result.questions,
                numOfCards: result.questions.length,
                remainingQuestions: result.questions.length,
                currentQuestion: result.questions[0]
            })
        })
    }

    showAnswer = () => {
        this.setState({ showAnswer: true })
    }

    handleCorrectAnswer = () => {
        this.setState({

        })
    }
    handleIncorrectAnswer = () => {

    }

    render() {
        const { questions, showAnswer, deck, currentQuestion, remainingQuestions,showScore } = this.state
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={Styles.quizHeader}>Quiz</Text>
                <Text style={Styles.title}>{deck.title}</Text>

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{padding:10,fontSize:20,fontWeight:'bold'}}>Q:{currentQuestion.question}</Text>

                    {showAnswer === false &&
                        <Button text='Show Answer' color='rgba(255,0,0)' onPress={this.showAnswer} />

                    }
                    {showAnswer == true && (
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{padding:10,fontSize:20}}>{currentQuestion.answer}</Text>
                            <Button text='Correct' backgroundColor='rgb(0,255,50)' onPress={this.handleCorrectAnswer} />
                            <Button text='Incorrect' backgroundColor='rgb(255,0,0)' onPress={this.handleIncorrectAnswer} />

                        </View>
                    )}

                    {showScore == true && (
                        <Text>Score</Text>
                    )}
                </View>


            </View>
        )
    }
}
const mapDispatchToProps = (dispatch, { navigation }) => {
    const { title } = navigation.state.params
    return {
        title
    }
}

export default connect(null, mapDispatchToProps)(Quiz)