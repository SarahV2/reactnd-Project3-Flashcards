import { RECEIVE_ENTRIES, ADD_ENTRY, REMOVE_DECK, ADD_CARD } from '../actions'

function entries(state = {}, action) {
    switch (action.type) {
        case RECEIVE_ENTRIES:
            return {
                ...state,
                ...action.entries,
            }
        case ADD_ENTRY:
            return {
                ...state,
                [action.entry]: {
                    title: action.entry,
                    questions: []
                }
            }
        case ADD_CARD:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    questions: [...state[action.title].questions.concat(action.card)]
                }
            }

        default:
            return state
    }
}

const findDeck = (title) => {

}
export default entries