import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Styles } from '../utils/styles'
import { getDeck } from '../utils/api'
import { connect } from 'react-redux'
import Button from './Button'
class Quiz extends Component {
    state = {
        showAnswer: false,
        correctAnswers: 0,
        numOfAnsweredQ: 0,

        title: '',
        questions: [],

        remainingQuestions: 0,
        currentQuestion: {},
        score: 0,
        showScore: false
    }

    componentDidMount() {
        const { title } = this.props
        getDeck(title).then(result => {
            this.setState({
                title: result.title,
                questions: result.questions,
                remainingQuestions: result.questions.length,
                currentQuestion: result.questions[0]
            })
        })
    }

    showAnswer = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                showAnswer: true,
                remainingQuestions: prevState.remainingQuestions - 1
            }

        })
    }

    handleCorrectAnswer = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                correctAnswers: prevState.correctAnswers + 1,
                numOfAnsweredQ: prevState.numOfAnsweredQ + 1,
                score: prevState.score + 1,
                showAnswer: !prevState.showAnswer
            }
        })
        const { remainingQuestions } = this.state
        if (remainingQuestions === 0) {
            this.setState({ showScore: true })
        }
        else {
            this.getNextQuestion()
        }

    }

    handleIncorrectAnswer = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                numOfAnsweredQ: prevState.numOfAnsweredQ + 1,
                showAnswer: !prevState.showAnswer
            }
        })
        const { remainingQuestions } = this.state
        if (remainingQuestions === 0) {
            this.setState({ showScore: true })
        }
        else {
            this.getNextQuestion()
        }

    }

    getNextQuestion = () => {
        const { questions, currentQuestion } = this.state
        let index = questions.indexOf(currentQuestion)

        this.setState({ currentQuestion: questions[index + 1] })
    }

    reset = () => {
        const { questions } = this.state
        this.setState({
            currentQuestion: questions[0],
            score: 0,
            showScore: false,
            remainingQuestions: questions.length,
            correctAnswers: 0,
            numOfAnsweredQ: 0
        })
    }

    toDeck = (title) => {
        this.props.navigation.navigate(
            'Deck',
            { title }
        )
    }
    render() {
        const { showAnswer, title, questions, currentQuestion, remainingQuestions, showScore, score } = this.state

        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={Styles.quizHeader}>Quiz</Text>
                <Text style={Styles.title}>{title}</Text>

                <View style={{ flex: 1, alignItems: 'center' }}>
                    {showScore === false &&
                        <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}>Q:{currentQuestion.question}</Text>
                    }
                    {(showAnswer === false && showScore === false) &&
                        <Button text='Show Answer' color='rgba(255,0,0)' onPress={this.showAnswer} />

                    }
                    {showAnswer == true && (
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ padding: 10, fontSize: 20 }}>{currentQuestion.answer}</Text>
                            <Button text='Correct' backgroundColor='rgb(0,255,50)' onPress={this.handleCorrectAnswer} />
                            <Button text='Incorrect' backgroundColor='rgb(255,0,0)' onPress={this.handleIncorrectAnswer} />

                        </View>
                    )}

                    {showScore == false && (
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ marginTop: 50 }}>
                                {remainingQuestions} {remainingQuestions <= 1 ? 'question' : 'questions'} remaining</Text>
                        </View>
                    )}

                    {showScore == true && (
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={Styles.score}>Score</Text>
                            <Text style={[Styles.score, { marginTop: 0 }]}>{score}/{questions.length}</Text>
                            <Button text='Restart' onPress={this.reset} />
                            <Button text='Go Back' onPress={() => this.toDeck(title)} />
                        </View>
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