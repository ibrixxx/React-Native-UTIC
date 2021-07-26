import React, {useEffect, useState} from 'react';
import axios from "axios";
import {TOKEN} from "../../App";
import {DataTable, FAB, Title} from "react-native-paper";
import {StyleSheet, Text, View} from "react-native";
import {white} from "react-native-paper/src/styles/colors";

export default function StudentContacts({ navigation }){
    const[student, setStudent] = useState({})

    useEffect(() => {
        getUserData();
    }, [])

    const getUserData = () => {
        axios.get(' http://192.168.44.83:8080/u/0/students/student/personal-information', {
            headers: {
                Accept: 'application/json',
                Authorization: TOKEN
            }
        })
            .then(respnse => {
                console.log(respnse.data)
                setStudent(respnse.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <>
            <View style={{ height: '100%' }}>
                <FAB
                    style={style.fab}
                    small
                    icon="plus"
                    onPress={() => navigation.navigate('AddPhone')}
                />
                <View style={style.container}>
                    <Title style={style.title}>Kontakt</Title>

                    <DataTable>
                        {
                            (student.contacts && student.contacts.length !== 0)?student.contacts.map((contact) => (
                                    <DataTable.Row key={contact.value}>
                                        <DataTable.Cell numeric>{contact.type}  </DataTable.Cell>
                                        <DataTable.Cell>{contact.value}</DataTable.Cell>
                                    </DataTable.Row>
                                ))
                                :<Text>Nema</Text>
                        }

                    </DataTable>

                </View>

            </View>
        </>
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: white,
        width: '90%',
        padding: 15,
        borderRadius: 15,
        elevation: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50
    },
    title: {
        textAlign: 'center',
        marginBottom: 10
    },
    fab: {
        width: 55,
        height: 55,
        backgroundColor: '#434343',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginBottom: 20,
        marginRight: 20,
        bottom: 0,
        right: 0,
        zIndex: 1000
    }
});