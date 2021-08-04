import React, {useEffect, useState} from 'react'
import {View} from "react-native";
import {ActivityIndicator, Button, Caption, Card, DataTable, Text} from "react-native-paper";
import axios from "axios";
import {TOKEN} from "../../App";



export default function TestRegistration() {
    const [exams, setExams] = useState([])
    const [isReady, setIsReady] = React.useState(false)


    const getDateFormated = (n) => {
        const d = new Date(n);
        return d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear();
    }


    useEffect(() => {
        axios.get('http://192.168.44.83:8080/u/0/student-exams/registration/unregistered/'
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setExams(response.data)
                setIsReady(true)
            })
            .catch(function (error) {
                console.log('error: ',error);
            })
    }, [])



    const registerExam = (gradedId, courseId) => {
        axios.post('http://192.168.44.83:8080/u/0/student-exams/registration/', {
                gradedActivityId: gradedId,
                studentCourseImplementationId: courseId
            }
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    if (!isReady) {
        return <ActivityIndicator style={{marginTop: '50%'}} color={'dodgerblue'} size={'large'}/>
    }


    return (
        <View>
            <Card>
                <Card.Title
                    title="Neprijavljeni ispiti"
                    titleStyle={{color: 'dodgerblue'}}
                />
                <Card.Content>
                    {(exams.length > 0)?
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title><Text style={{fontWeight: 'bold', flex: 0.9}}>Predmet</Text></DataTable.Title>
                                <DataTable.Title><Text style={{fontWeight: 'bold', flex: 0.3}} numeric>Datum ispita</Text></DataTable.Title>
                                <DataTable.Title numeric> </DataTable.Title>
                            </DataTable.Header>
                            {
                                exams.map((e, index) => {
                                    return (
                                        <DataTable.Row key={index}>
                                            <DataTable.Cell>{e.courseName}</DataTable.Cell>
                                            <DataTable.Cell numeric>{getDateFormated(e.examDate)}</DataTable.Cell>
                                            <DataTable.Cell numeric><Button color={'dodgerblue'} onPress={() => registerExam(e.gradedActivityId, e.studentCourseImplementationId)}>PRIJAVI</Button></DataTable.Cell>
                                        </DataTable.Row>
                                    );
                                })
                            }
                        </DataTable>
                        :
                        <Caption>Nemate nadolazećih ispita</Caption>
                    }
                </Card.Content>
            </Card>
        </View>
    );
}