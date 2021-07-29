import React, {useEffect, useState} from 'react';
import axios from "axios";
import {TOKEN} from "../../App";
import {DataTable, FAB, Title} from "react-native-paper";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {white} from "react-native-paper/src/styles/colors";
import {Picker} from "@react-native-picker/picker";

export default function StudentContacts({ navigation }){
    const[student, setStudent] = useState({})
    const[showAdd, setShowAdd] = useState(false)

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
                {
                    !showAdd ? <FAB
                        style={style.fab}
                        small
                        icon="plus"
                        onPress={() => setShowAdd(true)}
                    /> : null
                }

                {
                    showAdd ?  <View style={style.card}>
                        <Title style={style.title}>Dodaj kontakt</Title>
                        <View style={{ borderWidth: 1, height: 40, paddingTop: '3%', marginBottom: 10}}>
                            <Picker>
                                <Picker.Item label="nesta" value={0} />
                            </Picker>
                        </View>

                        <TextInput
                            style={{ backgroundColor: '#ffffff', height: 40, borderWidth: 1, padding: 5, marginBottom: 10 }}
                            placeholder="Vrijednost"/>

                        <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto' }}>
                            <Button
                                title="Odustani"
                                onPress={() => setShowAdd(false)}
                                style={{ backgroundColor: 'blue' }} />
                            <Button title="Spremi" />
                        </View>

                    </View> : null
                }

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
    card: {
        backgroundColor: white,
        width: '90%',
        padding: 20,
        borderRadius: 15,
        elevation: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20
    },
    container: {
        width: '100%',
        padding: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
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