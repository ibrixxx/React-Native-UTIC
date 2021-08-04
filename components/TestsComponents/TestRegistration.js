import React from 'react'
import {View} from "react-native";
import {Button, Caption, Card, DataTable, Portal, Provider, Snackbar, Text} from "react-native-paper";
import axios from "axios";
import {TOKEN} from "../../App";
import CourseModal from "../Modals/CourseModal";


export default function TestRegistration({exams, setCurrent, setExams}) {
    const [visible, setVisible] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);
    const [curr, setCurr] = React.useState(null)


    const onToggleSnackBar = () => setVisible2(true);

    const onDismissSnackBar = () => setVisible2(false);


    const getDateFormated = (n) => {
        const d = new Date(n);
        return d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear();
    }

    const showModal = (i) => {setVisible(true); setCurr(i)}

    const hideModal = () => setVisible(false)


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
                setExams()
                setCurrent()
                onToggleSnackBar()
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <View style={{height: '100%'}}>
            <Card>
                <Card.Title
                    title="Neprijavljeni ispiti"
                    titleStyle={{color: 'dodgerblue'}}
                />
                <Card.Content>
                    {(exams.length > 0)?
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title><Text style={{fontWeight: 'bold', flex: 1}}>Predmet</Text></DataTable.Title>
                                <DataTable.Title><Text style={{fontWeight: 'bold', flex: 0.6}} numeric>Datum ispita</Text></DataTable.Title>
                                <DataTable.Title numeric> </DataTable.Title>
                            </DataTable.Header>
                            {
                                exams.map((e, index) => {
                                    return (
                                        <DataTable.Row key={index} onPress={() => showModal(index)}>
                                            <DataTable.Cell style={{flex: 1}}>{e.courseName}</DataTable.Cell>
                                            <DataTable.Cell style={{flex: 0.6}} numeric>{getDateFormated(e.examDate)}</DataTable.Cell>
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
                <Provider>
                    <Portal>
                        <CourseModal index={curr} visible={visible} courses={exams} hideModal={hideModal}/>
                    </Portal>
                </Provider>
            </Card>
            <Snackbar
                visible={visible2}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'X',
                    onPress: () => {
                        onDismissSnackBar()
                    },
                }}>
                Uspješno ste prijavili ispit.
            </Snackbar>
        </View>
    );
}