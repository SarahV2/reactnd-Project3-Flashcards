import React from 'react'
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Styles } from '../utils/styles'

export default function Button(props) {
    const { text, color, onPress,backgroundColor,specialStyling } = props
    console.log(text)
    return (
        <TouchableOpacity style={[Styles.button,{backgroundColor,specialStyling}]} onPress={onPress}>
            <Text style={Styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}
