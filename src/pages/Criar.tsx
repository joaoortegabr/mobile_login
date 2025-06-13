import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import { Login } from '../models/login.model';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CriarPage() {

    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute()

    const [username, onChangeUsername] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [checkPassword, onCheckPassword] = React.useState('');

async function criar() {
    console.log('Username: ', username);
    console.log('Password', password);

    if (!verifyPassword()) return;

    try {
        const existingData = await AsyncStorage.getItem('userData');
        const users: Login[] = existingData ? JSON.parse(existingData) : [];

        const userExists = users.some(user => user.username === username);

        if (userExists) {
            console.log('Usuário já existe. Fazendo login.');
            navigation.navigate('Lista');
            return;
        }

        const login: Login = { username, password };
        users.push(login);
        await AsyncStorage.setItem('userData', JSON.stringify(users));
        console.log('Novo usuário criado com sucesso.');
        navigation.navigate('Lista');

    } catch (e) {
        console.log('Erro ao criar usuário:', e);
    }
}

    function verifyPassword(): boolean {
        if(password != checkPassword) {
            console.log('Password deve ser igual nos dois campos.');
            return false;
        }
        return true;
    }

    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <Text>Seja bem-vindo!</Text>
            </View>

            <Text
                 style={styles.label}>Nome do usuário: </Text>
             <TextInput
                 style={styles.input}
                 onChangeText={onChangeUsername}
                 value={username}
                 placeholder="Escolha seu nome de usuário"
             />
 
             <Text
                 style={styles.label}>Senha: </Text>
             <TextInput
                 style={styles.input}
                 onChangeText={onChangePassword}
                 value={password}
                 placeholder="Escolha sua senha"
             />
 
             <Text
                 style={styles.label}>Confirmar senha: </Text>
             <TextInput
                 style={styles.input}
                 onChangeText={onCheckPassword}
                 value={checkPassword}
                 placeholder="Confirme sua senha"
             />
 
             <View style={styles.buttonView}>
                 <Button title="Criar conta" onPress={criar} />
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