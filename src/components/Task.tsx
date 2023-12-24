import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome"
import commonStyles from "../commonStyles";
import moment from "moment";
import 'moment/locale/pt-br'


export default props => {

    const doneOrNot = props.done != null ?
        { textDecorationLine: 'line-through' } : {}

    const date = props.done ? props.done : props.estimate
    const formattedDate = moment(date).locale('pt-br')
        .format('ddd, D [de] MMMM')

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback 
                onPress={()=> props.toggleTask(props.id)}>
                <View style={styles.checkContainer}>
                    {getCheckView(props.done)}
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.desc, doneOrNot]}>{props.desc}</Text>
                <Text style={styles.date}>{formattedDate}</Text>
            </View>
        </View>
    )
}

function getCheckView(done) {
    if (done != null)
        return (
            <View style={styles.done}>
                <FAIcon name="check" size={15} color='#FFF' />
            </View>
        )
    else return (
        <View style={styles.pending} />
    )
}

//Estilos
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: "center",
        paddingVertical: 10
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'

    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#4D7031',
        backgroundColor: '#377120',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15,
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
    }
})