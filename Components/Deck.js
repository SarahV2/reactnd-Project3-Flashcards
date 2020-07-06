import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Styles } from '../utils/styles'
import { addDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { addEntry, } from '../actions'
import { connect } from 'react-redux'
import { getDeck, deleteDeck } from '../utils/api'
import { withNavigation } from 'react-navigation';
import { useNavigation } from '@react-navigation/native';

class Deck extends Component {
    state = {
        deck: {},
        numOfCards: 0
    }



    componentDidMount() {


        // const { title } = this.props
        // getDeck(title).then(result => {
        //     this.setState({
        //         deck: result,
        //         numOfCards: result.questions.length
        //     })
        // })
    }



    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return {
            title
        }
    }

    handlePress = () => {
        //  const {  } = navigation.state.params

        // const navigation = useNavigation();
        // navigation.navigate("AddCard")

        // this.props.navigation.navigate(
        //     'AddCard',
        //     { title })
        const { addCard } = this.props
        addCard()
    }
    startQuiz = () => {
       const  { navigation, title }=this.props
        navigation.navigate(
            'Quiz',
            { title })
    }

    render() {

        //const { deck, numOfCards } = this.state
        const { title } = this.props
        const { numOfCards } = this.props

        return (
            <View style={Styles.container}>
                <Text style={Styles.title}>{title}</Text>
                <Text style={Styles.subTitle}>{numOfCards} {numOfCards > 1 || numOfCards == 0 ? 'cards' : 'card'}</Text>

                <TouchableOpacity onPress={this.handlePress}>
                    <Text style={Styles.button}>Add Card</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.startQuiz} >
                    {numOfCards > 1 &&
                        <Text style={[Styles.button, { backgroundColor: '#000000', color: '#FFFFFF' }]} >Start Quiz</Text>}
                </TouchableOpacity>


            </View>
        )
    }
}

const mapStateToProps = (state, { navigation }) => {
    const { title } = navigation.state.params
    const numOfCards = state[title].questions.length;
    //const {numOfCards}=

    // getDeck(title).then(result => {
    //     // this.setState({
    //     //     deck: result,
    //     //     numOfCards: result.questions.length
    //     // })
    //     return {
    //         title,
    //         deck:result,
    //         numOfCards:result.questions.length

    //     }
    // })
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
