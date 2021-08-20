import React, {useEffect, useState} from 'react';
import axios from "axios";
import {TOKEN} from "../../App";
import {ScrollView, Text, View} from "react-native";
import {ActivityIndicator, DataTable} from "react-native-paper";
import {formatTimestamp} from "../Formats/MyFormats";
import style from "../styles/DarkMode";


export default function MainStudentData({theme}){
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
        return <ActivityIndicator style={{marginTop: '50%'}} color={'#2C8BD3'} size={'large'}/>
    }

    return (
        <>
            <ScrollView style={{backgroundColor: theme.secondaryBackground}}>
                <View style={style.containerMSD}>
                    <DataTable style={{ marginTop: 20, marginBottom: 20}}>
                        <DataTable.Row style={{textAlign: 'right'}}>
                            <Text style={style.TDStyleLeft}>Korisničko ime</Text>
                            <Text style={style.TDStyleRight}>{student.username}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={style.TDStyleLeft}>OID</Text>
                            <Text style={style.TDStyleRight}>{student.oid}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={style.TDStyleLeft}>JMBG</Text>
                            <Text style={style.TDStyleRight}>{student.jmbg}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={style.TDStyleLeft}>Ime</Text>
                            <Text style={style.TDStyleRight}>{student.firstName}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={style.TDStyleLeft}>Prezime</Text>
                            <Text style={style.TDStyleRight}>{student.lastName}</Text>
                        </DataTable.Row>

                        {
                            (student.gender === "ženski") ? <DataTable.Row>
                                <Text style={style.TDStyleLeft}>Djevojačko prezime</Text>
                                <Text style={style.TDStyleRight}>{student.maidenName}</Text>
                            </DataTable.Row> : null
                        }

                        <DataTable.Row>
                            <Text style={style.TDStyleLeft}>Spol</Text>
                            <Text style={style.TDStyleRight}>{student.gender}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={style.TDStyleLeft}>Datum rođenja</Text>
                            <Text style={style.TDStyleRight}>{formatTimestamp(student.dateOfBirth)}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={style.TDStyleLeft}>Mjesto rođenja</Text>
                            <Text style={style.TDStyleRight}>{student.placeOfBirth}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={style.TDStyleLeft}>Ime i prezime oca</Text>
                            <Text style={style.TDStyleRight}>{student.fatherFirstName + " " + student.fatherLastName}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={style.TDStyleLeft}>Ime i prezime majke</Text>
                            <Text style={style.TDStyleRight}>{student.motherFirstName + " " + student.motherLastName}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={style.TDStyleLeft}>Mjesto prebivališta</Text>
                            <Text style={style.TDStyleRight}>{student.residence}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={style.TDStyleLeft}>Mjesto boravka</Text>
                            <Text style={style.TDStyleRight}>{student.currentResidence}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={style.TDStyleLeft}>Nacionalnost</Text>
                            <Text style={style.TDStyleRight}>{student.nationality}</Text>
                        </DataTable.Row>
                        <DataTable.Row>
                            <Text style={style.TDStyleLeft}>Državljanstvo</Text>
                            <Text style={style.TDStyleRight}>{student.citizenships?student.citizenships[0].country.name : ''}</Text>
                        </DataTable.Row>
                    </DataTable>

                </View>
            </ScrollView>
        </>
    );
}
