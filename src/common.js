import { Alert, Platform } from "react-native"

const server = Platform.OS ==='ios' ?
    'http://localhost:3300' : 'http://10.0.2.2:3300'

function showError(err) {
    Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err}`)
}

function showSuccess(msg) {
    Alert.alert('Sucesso', msg)
}

export {server , showError, showSuccess}