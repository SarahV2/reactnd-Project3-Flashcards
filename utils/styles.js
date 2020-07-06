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
        fontSize: 24,
        width: 250,
        marginBottom: 10,
        textAlign: 'center'
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
        marginTop: 10,

    },
    buttonText: {
        fontSize: 20,
        color: '#000000',
        textAlign: 'center'
    },
    deckTitle: {
        borderRadius: 5,
        borderWidth: 2,
        fontSize: 20,
        padding: 10,
        width: 250,
        margin: 5,
        textAlign: 'center'
    },
    title: {
        color: 'rgb(255,100,200)',
        fontWeight: 'bold',

        fontSize: 40
    },
    subTitle: {
        marginBottom: 20
    },
    deleteButton: {
        color: 'rgb(255,0,0)',
        marginTop: 10
    },
    button: {
        borderRadius: 5,
        borderWidth: 2,
        fontSize: 20,
        padding: 10,
        width: 150,
        marginBottom: 5,
        textAlign: 'center'
    },
    formContainer: {
        marginTop: 30,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    quizHeader:{
        fontSize:30,
        marginTop:50
    },
    score:{
        fontSize:20,
        fontWeight:'bold',
        marginTop:50,
        marginBottom:5
    },
    scrollView:{
        marginTop:50,
        textAlign:'center'
    }
});
