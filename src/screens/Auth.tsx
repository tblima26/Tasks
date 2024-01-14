import React, { Component } from "react";
import {
    ImageBackground, Text, StyleSheet,
    View, TouchableOpacity, Alert,
} from "react-native";

import backgroundImg from '../../assets/imgs/login.jpg'
import commonStyles from "../commonStyles";
import AuthInput from "../components/AuthInput";
import { server, showError, showSuccess } from "../common";
import axios from "axios";

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false,
}

export default class Auth extends Component {
    state = {
        ...initialState
    }

    signInOrUp = () => {

        if (this.state.stageNew) {
            this.signUp()
        } else {
            this.signIn()
        }
    }

    signUp = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })
            showSuccess('Usúario cadastrado.')
            this.setState({ ...initialState })
        } catch (e) {
            showError(e)
        }

    }

    signIn = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password,
            })
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`;
            this.props.navigation.navigate('Home')
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)
        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.password === this.state.confirmPassword)
        }
        const validForm = validations.reduce((t, a) => t && a)
        return (



            <ImageBackground source={backgroundImg} style={styles.background}>
                <Text style={styles.title}> Tasks </Text>

                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {
                            this.state.stageNew ? 'Crie sua conta' : 'Informe seus dados'
                        }
                    </Text>
                    {
                        this.state.stageNew &&
                        <AuthInput icon='user'
                            placeholder="Nome"
                            value={this.state.name}
                            style={styles.input}
                            onChangeText={name => this.setState({ name })} />
                    }
                    <AuthInput icon='at'
                        placeholder="E-mail"
                        value={this.state.email}
                        style={styles.input}
                        onChangeText={email => this.setState({ email })} />
                    <AuthInput icon='lock'
                        placeholder="Senha"
                        value={this.state.password}
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={password => this.setState({ password })} />
                    {
                        this.state.stageNew &&
                        <AuthInput icon='lock'
                            placeholder="Confirme sua Senha"
                            value={this.state.confirmPassword}
                            secureTextEntry={true}
                            style={styles.input}
                            onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                    }
                    <TouchableOpacity onPress={this.signInOrUp}
                        disabled={!validForm}>
                        <View style={[styles.button, validForm ? {} : {backgroundColor: '#AAA'}]}>
                            <Text style={styles.btText}>
                                {
                                    this.state.stageNew ? 'Registrar' : 'Entrar'
                                }
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ padding: 10 }}
                    onPress={() => {
                        this.setState({ stageNew: !this.state.stageNew })

                    }}>
                    <Text style={styles.btText}>
                        {
                            this.state.stageNew ? 'Ja possui conta?' : 'Registre-se'
                        }
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        )

    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secundary,
        fontSize: 70,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secundary,
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center'
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0, 0.5)',
        padding: 20,
        width: '80%',
        borderRadius: 10


    },
    button: {
        backgroundColor: '#088',
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',


    },
    btText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    },
    input: {
        marginTop: 10,
    }
})