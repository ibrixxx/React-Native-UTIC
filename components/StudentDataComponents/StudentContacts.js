import React, {useEffect, useState} from 'react';
import axios from "axios";
import {TOKEN} from "../../App";
import {ActivityIndicator, DataTable, FAB, Title} from "react-native-paper";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {white} from "react-native-paper/src/styles/colors";
import {Picker} from "@react-native-picker/picker";

export default function StudentContacts({ navigation }) {
    const [student, setStudent] = useState({})
    const [contactTypes, setContactTypes] = useState({})
    const[isReady, setIsReady] = useState(false)
    const [showAddCard, setShowAddCard] = useState(false)
    const [contactTypeValue, setContactTypeValue] = useState("")
    const [contactValue, setContactValue] = useState("")

    useEffect(() => {
        getUserData();
        getContactTypes();
    }, [])

    const getUserData = () => {
        axios.get('http://192.168.44.79:8080/u/0/students/student/personal-information', {
            headers: {
                Accept: 'application/json',
                Authorization: TOKEN
            }
        })
            .then(respnse => {
                console.log(respnse.data)
                setStudent(respnse.data)
                setIsReady(true)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const getContactTypes = () => {
        axios.get(' http://192.168.44.79:8080/u/0/contact-types', {
            headers: {
                Accept: 'application/json',
                Authorization: TOKEN
            }
        })
            .then(respnse => {
                console.log(respnse.data)
                setContactTypes(respnse.data)
                setIsReady(true)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const postNewContact = () => {
        axios.post('http://192.168.44.79:8080/u/0/students/student/personal-information', {
            headers: {
                Accept: 'application/json',
                Authorization: TOKEN,

            }
        })
            .then(respnse => {
                console.log(respnse.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    if (!isReady) {
        return <ActivityIndicator style={{marginTop: '50%'}} color={'dodgerblue'} size={'large'}/>
    }


    function resetFields() {
        setShowAddCard(false)
        setContactValue("")
        setContactTypeValue("")
        setContactValue("")
    }

    return (
        <>
            <View style={{height: '100%'}}>
                {
                    !showAddCard ? <FAB
                        style={style.fab}
                        small
                        icon="plus"
                        onPress={() => setShowAddCard(true)}
                    /> : null
                }

                {
                    showAddCard ? <View style={style.card}>
                        <Title style={style.title}>Dodaj kontakt</Title>
                        <View style={{
                            borderWidth: 1,
                            borderColor: "#999999",
                            height: 40,
                            paddingTop: '3%',
                            marginBottom: 10
                        }}>
                            <Picker
                                selectedValue={contactTypeValue}
                                onValueChange={(itemValue, itemIndex) => setContactTypeValue(itemValue)}>
                                {(contactTypes && contactTypes.length !== 0) ? contactTypes.map((type) => (
                                    <Picker.Item label={type.name} value={type.id}/>
                                )) : <Text>Nema</Text>
                                }
                            </Picker>
                        </View>

                        <TextInput
                            style={{
                                backgroundColor: '#ffffff',
                                height: 40,
                                borderWidth: 1,
                                borderColor: "#999999",
                                padding: 5,
                                marginBottom: 10
                            }}
                            placeholder="Vrijednost"
                            onChangeText={contact => setContactValue(contact)}
                            value={contactValue}/>

                        <View style={{
                            flexDirection: 'row',
                            width: '90%',
                            justifyContent: 'space-between',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                            <Button
                                title="Odustani"
                                onPress={() => resetFields()}
                                style={{backgroundColor: 'blue'}}/>
                            <Button
                                title="Spremi"
                                onPress={() => {
                                    postNewContact();
                                    resetFields()
                                }}/>
                        </View>

                    </View> : null
                }

                <View style={style.container}>
                    <Title style={style.title}>Kontakt</Title>

                    <DataTable>
                        {
                            (student.contacts && student.contacts.length !== 0) ? student.contacts.map((contact) => (
                                    <DataTable.Row key={contact.value}>
                                        <DataTable.Cell numeric><Text
                                            style={style.TDStyleLeft}>{contact.type}  </Text></DataTable.Cell>
                                        <DataTable.Cell>{contact.value}</DataTable.Cell>
                                    </DataTable.Row>
                                ))
                                : <Text>Nema</Text>
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
        marginTop: 20,
        marginBottom: 20
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
    },
    TDStyleLeft: {
        fontWeight: 'bold'
    }
});