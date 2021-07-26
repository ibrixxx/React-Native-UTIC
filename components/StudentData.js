import React, {useEffect, useState} from 'react'
import {Button, ScrollView, StyleSheet, Text, View} from "react-native";
import {Card, DataTable, Title, FAB} from "react-native-paper";
import {white} from "react-native-paper/src/styles/colors";
import { Tab, TabView } from 'react-native-elements';
import axios from "axios";
import {TOKEN} from "../App";
import MyHeader from "./MyHeader";


export default function StudentData({ navigation }) {
    const[student, setStudent] = useState({})
    const[studyProgram, setStudyProgram] = useState({})
    const [index, setIndex] = useState(0);


    useEffect(() => {
        getUserData();
        getStudyProgram()
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

    const getStudyProgram = () => {
        axios.get('http://192.168.44.83:8080/u/0/students/student/personal-information/study-program', {
            headers: {
                Accept: 'application/json',
                Authorization: TOKEN
            }
        })
            .then(respnse => {
                console.log(respnse.data)
                setStudyProgram(respnse.data)
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

                <TabView value={index - 1} >
                    <TabView.Item style={{ width: '90%'}}>
                        <ScrollView>
                        <View style={style.container}>
                            <Title style={style.title}>Podaci o studentu</Title>
                                <DataTable>
                                    <DataTable.Row style={{textAlign: 'right'}}>
                                        <DataTable.Cell style={style.TDStyleLeft}>Korisničko ime</DataTable.Cell>
                                        <DataTable.Cell>{student.username}</DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row>
                                        <DataTable.Cell style={{ textAlign: 'right'}}>OID</DataTable.Cell>
                                        <DataTable.Cell>{student.oid}</DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row>
                                        <DataTable.Cell style={style.TDStyleLeft}>JMBG</DataTable.Cell>
                                        <DataTable.Cell>{student.jmbg}</DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row>
                                        <DataTable.Cell style={style.TDStyleLeft}>Ime</DataTable.Cell>
                                        <DataTable.Cell>{student.firstName}</DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row>
                                        <DataTable.Cell style={style.TDStyleLeft}>Prezime</DataTable.Cell>
                                        <DataTable.Cell>{student.lastName}</DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row>
                                        <DataTable.Cell style={style.TDStyleLeft}>Djevojačko prezime</DataTable.Cell>
                                        <DataTable.Cell>{student.maidenName}</DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row>
                                        <DataTable.Cell style={style.TDStyleLeft}>Spol</DataTable.Cell>
                                        <DataTable.Cell>{student.gender}</DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row>
                                        <DataTable.Cell style={style.TDStyleLeft}>Datum rođenja</DataTable.Cell>
                                        <DataTable.Cell>{getDateFormated(student.dateOfBirth)}</DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row>
                                        <DataTable.Cell style={style.TDStyleLeft}>Mjesto rođenja</DataTable.Cell>
                                        <DataTable.Cell>{student.placeOfBirth}</DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row>
                                        <DataTable.Cell style={style.TDStyleLeft}>Ime i prezime oca</DataTable.Cell>
                                        <DataTable.Cell>{student.fatherFirstName + " " + student.fatherLastName}</DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row>
                                        <DataTable.Cell style={style.TDStyleLeft}>Ime i prezime majke</DataTable.Cell>
                                        <DataTable.Cell>{student.motherFirstName + " " + student.motherLastName}</DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row>
                                        <DataTable.Cell style={style.TDStyleLeft}>Mjesto prebivališta</DataTable.Cell>
                                        <DataTable.Cell>{student.residence}</DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row>
                                        <DataTable.Cell style={style.TDStyleLeft}>Mjesto boravka</DataTable.Cell>
                                        <DataTable.Cell>{student.currentResidence}</DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row>
                                        <DataTable.Cell style={style.TDStyleLeft}>Nacionalnost</DataTable.Cell>
                                        <DataTable.Cell>{student.nationality}</DataTable.Cell>
                                    </DataTable.Row>
                                    <DataTable.Row>
                                        <DataTable.Cell style={style.TDStyleLeft}>Državljanstvo</DataTable.Cell>
                                        <DataTable.Cell>{/*student.citizenships.country.name*/}</DataTable.Cell>
                                    </DataTable.Row>
                                </DataTable>

                        </View>
                        </ScrollView>
                    </TabView.Item>

                    <TabView.Item style={{ width: '90%'}}>
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
                                                <DataTable.Row>
                                                    <DataTable.Cell numeric>{contact.type}</DataTable.Cell>
                                                    <DataTable.Cell>{' '}</DataTable.Cell>
                                                    <DataTable.Cell>{contact.value}</DataTable.Cell>
                                                </DataTable.Row>
                                            ))
                                            :<Text>Nema</Text>
                                    }

                                </DataTable>

                            </View>

                        </View>

                    </TabView.Item>

                    <TabView.Item style={{ width: '90%'}}>
                        <View style={style.container}>
                            <Title style={style.title}>Podaci o studiju:</Title>
                            <DataTable>
                                <DataTable.Row>
                                    <DataTable.Cell>Index</DataTable.Cell>
                                    <DataTable.Cell></DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell>Fakultet</DataTable.Cell>
                                    <DataTable.Cell>{studyProgram.faculties?studyProgram.faculties.name:''}</DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell>Odsjek</DataTable.Cell>
                                    <DataTable.Cell></DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell>Studijski program</DataTable.Cell>
                                    <DataTable.Cell></DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell>Semestar</DataTable.Cell>
                                    <DataTable.Cell></DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell>Tip studija</DataTable.Cell>
                                    <DataTable.Cell></DataTable.Cell>
                                </DataTable.Row>

                            </DataTable>
                        </View>
                    </TabView.Item>
                </TabView>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    everything: {
        height: '90%',
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
        width: '90%',
        padding: 15,
        borderRadius: 15,
        elevation: 8,
        marginTop: 20,
        marginLeft: '10%',
        zIndex: 1
    },
    title: {
        textAlign: 'center'
    },
    TDStyleLeft: {
        width: '100%',
        textAlign: 'right'
    },
    TDStyleRight:{
        width: '100%',
        textAlign: 'left'
    },
    fab: {
        width: 55,
        height: 55,
        backgroundColor: '#434343',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginBottom: 10,
        bottom: 0,
        right: 0,
        zIndex: 1000
    }
});