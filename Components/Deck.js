import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Styles } from '../utils/styles'
import { addDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { addEntry,  } from '../actions'
import { connect } from 'react-redux'
import { getDeck, deleteDeck } from '../utils/api'

class Deck extends Component {
    state = {
        deck: {},
        numOfCards: 0
    }

    componentDidMount() {
        const { title } = this.props
        getDeck(title).then(result => {
            this.setState({
                deck: result,
                numOfCards: result.questions.length
            })
        })
    }

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return {
            title
        }
    }



    render() {
        const { deck, numOfCards } = this.state
        console.log('in render')
        console.log(deck)

        return (
            <View style={Styles.container}>
                <Text style={Styles.title}>{deck.title}</Text>
                <Text style={Styles.subTitle}>{numOfCards} {numOfCards > 1 || numOfCards == 0 ? 'cards' : 'card'}</Text>

                <TouchableOpacity>
                    <Text style={Styles.button}>Add Card</Text>
                </TouchableOpacity>

                <TouchableOpacity >
                    {numOfCards > 1 &&
                        <Text style={[Styles.button, { backgroundColor: '#000000', color: '#FFFFFF' }]} >Start Quiz</Text>}
                </TouchableOpacity>


            </View>
        )
    }
}

const mapStateToProps = (state, { navigation }) => {
    const { title } = navigation.state.params

    return {
        title,

    }

}

const mapDispatchToProps = (dispatch, { navigation }) => {
    const { title } = navigation.state.params
    return {
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck)
