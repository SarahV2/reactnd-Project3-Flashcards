import { StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputField: {
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 5,
        padding: 10,
        margin: 5,
        fontSize: 24
    },
    button: {
        backgroundColor: 'rgba(0,0,165,0.5)',
        color: '#FFFFFF',
        borderColor: '#000000',
        tintColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
        padding: 10,
        marginTop: 10

    },
    buttonText: {
        fontSize: 20,
        color: '#FFFFFF'
    },
    deckTitle: {
        borderRadius: 3,
        borderWidth: 2,
        fontSize: 20,
        padding: 20
    }
});
