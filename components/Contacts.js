import React, {useEffect} from 'react'
import {ScrollView, StyleSheet, Text, View} from "react-native";
import MyHeader from "./MyHeader";
import {white} from "react-native-paper/src/styles/colors";
import axios from "axios";
import {TOKEN} from "../App";
import {DataTable, Title} from "react-native-paper";
import {Icon} from "react-native-elements";
import {Linking} from "react-native";

export default function Contacts({ navigation }) {
    const [importantContacts, setImportantContacts] = React.useState({});
    const [website, setWebsite] = React.useState({});

    const unsaPhone = "0038733565100";
    const unsaMail = "javnost@unsa.ba";
    const unsaWebsite = "http://www.unsa.ba";

    const uticPhone = "0038733560240";
    const uticFax = "0038733213773";
    const uticMail = "eunsa@unsa.ba";
    const uticWebsite = "http://www.utic.unsa.ba";

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

            <ScrollView
                contentContainerStyle={{ padding: 10, paddingBottom: 30}}
                style={{ height: '90%', marginBottom: 10 }}>

                <View style={style.container}>
                    <Title style={style.titleMain}>{(importantContacts && importantContacts.length > 0) ? importantContacts[0].facultyName : ""}</Title>
                    <DataTable>
                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 0.3 }}><Icon name='phone' /></DataTable.Cell>
                            <DataTable.Cell style={{ flex: 0.7 }}>
                                {(importantContacts && importantContacts.length > 0) ?
                                    (importantContacts[0].facultyContact && importantContacts[0].facultyContact.length > 0) ?
                                        importantContacts[0].facultyContact.map((cont) => (
                                            (cont.contactType === "telefon") ?
                                                cont.value : ""
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
                                            (cont.contactType === "web stranica") ?
                                                <Text
                                                    style={{ color: '#009FFD' }}
                                                    onPress={() => Linking.openURL(cont.value)}>{cont.value}</Text> : ""
                                        ))
                                        : ""
                                    : ""}
                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View>

                <View style={style.container}>
                    <Title style={style.titleMain}>UNSA</Title>
                    <DataTable>
                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 0.3 }}><Icon name='phone' /></DataTable.Cell>
                            <DataTable.Cell style={{ flex: 0.7 }}>
                                {unsaPhone}
                            </DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 0.3 }}><Icon name='email' /></DataTable.Cell>
                            <DataTable.Cell style={{ flex: 0.7 }}>
                                {unsaMail}
                            </DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 0.3 }}><Icon name='language' /></DataTable.Cell>
                            <DataTable.Cell style={{ flex: 0.7 }}>
                                <Text
                                    style={{ color: '#009FFD' }}
                                    onPress={() => Linking.openURL(unsaWebsite)}>{unsaWebsite}</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                </DataTable>
                </View>

                <View style={style.container}>
                    <Title style={style.titleMain}>UTIC</Title>
                    <DataTable>
                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 0.3 }}><Icon name='phone' /></DataTable.Cell>
                            <DataTable.Cell style={{ flex: 0.7 }}>
                                {uticPhone}
                            </DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 0.3 }}><Icon name='print' /></DataTable.Cell>
                            <DataTable.Cell style={{ flex: 0.7 }}>
                                {uticFax}
                            </DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 0.3 }}><Icon name='email' /></DataTable.Cell>
                            <DataTable.Cell style={{ flex: 0.7 }}>
                                {uticMail}
                            </DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 0.3 }}><Icon name='language' /></DataTable.Cell>
                            <DataTable.Cell style={{ flex: 0.7 }}>
                                <Text
                                    style={{ color: '#009FFD' }}
                                    onPress={() => Linking.openURL(uticWebsite)}>{uticWebsite}</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View>
            </ScrollView>
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