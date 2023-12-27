import React from "react";
import {
    View, Text, StyleSheet,
    TouchableWithoutFeedback, TouchableOpacity
} from "react-native";
import commonStyles from "../commonStyles";
import moment from "moment";
import 'moment/locale/pt-br'
import FAIcon from "react-native-vector-icons/FontAwesome";
import { Directions, GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";



export default props => {

    const doneOrNot = props.done != null ?
        { textDecorationLine: 'line-through' } : {}

    const date = props.done ? props.done : props.estimate
    const formattedDate = moment(date).locale('pt-br')
        .format('ddd, D [de] MMMM')

    const getRightContent = () => {
        return (

            <TouchableOpacity style={styles.right}
                onPress={() => props.onDelete && props.onDelete(props.id)}>
                <FAIcon name='trash' size={25} color='#FFF' />
            </TouchableOpacity>
        )
    }

    const getLeftContent = () => {
        return (

            <View style={styles.left}>
                <FAIcon name='trash' size={25} color='#FFF' />
                <Text style={styles.excludeText} >Excluir</Text>
            </View>
        );
    }



    return (
        <GestureHandlerRootView>
            <Swipeable
                onSwipeableLeftOpen={(()=> props.onDelete && props.onDelete(props.id))}

                renderRightActions={getRightContent}
                renderLeftActions={getLeftContent}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback
                        onPress={() => props.onToggleTask(props.id)}>
                        <View style={styles.checkContainer}>
                            {getCheckView(props.done)}
                        </View>
                    </TouchableWithoutFeedback>
                    <View>
                        <Text style={[styles.desc, doneOrNot]}>{props.desc}</Text>
                        <Text style={styles.date}>{formattedDate}</Text>
                    </View>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
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
        paddingVertical: 10,
        backgroundColor: '#FFF'
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
    },
    right: {
        backgroundColor: commonStyles.colors.today,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20

    },
    left: {
        flex: 1,
        backgroundColor: commonStyles.colors.today,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 16,
        margin: 10,
    }
})