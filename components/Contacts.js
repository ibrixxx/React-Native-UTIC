import React, {useEffect, useRef, useState} from 'react'
import {ScrollView, StyleSheet, Text, View} from "react-native";
import MyHeader from "./MyHeader";
import {white} from "react-native-paper/src/styles/colors";
import axios from "axios";
import {TOKEN} from "../App";
import {ActivityIndicator, DataTable, Title} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import {Linking} from "react-native";
import BottomSheet from "./BottomSheet";

export default function Contacts({ navigation }) {
    const [importantContacts, setImportantContacts] = useState({});
    const[isReady, setIsReady] = useState(false)
    const refRBSheet = useRef();


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
                setIsReady(true)
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <View>
            <MyHeader myTitle="Kontakti" navigation={navigation} sheetOpen={() => {refRBSheet.current.open()}}/>

            <ScrollView
                contentContainerStyle={{ padding: 10, paddingBottom: 30}}
                style={{ height: '90%', marginBottom: 10 }}>

                <View style={style.container}>
                    {
                        isReady ?
                            <View style={{ width: '100%' }}>
                                <Title style={style.titleMain}>{(importantContacts && importantContacts.length > 0) ? importantContacts[0].facultyName : ""}</Title>

                                <DataTable>
                                    <DataTable.Row>
                                        <DataTable.Cell style={{ flex: 0.3 }}><Icon name="phone" size={20} color="black" /></DataTable.Cell>
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
                                        <DataTable.Cell style={{ flex: 0.3 }}><Icon name="envelope" size={20} color="black" /></DataTable.Cell>
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
                                        <DataTable.Cell style={{ flex: 0.3 }}><Icon name="globe" size={20} color="black" /></DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 0.7 }}>
                                            {(importantContacts && importantContacts.length > 0) ?
                                                (importantContacts[0].facultyContact && importantContacts[0].facultyContact.length > 0) ?
                                                    importantContacts[0].facultyContact.map((cont) => (
                                                        (cont.contactType === "web stranica") ?
                                                            <Text
                                                                style={{ color: '#2C8BD3' }}
                                                                onPress={() => Linking.openURL(cont.value)}>{cont.value}</Text> : ""
                                                    ))
                                                    : ""
                                                : ""}
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                </DataTable>
                            </View> :  <ActivityIndicator style={{marginTop: '25%', marginBottom: '25%'}} color={'#2C8BD3'} size={'large'}/>
                    }


                </View>

                <View style={style.container}>
                    <Title style={style.titleMain}>UNSA</Title>
                    <DataTable>
                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 0.3 }}><Icon name="phone" size={20} color="black" /></DataTable.Cell>
                            <DataTable.Cell style={{ flex: 0.7 }}>
                                {unsaPhone}
                            </DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 0.3 }}><Icon name="envelope" size={20} color="black" /></DataTable.Cell>
                            <DataTable.Cell style={{ flex: 0.7 }}>
                                {unsaMail}
                            </DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 0.3 }}><Icon name="globe" size={20} color="black" /></DataTable.Cell>
                            <DataTable.Cell style={{ flex: 0.7 }}>
                                <Text
                                    style={{ color: '#2C8BD3' }}
                                    onPress={() => Linking.openURL(unsaWebsite)}>{unsaWebsite}</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                </DataTable>
                </View>

                <View style={style.container}>
                    <Title style={style.titleMain}>UTIC</Title>
                    <DataTable>
                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 0.3 }}><Icon name="phone" size={20} color="black" /></DataTable.Cell>
                            <DataTable.Cell style={{ flex: 0.7 }}>
                                {uticPhone}
                            </DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 0.3 }}><Icon name="fax" size={20} color="black" /></DataTable.Cell>
                            <DataTable.Cell style={{ flex: 0.7 }}>
                                {uticFax}
                            </DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 0.3 }}><Icon name="envelope" size={20} color="black" /></DataTable.Cell>
                            <DataTable.Cell style={{ flex: 0.7 }}>
                                {uticMail}
                            </DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 0.3 }}><Icon name="globe" size={20} color="black" /></DataTable.Cell>
                            <DataTable.Cell style={{ flex: 0.7 }}>
                                <Text
                                    style={{ color: '#2C8BD3' }}
                                    onPress={() => Linking.openURL(uticWebsite)}>{uticWebsite}</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View>
            </ScrollView>
            <BottomSheet myRef={refRBSheet} navigateHome={() => navigation.navigate('Home')}/>
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
        borderTopColor: '#2C8BD3',
        borderTopWidth: 2,
        elevation: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15
    },
    titleMain: {
        fontSize: 20,
        textAlign: 'center',
        color: "#263238",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        width: '100%'
    }
});