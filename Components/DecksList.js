import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, ScrollView } from 'react-native'
import { Styles } from '../utils/styles'
import { fetchDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions';
class DecksList extends Component {

    state = {
        decks: ''
    }

    componentDidMount() {
        const { dispatch } = this.props;
        fetchDecks()
            .then((results) => {
                dispatch(receiveDecks(results))
            })
    }

    render() {
        const { decks } = this.props
        let listOfDecks = [];
        if (decks) {
            for (let q in decks) {
                var deck = decks[q]
                listOfDecks.push(deck)
            }
        }
        return (
            <SafeAreaView style={Styles.container}>
                <ScrollView style={{ marginTop: 50 }}>
                    <Text style={{ fontSize: 20, marginBottom: 10, alignSelf: 'center' }}>Choose a Deck</Text>
                    {listOfDecks.map(deck => (
                        <TouchableOpacity key={deck.title} onPress={() => this.props.navigation.navigate(
                            'Deck',
                            { title: deck.title }
                        )}>
                            <Text style={Styles.deckTitle}>{deck.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (decks) => ({ decks });

export default connect(mapStateToProps)(DecksList)