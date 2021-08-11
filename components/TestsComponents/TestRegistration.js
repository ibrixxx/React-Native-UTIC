import React from 'react'
import {ScrollView, View} from "react-native";
import {Button, Caption, Card, DataTable, Portal, Provider, Snackbar, Text} from "react-native-paper";
import axios from "axios";
import {TOKEN} from "../../App";
import AddTestModal from "../Modals/AddTestModal";
import Icon from 'react-native-vector-icons/FontAwesome';
import {formatTimestamp} from "../Formats/MyFormats";



export default function TestRegistration({exams, setCurrent, setExams}) {
    const [visible, setVisible] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);
    const [curr, setCurr] = React.useState(null)


    const onToggleSnackBar = () => setVisible2(true);

    const onDismissSnackBar = () => setVisible2(false);


    const showModal = (i) => {setVisible(true); setCurr(i)}

    const hideModal = () => setVisible(false)


    const registerExam = (gradedId, courseId) => {
        axios.post('http://192.168.44.79:8080/u/0/student-exams/registration/', {
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
            <ScrollView>
                <Text style={{color: '#2C8BD3', fontWeight: 'bold', paddingTop: '6%', paddingLeft: '4%', paddingBottom: '3.5%', backgroundColor: '#e0e0e0', fontSize: 18, textAlign: 'center'}}>Neprijavljeni ispiti</Text>
                {(exams.length > 0)?
                    <DataTable>
                        <DataTable.Header style={{backgroundColor: '#ebeded'}}>
                            <DataTable.Title style={{flex: 0.08}}> </DataTable.Title>
                            <DataTable.Title><Text style={{fontWeight: 'bold', flex: 0.5}}>Predmet</Text></DataTable.Title>
                            <DataTable.Title><Text style={{fontWeight: 'bold', flex: 0.3}} numeric>Datum ispita</Text></DataTable.Title>
                            <DataTable.Title style={{flex: 0.4}} numeric> </DataTable.Title>
                        </DataTable.Header>
                        {
                            exams.map((e, index) => {
                                return (
                                    <DataTable.Row key={index} onPress={() => showModal(index)}>
                                        <DataTable.Cell style={{flex: 0.08}}>
                                            <Icon
                                                name='info'
                                                type='material'
                                                color='#517fa4'
                                                size={14}/>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{flex: 0.5}}>{e.courseName}</DataTable.Cell>
                                        <DataTable.Cell style={{flex: 0.3}} numeric>{formatTimestamp(e.examDate)}</DataTable.Cell>
                                        <DataTable.Cell style={{flex: 0.4, marginLeft: '2%'}} numeric><Button color={'dodgerblue'} style={{backgroundColor: 'rgba(64, 171, 181, 0.1)'}} onPress={() => registerExam(e.gradedActivityId, e.studentCourseImplementationId)}>PRIJAVI</Button></DataTable.Cell>
                                    </DataTable.Row>
                                );
                            })
                        }
                    </DataTable>
                    :
                    <Caption>Nemate nadolazećih ispita</Caption>
                }
            </ScrollView>
            <Provider>
                <Portal>
                    <AddTestModal index={curr} visible={visible} courses={exams} hideModal={hideModal} registerTest={(gradedId, courseId) => {registerExam(gradedId, courseId)}}/>
                </Portal>
            </Provider>
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