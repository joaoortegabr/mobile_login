import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import { Login } from '../models/login.model';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage() {

    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute()

    const [username, onChangeUsername] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    async function login() {
        console.log('Username: ', username);
        console.log('Password', password);

        try {
            const existingData = await AsyncStorage.getItem('userData');
            const users: Login[] = existingData ? JSON.parse(existingData) : [];

            const foundUser = users.find(
                user => user.username === username && user.password === password
            );

            if (foundUser) {
                console.log('Usuário encontrado. Redirecionando para Lista.');
                navigation.navigate('Lista');
            } else {
                console.log('Usuário não encontrado. Redirecionando para Criar Nova Conta.');
                navigation.navigate('Criar');
            }

        } catch (e) {
            console.log('Erro ao fazer login:', e);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <Text>Seja bem-vindo!</Text>
            </View>

            <Text
                style={styles.header}>Acesse seu perfil</Text>

            <Text
                style={styles.label}>Nome do usuário: </Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Informe seu nome de usuário"
            />

            <Text
                style={styles.label}>Senha: </Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Informe sua senha"
            />

            <View style={styles.buttonView}>
                <Button title="Entrar" onPress={login} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        textAlign: 'center'
    },
    header: {
        fontSize: 24,
        fontWeight: 600,
        paddingTop: 10,
        paddingBottom: 4,
        textAlign: 'center'
    },
    text: {
        paddingTop: 5,
        paddingBottom: 4,
    },
    label: {
        paddingTop: 10,
        paddingBottom: 4,
        fontWeight: 500
    },
    input: {
        height: 40,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 4,
        padding: 2
    },
    buttonView: {
        marginTop: 20,
    },
});