import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import React from 'react';

export default function HomePage() {

    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute()

    function criar() {
        navigation.navigate('Criar');   
    }

    function login() {
        navigation.navigate('Login');   
    }

    return (
       <View style={styles.container}>
            <Text 
                style={styles.header}>Primeira vez?</Text>

            <Text
                style={styles.text}>Crie seu acesso agora</Text>

            <View style={styles.buttonView}>
                <Button title="Criar nova conta" onPress={criar} />
            </View>


            <Text
                style={styles.header}>Já tem cadastro?</Text>

            <Text
                style={styles.text}>Faça seu login</Text>

            <View style={styles.buttonView}>
                <Button title="Entre com sua conta" onPress={login} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#ccc'
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
    list: {
        width: '100%',
        height: '100%'
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
})