import React, { Component } from "react"
import { View, ActivityIndicator, StyleSheet } from "react-native" 
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default class AuthOrApp extends Component {
    componentDidMount = async () => {
        const userDataJason = await AsyncStorage.getItem('userData')
        let userData = null
        try {
            userData = JSON.parse(userDataJason)
        } catch (e) {
            
        }
        if(userData && userData.token) {
            axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
            this.props.navigation('Home',userData)
        } else {
            this.props.navigation('Auth')
        }
    }
        
    
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' />
            </View>
        )
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#000',
    },
})