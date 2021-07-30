import React, {useEffect} from 'react'
import {StyleSheet, Text, View} from "react-native";
import MyHeader from "./MyHeader";
import {white} from "react-native-paper/src/styles/colors";
import axios from "axios";
import {TOKEN} from "../App";
import {DataTable, Title} from "react-native-paper";
import {Icon} from "react-native-elements";

export default function Contacts({ navigation }) {
    const [importantContacts, setImportantContacts] = React.useState({});
    const [phone, setPhone] = React.useState({});
    const [mail, setMail] = React.useState({});
    const [website, setWebsite] = React.useState({});

    useEffect(() => {
        getImportantContacts()
    }, [])

    const getImportantContacts = () => {
        axios.get(' http://192.168.44.79:8080/u/0/additional-information/important-contacts', {
            headers: {
                Accept: 'application/json',
                Authorization: TOKEN
            }
        })
            .then(respnse => {
                console.log(respnse.data)
                setImportantContacts(respnse.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <View>
            <MyHeader myTitle="Kontakti" navigation={navigation}/>

            <View style={style.container}>
                <Title style={style.titleMain}>{(importantContacts && importantContacts.length > 0) ? importantContacts[0].facultyName : ""}</Title>
                <DataTable style={{ width: '80%' }}>
                    <DataTable.Row>
                        <DataTable.Cell style={{ flex: 0.3 }}><Icon name='phone' /></DataTable.Cell>
                        <DataTable.Cell style={{ flex: 0.7 }}>
                            {(importantContacts && importantContacts.length > 0) ?
                                (importantContacts[0].facultyContact && importantContacts[0].facultyContact.length > 0) ?
                                    importantContacts[0].facultyContact.map((cont) => (
                                        (cont.contactType === "telefon") ? cont.value : ""
                                    ))
                                    : ""
                                : ""}
                        </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell style={{ flex: 0.3 }}><Icon name='email' /></DataTable.Cell>
                        <DataTable.Cell style={{ flex: 0.7 }}>
                            {(importantContacts && importantContacts.length > 0) ?
                                (importantContacts[0].facultyContact && importantContacts[0].facultyContact.length > 0) ?
                                    importantContacts[0].facultyContact.map((cont) => (
                                        (cont.contactType === "primarni e-mail") ? cont.value : ""
                                    ))
                                    : ""
                                : ""}
                        </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell style={{ flex: 0.3 }}><Icon name='language' /></DataTable.Cell>
                        <DataTable.Cell style={{ flex: 0.7 }}>
                            {(importantContacts && importantContacts.length > 0) ?
                                (importantContacts[0].facultyContact && importantContacts[0].facultyContact.length > 0) ?
                                    importantContacts[0].facultyContact.map((cont) => (
                                        (cont.contactType === "web stranica") ? cont.value : ""
                                    ))
                                    : ""
                                : ""}
                        </DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </View>

            <View style={style.container}>
                <Title style={style.titleMain}>UNSA</Title>
                <DataTable style={{ width: '80%' }}>
                    <DataTable.Row>
                        <DataTable.Cell style={{ flex: 0.3 }}><Icon name='phone' /></DataTable.Cell>
                        <DataTable.Cell style={{ flex: 0.7 }}>

                        </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell style={{ flex: 0.3 }}><Icon name='email' /></DataTable.Cell>
                        <DataTable.Cell style={{ flex: 0.7 }}>

                        </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell style={{ flex: 0.3 }}><Icon name='language' /></DataTable.Cell>
                        <DataTable.Cell style={{ flex: 0.7 }}>

                        </DataTable.Cell>
                    </DataTable.Row>
            </DataTable>
            </View>

            <View style={style.container}>
                <Title style={style.titleMain}>UTIC</Title>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '90%',
        backgroundColor: white,
        padding: 15,
        borderRadius: 15,
        borderTopColor: '#009FFD',
        borderTopWidth: 2,
        elevation: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15
    },
    titleMain: {
        fontSize: 20,
        textAlign: 'center',
        color: "#434343",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        width: '100%'
    }
});