export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export const receiveDecks = (decks) => {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

export const addDeckToList = (title) => {
    return {
        type: ADD_DECK,
        title,
    }
}

export const addCard = (title, card) => {
    return {
        type: ADD_CARD,
        title,
        card
    }
}

