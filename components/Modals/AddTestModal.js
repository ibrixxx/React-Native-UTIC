import React from "react";
import {Button, DataTable, Modal, Text, Title} from "react-native-paper";
import {formatTimestamp, formatTimestamp2, formatType} from "../Formats/MyFormats";


export default function AddTestModal({visible, hideModal, index, courses, registerTest, theme}) {
    const containerStyle = {backgroundColor: theme.secondaryBackground, padding: 20, zIndex: 0}


    const registerThisExam = () => {
        registerTest(courses[index].gradedActivityId, courses[index].studentCourseImplementationId)
        hideModal()
    }


    return(
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <DataTable style={{borderColor: 'whitesmoke', backgroundColor: theme.secondaryBackground}}>
                <Title style={{color: theme.secondary, marginBottom: '10%', textAlign: 'center'}}>{courses[index]? courses[index].courseName:''}</Title>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: theme.text, fontWeight: 'bold'}}>Datum ispita:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: theme.text}}>{courses[index]? formatTimestamp(courses[index].examDate): ''}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: theme.text, fontWeight: 'bold'}}>Vrijeme ispita:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: theme.text}}>{courses[index]? formatTimestamp2(courses[index].examDate): ''}</Text></DataTable.Cell>
                </DataTable.Row>
                {
                    courses[index]? (courses[index].classroom.length > 25)?
                            <>
                                <DataTable.Row>
                                    <DataTable.Cell><Text style={{color: theme.text, fontWeight: 'bold'}}>Prostorija:</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <Text style={{color: theme.text, textAlign: 'center'}}>{courses[index].classroom}</Text>
                                </DataTable.Row>
                            </>
                            :
                            <DataTable.Row>
                                <DataTable.Cell><Text style={{color: theme.text, fontWeight: 'bold'}}>Prostorija:</Text></DataTable.Cell>
                                <DataTable.Cell><Text style={{color: theme.text}}>{courses[index].classroom}</Text></DataTable.Cell>
                            </DataTable.Row>
                        :
                        <>
                        </>
                }
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: theme.text, fontWeight: 'bold'}}>Nastavnik:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: theme.text}}>{courses[index]? courses[index].teacherName:''}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: theme.text, fontWeight: 'bold'}}>Tip ispita:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: theme.text}}>{courses[index]? formatType(courses[index].gradedActivityType):''}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row></DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>
                        <Button color={'white'} style={{backgroundColor: '#2C8BD3'}} onPress={registerThisExam}>PRIJAVI</Button>
                    </DataTable.Cell>
                    <DataTable.Cell></DataTable.Cell>
                    <DataTable.Cell numeric>
                        <Button color={'white'} style={{backgroundColor: 'gray'}} onPress={hideModal}>ZATVORI</Button>
                    </DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </Modal>
    );
}