import { AsyncStorage } from 'react-native';

const STORAGE_KEY = '@decks'

const data = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}


export const setInitialData = async () => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return data
}


export const fetchDecks = async () => {

    const decks = await AsyncStorage.getItem(STORAGE_KEY)
    return await setInitialData(decks)
}

export const getDeck = async (title) => {
    const decks = await AsyncStorage.getItem(STORAGE_KEY)
    console.log('in getdeck method')
    //console.log('updated')

    const tdecks = JSON.parse(decks)
    for (let u in tdecks) {
        var user = tdecks[u]
        if (user.title === title) {
            //console.log(user)
            return user
        }
    }

}

export const deleteDeck = async (title) => {
    const decks = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
    for (let d in decks) {
        var deck = decks[d]
        if (deck.title === title) {
            decks[d] = undefined
            delete decks[d]
            return await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
        }
    }
}


export const addDeck = async (title) => {
    newDeck = {
        new: {
            title: title,
            questions: []
        }
    }
    const currentList = await fetchDecks()
    const updatedList = Object.assign(newDeck, currentList);
    try {
        return await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList))
    }
    catch (e) {
        console.log(e)
    }
}

