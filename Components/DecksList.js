import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Styles } from '../utils/styles'
import { fetchDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions';
class DecksList extends Component {
    state = {
        decks: ''
    }
    componentDidMount() {

        // fetchDecks()
        //     .then(results => {
        //         console.log(results)
        //         this.setState({ decks: results })
        //     })

            // the above works but isn't complete .. testing other stuff from UdaciFitness
    const { dispatch } = this.props;
    // console.log(this.props);
    fetchDecks()
      .then((entries) => { 
         //console.log(entries)
          dispatch(receiveEntries(entries))})
      
    //   .then(({ entries }) => {
         
        // if (!entries[timeToString()]) {
        //   dispatch(
        //     addEntry({
        //       [timeToString()]: getDailyReminderValue(),
        //     })
        //   );
        // }
    //   })

    }
    render() {
        const {entries}=this.props
         console.log(entries)
        // const { decks } = this.state
        // for (var key in decks) {
        //     if (decks.hasOwnProperty(key)) {
        //         console.log(key);
        //     }
        // }
        //const list=
        return (
            <View style={Styles.container}>
                <Text>View List Of Decks</Text>
                
            </View>
        )
    }
}

const mapStateToProps = (entries) => ({ entries });

export default connect(mapStateToProps)(DecksList)