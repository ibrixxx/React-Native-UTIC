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
        return (
            <View style={{ height: '100%', backgroundColor: theme.mainBackground }}>
                <ActivityIndicator style={{marginTop: '50%'}} color={'#2C8BD3'} size={'large'}/>
            </View>
        )
    }

    return (
        <>
            <ScrollView style={{backgroundColor: theme.mainBackground}}>
                <View style={style.containerMSD}>
                    <DataTable style={{ marginTop: 20, marginBottom: 20}}>
                        <DataTable.Row style={{textAlign: 'right'}}>
                            <Text style={{
                                fontWeight: 'bold',
                                width: '50%',
                                textAlignVertical: 'center',
                                textAlign: 'right',
                                color: theme.text,
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingRight: '4%',
                                borderRightWidth: 0.3,
                                borderRightColor: "#aaa"
                            }}>Korisničko ime</Text>
                            <Text style={{
                                width: '50%',
                                textAlignVertical: 'center',
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingLeft: '4%',
                                color: theme.text
                            }}>{student.username}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={{
                                fontWeight: 'bold',
                                width: '50%',
                                textAlignVertical: 'center',
                                textAlign: 'right',
                                color: theme.text,
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingRight: '4%',
                                borderRightWidth: 0.3,
                                borderRightColor: "#aaa"
                            }}>OID</Text>
                            <Text style={{
                                width: '50%',
                                textAlignVertical: 'center',
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingLeft: '4%',
                                color: theme.text
                            }}>{student.oid}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={{
                                fontWeight: 'bold',
                                width: '50%',
                                textAlignVertical: 'center',
                                textAlign: 'right',
                                color: theme.text,
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingRight: '4%',
                                borderRightWidth: 0.3,
                                borderRightColor: "#aaa"
                            }}>JMBG</Text>
                            <Text style={{
                                width: '50%',
                                textAlignVertical: 'center',
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingLeft: '4%',
                                color: theme.text
                            }}>{student.jmbg}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={{
                                fontWeight: 'bold',
                                width: '50%',
                                textAlignVertical: 'center',
                                textAlign: 'right',
                                color: theme.text,
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingRight: '4%',
                                borderRightWidth: 0.3,
                                borderRightColor: "#aaa"
                            }}>Ime</Text>
                            <Text style={{
                                width: '50%',
                                textAlignVertical: 'center',
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingLeft: '4%',
                                color: theme.text
                            }}>{student.firstName}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={{
                                fontWeight: 'bold',
                                width: '50%',
                                textAlignVertical: 'center',
                                textAlign: 'right',
                                color: theme.text,
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingRight: '4%',
                                borderRightWidth: 0.3,
                                borderRightColor: "#aaa"
                            }}>Prezime</Text>
                            <Text style={{
                                width: '50%',
                                textAlignVertical: 'center',
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingLeft: '4%',
                                color: theme.text
                            }}>{student.lastName}</Text>
                        </DataTable.Row>

                        {
                            (student.gender === "ženski") ? <DataTable.Row>
                                <Text style={{
                                    fontWeight: 'bold',
                                    width: '50%',
                                    textAlignVertical: 'center',
                                    textAlign: 'right',
                                    color: theme.text,
                                    paddingTop: '2%',
                                    paddingBottom: '2%',
                                    paddingRight: '4%',
                                    borderRightWidth: 0.3,
                                    borderRightColor: "#aaa"
                                }}>Djevojačko prezime</Text>
                                <Text style={{
                                    width: '50%',
                                    textAlignVertical: 'center',
                                    paddingTop: '2%',
                                    paddingBottom: '2%',
                                    paddingLeft: '4%',
                                    color: theme.text
                                }}>{student.maidenName}</Text>
                            </DataTable.Row> : null
                        }

                        <DataTable.Row>
                            <Text style={{
                                fontWeight: 'bold',
                                width: '50%',
                                textAlignVertical: 'center',
                                textAlign: 'right',
                                color: theme.text,
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingRight: '4%',
                                borderRightWidth: 0.3,
                                borderRightColor: "#aaa"
                            }}>Spol</Text>
                            <Text style={{
                                width: '50%',
                                textAlignVertical: 'center',
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingLeft: '4%',
                                color: theme.text
                            }}>{student.gender}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={{
                                fontWeight: 'bold',
                                width: '50%',
                                textAlignVertical: 'center',
                                textAlign: 'right',
                                color: theme.text,
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingRight: '4%',
                                borderRightWidth: 0.3,
                                borderRightColor: "#aaa"
                            }}>Datum rođenja</Text>
                            <Text style={{
                                width: '50%',
                                textAlignVertical: 'center',
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingLeft: '4%',
                                color: theme.text
                            }}>{formatTimestamp(student.dateOfBirth)}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={{
                                fontWeight: 'bold',
                                width: '50%',
                                textAlignVertical: 'center',
                                textAlign: 'right',
                                color: theme.text,
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingRight: '4%',
                                borderRightWidth: 0.3,
                                borderRightColor: "#aaa"
                            }}>Mjesto rođenja</Text>
                            <Text style={{
                                width: '50%',
                                textAlignVertical: 'center',
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingLeft: '4%',
                                color: theme.text
                            }}>{student.placeOfBirth}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={{
                                fontWeight: 'bold',
                                width: '50%',
                                textAlignVertical: 'center',
                                textAlign: 'right',
                                color: theme.text,
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingRight: '4%',
                                borderRightWidth: 0.3,
                                borderRightColor: "#aaa"
                            }}>Ime i prezime oca</Text>
                            <Text style={{
                                width: '50%',
                                textAlignVertical: 'center',
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingLeft: '4%',
                                color: theme.text
                            }}>{student.fatherFirstName + " " + student.fatherLastName}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={{
                                fontWeight: 'bold',
                                width: '50%',
                                textAlignVertical: 'center',
                                textAlign: 'right',
                                color: theme.text,
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingRight: '4%',
                                borderRightWidth: 0.3,
                                borderRightColor: "#aaa"
                            }}>Ime i prezime majke</Text>
                            <Text style={{
                                width: '50%',
                                textAlignVertical: 'center',
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingLeft: '4%',
                                color: theme.text
                            }}>{student.motherFirstName + " " + student.motherLastName}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={{
                                fontWeight: 'bold',
                                width: '50%',
                                textAlignVertical: 'center',
                                textAlign: 'right',
                                color: theme.text,
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingRight: '4%',
                                borderRightWidth: 0.3,
                                borderRightColor: "#aaa"
                            }}>Mjesto prebivališta</Text>
                            <Text style={{
                                width: '50%',
                                textAlignVertical: 'center',
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingLeft: '4%',
                                color: theme.text
                            }}>{student.residence}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={{
                                fontWeight: 'bold',
                                width: '50%',
                                textAlignVertical: 'center',
                                textAlign: 'right',
                                color: theme.text,
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingRight: '4%',
                                borderRightWidth: 0.3,
                                borderRightColor: "#aaa"
                            }}>Mjesto boravka</Text>
                            <Text style={{
                                width: '50%',
                                textAlignVertical: 'center',
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingLeft: '4%',
                                color: theme.text
                            }}>{student.currentResidence}</Text>
                        </DataTable.Row>

                        <DataTable.Row>
                            <Text style={{
                                fontWeight: 'bold',
                                width: '50%',
                                textAlignVertical: 'center',
                                textAlign: 'right',
                                color: theme.text,
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingRight: '4%',
                                borderRightWidth: 0.3,
                                borderRightColor: "#aaa"
                            }}>Nacionalnost</Text>
                            <Text style={{
                                width: '50%',
                                textAlignVertical: 'center',
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingLeft: '4%',
                                color: theme.text
                            }}>{student.nationality}</Text>
                        </DataTable.Row>
                        <DataTable.Row>
                            <Text style={{
                                fontWeight: 'bold',
                                width: '50%',
                                textAlignVertical: 'center',
                                textAlign: 'right',
                                color: theme.text,
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingRight: '4%',
                                borderRightWidth: 0.3,
                                borderRightColor: "#aaa"
                            }}>Državljanstvo</Text>
                            <Text style={{
                                width: '50%',
                                textAlignVertical: 'center',
                                paddingTop: '2%',
                                paddingBottom: '2%',
                                paddingLeft: '4%',
                                color: theme.text
                            }}>{student.citizenships?student.citizenships[0].country.name : ''}</Text>
                        </DataTable.Row>
                    </DataTable>

                </View>
            </ScrollView>
        </>
    );
}
