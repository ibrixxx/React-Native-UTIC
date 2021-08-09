import React, {useEffect, useState} from 'react';
import axios from "axios";
import {TOKEN} from "../../App";
import {ScrollView, StyleSheet, View, Text} from "react-native";
import {ActivityIndicator, DataTable, Title} from "react-native-paper";
import {white} from "react-native-paper/src/styles/colors";
import {formatTimestamp} from "../Formats/MyFormats";

export default function MainStudentData(){
    const[student, setStudent] = useState({})
    const[isReady, setIsReady] = useState(false)



    useEffect(() => {
        getUserData();
    }, [])


    const getUserData = () => {
        axios.get(' http://192.168.44.79:8080/u/0/students/student/personal-information', {
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
        return <ActivityIndicator style={{marginTop: '50%'}} color={'dodgerblue'} size={'large'}/>
    }

    return (
        <>
            <ScrollView>
                <View style={style.container}>
                    <Title style={{color: 'dodgerblue', fontWeight: 'bold', fontSize: 18, marginBottom: 10, textAlign: 'center'}}>Podaci o studentu</Title>
                    <DataTable>
                        <DataTable.Row style={{textAlign: 'right'}}>
                            <DataTable.Cell ><Text style={style.TDStyleLeft}>Korisničko ime</Text></DataTable.Cell>
                            <DataTable.Cell>{student.username}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell ><Text style={style.TDStyleLeft}>OID</Text></DataTable.Cell>
                            <DataTable.Cell>{student.oid}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell ><Text style={style.TDStyleLeft}>JMBG</Text></DataTable.Cell>
                            <DataTable.Cell>{student.jmbg}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell ><Text style={style.TDStyleLeft}>Ime</Text></DataTable.Cell>
                            <DataTable.Cell>{student.firstName}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell ><Text style={style.TDStyleLeft}>Prezime</Text></DataTable.Cell>
                            <DataTable.Cell>{student.lastName}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell ><Text style={style.TDStyleLeft}>Djevojačko prezime</Text></DataTable.Cell>
                            <DataTable.Cell>{student.maidenName}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell ><Text style={style.TDStyleLeft}>Spol</Text></DataTable.Cell>
                            <DataTable.Cell>{student.gender}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell ><Text style={style.TDStyleLeft}>Datum rođenja</Text></DataTable.Cell>
                            <DataTable.Cell>{formatTimestamp(student.dateOfBirth)}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell ><Text style={style.TDStyleLeft}>Mjesto rođenja</Text></DataTable.Cell>
                            <DataTable.Cell>{student.placeOfBirth}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell ><Text style={style.TDStyleLeft}>Ime i prezime oca</Text></DataTable.Cell>
                            <DataTable.Cell>{student.fatherFirstName + " " + student.fatherLastName}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell ><Text style={style.TDStyleLeft}>Ime i prezime majke</Text></DataTable.Cell>
                            <DataTable.Cell>{student.motherFirstName + " " + student.motherLastName}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell ><Text style={style.TDStyleLeft}>Mjesto prebivališta</Text></DataTable.Cell>
                            <DataTable.Cell>{student.residence}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell ><Text style={style.TDStyleLeft}>Mjesto boravka</Text></DataTable.Cell>
                            <DataTable.Cell>{student.currentResidence}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell ><Text style={style.TDStyleLeft}>Nacionalnost</Text></DataTable.Cell>
                            <DataTable.Cell>{student.nationality}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell ><Text style={style.TDStyleLeft}>Državljanstvo</Text></DataTable.Cell>
                            <DataTable.Cell>{student.citizenships?student.citizenships[0].country.name : ''}</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>

                </View>
            </ScrollView>
        </>
    );
}

const style = StyleSheet.create({
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
    TDStyleLeft: {
        fontWeight: 'bold'
    }
});