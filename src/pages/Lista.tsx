import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import { Login } from '../models/login.model';

export default function ListaPage() {

    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute()

    const [users, setUsers] = useState<Login[]>([]);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userData');
            const data = jsonValue != null ? JSON.parse(jsonValue) : [];
            setUsers(data);            
        } catch (e) {
            console.log("Erro: ", e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    function sair() {
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Lista de usuários cadastrados:</Text>
            </View>

            {users.length === 0 ? (
                <Text style={styles.text}>Nenhum usuário encontrado.</Text>
            ) : (
                <FlatList
                    data={users}
                    keyExtractor={(_item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Text style={styles.text}>
                            Usuário: {item.username}
                        </Text>
                    )}
                />
            )}

  
            <View style={styles.buttonView}>
                <Button title="Deslogar" onPress={sair} />
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
    buttonView: {
        marginTop: 20,
    },
});