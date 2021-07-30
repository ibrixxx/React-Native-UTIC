import React, {useEffect, useState} from 'react';
import axios from "axios";
import {TOKEN} from "../../App";
import {ActivityIndicator, DataTable, FAB, Portal, Provider, Title} from "react-native-paper";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {white} from "react-native-paper/src/styles/colors";
import AddContactModal from "../Modals/AddContactModal";

export default function StudentContacts({ navigation }) {
    const [student, setStudent] = useState({})
    const[isReady, setIsReady] = useState(false)
    const [visible, setVisible] = React.useState(false)

    const showModal = () => {setVisible(true)}
    const hideModal = () => setVisible(false)


    useEffect(() => {
        getUserData();
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


    /*function resetFields() {
        setShowAddCard(false)
        setContactValue("")
        setContactTypeValue("")
        setContactValue("")
    }*/

    return (
        <>
            <View style={{height: '100%'}}>
                <FAB
                    style={style.fab}
                    small
                    icon="plus"
                    onPress={() => showModal()}
                />

                <View style={style.container}>
                    <Title style={{color: 'dodgerblue', fontWeight: 'bold', fontSize: 18, marginBottom: 10, textAlign: 'center'}}>Kontakt</Title>

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
            <Provider>
                <Portal>
                    <AddContactModal visible={visible} hideModal={hideModal}/>
                </Portal>
            </Provider>
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