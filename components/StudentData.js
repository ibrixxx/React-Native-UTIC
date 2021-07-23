import React, {useEffect, useState} from 'react'
import {Button, ScrollView, StyleSheet, Text, View} from "react-native";
import {Card, DataTable, Title} from "react-native-paper";
import {white} from "react-native-paper/src/styles/colors";
import { Tab, TabView } from 'react-native-elements';
import axios from "axios";
import {TOKEN} from "../App";
import MyHeader from "./MyHeader";


export default function StudentData({ navigation }) {
    const[student, setStudent] = useState({})
    const [index, setIndex] = useState(0);

    useEffect(() => {
        getUserData()
    }, [])


    const getDateFormated = (n) => {
        const d = new Date(n);
        return d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear();
    }

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
        <View>
            <MyHeader myTitle="Lični podaci" navigation={navigation}/>
            <View style={style.everything}>
                <Tab value={index} onChange={setIndex}>
                    <Tab.Item
                        title="osnovni podaci"
                        titleStyle={{fontSize: 12, color: 'black'}}
                        containerStyle={{textAlign: 'center', justifyContent: 'center', backgroundColor: 'white'}}
                        buttonStyle={{padding: 0}}
                    />
                    <Tab.Item
                        title="kontakt"
                        titleStyle={{fontSize: 12, color: 'black'}}
                        containerStyle={{textAlign: 'center', justifyContent: 'center', backgroundColor: 'white'}}
                        buttonStyle={{padding: 0}}
                    />
                    <Tab.Item
                        title="studij"
                        titleStyle={{fontSize: 12, color: 'black'}}
                        containerStyle={{textAlign: 'center', justifyContent: 'center', backgroundColor: 'white'}}
                        buttonStyle={{padding: 0}}
                    />
                </Tab>

                <TabView value={index-1} onChange={setIndex} >
                    <TabView.Item style={{ width: '90%'}}>

                        <View style={style.container}>
                            <Title style={style.title}>Podaci o studentu</Title>
                            <View style={style.rowStyle}>
                                <DataTable>
                                    <DataTable.Row>
                                        <DataTable.Cell style={{width: '100%'}}>Ime: </DataTable.Cell>
                                        <DataTable.Cell>{student.firstName}</DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row>
                                        <DataTable.Cell style={{width: '100%'}}>Prezime: </DataTable.Cell>
                                        <DataTable.Cell>{student.lastName}</DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row>
                                        <DataTable.Cell style={{width: '100%'}}>JMBG: </DataTable.Cell>
                                        <DataTable.Cell>{student.jmbg}</DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row>
                                        <DataTable.Cell>Datum rođenja: </DataTable.Cell>
                                        <DataTable.Cell>{getDateFormated(student.dateOfBirth)}</DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row>
                                        <DataTable.Cell>Residence: </DataTable.Cell>
                                        <DataTable.Cell>{student.residence}</DataTable.Cell>
                                    </DataTable.Row>
                                </DataTable>
                            </View>
                        </View>
                    </TabView.Item>

                    <TabView.Item style={{ width: '90%'}}>
                        <View style={style.container}>
                            <Title style={style.title}>Kontakt</Title>
                            <View style={style.rowStyle}>
                                <DataTable>
                                    <DataTable.Row>
                                        <DataTable.Cell>Telefon: </DataTable.Cell>
                                        <DataTable.Cell>{student.contacts?student.contacts[0].value:'/'}</DataTable.Cell>
                                    </DataTable.Row>
                                </DataTable>
                            </View>
                        </View>
                    </TabView.Item>

                    <TabView.Item style={{ width: '90%'}}>
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
                    </TabView.Item>
                </TabView>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    everything: {
        height: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 20,
        paddingRight: 20
    },
    tab: {
        fontSize: 14
    },
    container: {
        backgroundColor: white,
        padding: 15,
        borderRadius: 15,
        elevation: 8,
        marginBottom: 20,
        marginTop: 20,
        marginLeft: '10%'
    },
    title: {
        textAlign: 'center'
    },
    rowStyle: {
        width: '90%',
    }
});