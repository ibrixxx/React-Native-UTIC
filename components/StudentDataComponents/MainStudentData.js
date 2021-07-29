import React, {useEffect, useState} from 'react';
import axios from "axios";
import {TOKEN} from "../../App";
import {ScrollView, StyleSheet, View, Text} from "react-native";
import {DataTable, Title} from "react-native-paper";
import {white} from "react-native-paper/src/styles/colors";

export default function MainStudentData(){
    const[student, setStudent] = useState({})

    useEffect(() => {
        getUserData();
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
        <>
            <ScrollView>
                <View style={style.container}>
                    <Title style={style.title}>Podaci o studentu</Title>
                    <DataTable>
                        <DataTable.Row style={{textAlign: 'right'}}>
                            <DataTable.Cell ><Text style={style.TDStyleLeft}>Korisničko ime</Text></DataTable.Cell>
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