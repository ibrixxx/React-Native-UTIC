import React, {useEffect, useState} from 'react'
import {Button, ScrollView, StyleSheet, Text, View} from "react-native";
import {Card, DataTable, IconButton, Title} from "react-native-paper";
import {white} from "react-native-paper/src/styles/colors";
import axios from "axios";
import {TOKEN} from "../App";



export default function StudentData({ navigation }) {
    const[student, setStudent] = useState({})

    useEffect(() => {
        getUserData()
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
        <View style={style.everything}>
            <IconButton icon={'menu'} size={50} style={{marginRight: '75%'}} onPress={() => navigation.openDrawer()} />
            <ScrollView contentContainerStyle={style.swStyle} style={{flexGrow: 0.9, height: '80%', width: '90%'}}>
                <View style={{flexGrow: 1}}>
                    <View style={style.container}>
                        <Title style={style.title}>Podaci o studentu</Title>
                        <View style={style.rowStyle}>
                            <DataTable>
                                <DataTable.Row>
                                    <DataTable.Cell>Ime: {student.firstName}</DataTable.Cell>
                                    <DataTable.Cell></DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell>Prezime: {student.lastName}</DataTable.Cell>
                                    <DataTable.Cell></DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell>JMBG: {student.jmbg}</DataTable.Cell>
                                    <DataTable.Cell></DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell>Datum rođenja: {student.dateOfBirth}</DataTable.Cell>
                                    <DataTable.Cell></DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell>Index: {student.id}</DataTable.Cell>
                                    <DataTable.Cell></DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>
                        </View>
                    </View>

                    <View style={style.container}>
                        <Title style={style.title}>Kontakt</Title>
                        <View style={style.rowStyle}>
                            <DataTable>
                                <DataTable.Row>
                                    <DataTable.Cell>Telefon: {'student.contacts[0].value'}</DataTable.Cell>
                                    <DataTable.Cell></DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>
                        </View>
                    </View>

                    <View style={style.container}>
                        <Title style={style.title}>Podaci o studiju:</Title>
                        <View style={style.rowStyle}>
                            <DataTable>
                                <DataTable.Row>
                                    <DataTable.Cell>Godina upisa:</DataTable.Cell>
                                    <DataTable.Cell></DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell>Fakultet:</DataTable.Cell>
                                    <DataTable.Cell></DataTable.Cell>
                                </DataTable.Row>

                            </DataTable>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>
    );
}

const style = StyleSheet.create({
    everything: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 20,
        paddingRight: 20
    },
    swStyle: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        backgroundColor: white,
        padding: 15,
        borderRadius: 15,
        elevation: 8,
        marginBottom: 20
    },
    title: {
        textAlign: 'center'
    },
    rowStyle: {
        width: '90%',
    }
});