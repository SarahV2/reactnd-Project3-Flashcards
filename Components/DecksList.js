import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { Styles } from '../utils/styles'
import { fetchDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions';
class DecksList extends Component {
    state = {
        decks: ''
    }
    componentDidMount() {
        const { dispatch } = this.props;
        fetchDecks()
            .then((entries) => {
                dispatch(receiveEntries(entries))
            })

    }
    render() {
        const { entries } = this.props
        let listOfDecks = [];
        if (entries) {
            for (let q in entries) {
                var entry = entries[q]
                listOfDecks.push(entry)
            }
        }
        return (
            <View style={Styles.container}>

                <Text style={{ fontSize: 20, marginBottom: 10 }}>List Of Decks</Text>
                {listOfDecks.map(deck => (
                    <TouchableOpacity key={deck.title} onPress={() => this.props.navigation.navigate(
                        'Deck',
                        { title: deck.title }
                    )}>
                        <Text style={Styles.deckTitle}>{deck.title}</Text>
                    </TouchableOpacity>
                ))}


            </View>
        )
    }
}

const mapStateToProps = (entries) => ({ entries });

export default connect(mapStateToProps)(DecksList)