import React, {useEffect, useState} from 'react';
import axios from "axios";
import {TOKEN} from "../../App";
import {ActivityIndicator, DataTable, FAB, Portal, Provider, Title, Button, Snackbar} from "react-native-paper";
import {Clipboard, StyleSheet, Text, TextInput, View} from "react-native";
import {white} from "react-native-paper/src/styles/colors";
import AddContactModal from "../Modals/AddContactModal";
import ContactModal from "../Modals/ContactModal";
import Icon from "react-native-vector-icons/FontAwesome";

export default function StudentContacts({ navigation }) {
    const [student, setStudent] = useState({})
    const[isReady, setIsReady] = useState(false)
    const [FABVisible, setFABVisible] = useState(true);
    const [visibleAdd, setVisibleAdd] = useState(false)
    const [visibleContacts, setVisibleContacts] = useState(false);
    const [curr, setCurr] = useState(null)


    const showAddModal = () => {setFABVisible(false); setVisibleAdd(true)}
    const hideAddModal = () => {
        setVisibleAdd(false)
        setFABVisible(true)
        getUserData()
    }

    const showContactsModal = (i) => {setFABVisible(false); setVisibleContacts(true); setCurr(i)}
    const hideContactsModal = () => {
        setVisibleContacts(false)
        setFABVisible(true)
        getUserData()
    }


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

    if (!isReady) {
        return <ActivityIndicator style={{marginTop: '50%'}} color={'#2C8BD3'} size={'large'}/>
    }

    function getIcon(str) {
        if (str === "primarni e-mail" || str === "e-mail") return <Icon name="envelope" size={20} color="black" />
        else if (str === "telefon") return <Icon name="phone" size={20} color="black" />
        else if (str === "mobilni telefon") return <Icon name="mobile-phone" size={20} color="black" />
        else if (str === "fax") return <Icon name="fax" size={20} color="black" />
        else if (str === "web stranica") return <Icon name="globe" size={20} color="black" />
    }



    return (
        <>
            <View style={{height: '100%'}}>
                {
                    FABVisible ? <FAB
                        style={style.fab}
                        small
                        icon="plus"
                        onPress={() => showAddModal()}
                    /> : null
                }


                <View style={style.container}>

                    <DataTable style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: 20 }}>
                        {
                            (student.contacts && student.contacts.length !== 0) ? student.contacts.map((contact, i) => (
                                    <DataTable.Row key={contact.value}>
                                        <DataTable.Cell style={{ flex: 0.2 }}><Text
                                            style={style.TDStyleLeft}>{getIcon(contact.type)}</Text></DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 0.7 }}>{contact.value}</DataTable.Cell>
                                        <DataTable.Cell numeric style={{ flex: 0.1, paddingLeft: 10, paddingRight: 10 }} onPress={() => showContactsModal(i)}>
                                                <Icon name="pencil" size={20} color="#2C8BD3"/>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                ))
                                : <Text>Nema</Text>
                        }

                    </DataTable>

                </View>


            </View>



            <Provider>
                <Portal>
                    <AddContactModal visibleAdd={visibleAdd} hideAddModal={hideAddModal}/>
                    <ContactModal visibleContacts={visibleContacts} hideContactsModal={hideContactsModal} index={curr} student={student}/>
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
        backgroundColor: '#263238',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginBottom: 20,
        marginRight: 20,
        bottom: 0,
        right: 0,
        zIndex: 2
    },
    TDStyleLeft: {
        fontWeight: 'bold'
    }
});