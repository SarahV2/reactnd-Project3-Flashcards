import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Styles } from '../utils/styles'

export default function Button(props) {
    const { text, color, onPress, backgroundColor } = props
    return (
        <TouchableOpacity style={[Styles.button, { backgroundColor}]} onPress={onPress}>
            <Text style={Styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}
