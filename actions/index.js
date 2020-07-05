export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'
export const REMOVE_DECK = 'REMOVE_DECK'

export const receiveEntries = (entries) => {
    console.log(entries)
    return {
        type: RECEIVE_ENTRIES,
        entries,
    }
}

export const addEntry = (entry) => {
    console.log('in action')
    console.log(entry)

    return {
        type: ADD_ENTRY,
        entry,
    }
}

