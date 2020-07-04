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
    await setInitialData()
    return await AsyncStorage.getItem(STORAGE_KEY)
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
    try{
    return await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList))
    }
    catch(e){
        console.log(e)
    }
    // return updatedList
}

