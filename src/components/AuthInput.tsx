import React from "react"
import { View, TextInput, StyleSheet, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'


export default props => {
    return (
        <View style={[styles.container,props.style]}>
            <Icon name={props.icon} size={20} style={styles.icon} />
            <TextInput {...props} style={styles.input} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        backgroundColor:'#EEE',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        color: '#088',
        marginLeft: 20,
    },
    input: {
        width: '80%',
        borderRadius: 10,
        padding: Platform.OS == 'ios' ? 15 : 5,
    },
})