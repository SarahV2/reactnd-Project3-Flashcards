import { RECEIVE_ENTRIES, ADD_ENTRY, REMOVE_DECK } from '../actions'

function entries(state = {}, action) {
    switch (action.type) {
        case RECEIVE_ENTRIES:
            return {
                ...state,
                ...action.entries,
            }
        case ADD_ENTRY:
            console.log('in reducer')
            console.log(state)
            console.log('that is it!')
            return {
                ...state,
                [action.entry]: {
                    title: action.entry,
                    questions: []
                }
            }


        default:
            return state
    }
}

const findDeck = (title) => {

}
export default entries