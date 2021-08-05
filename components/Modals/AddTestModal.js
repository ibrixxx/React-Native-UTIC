import React from "react";
import {Button, DataTable, Modal, Text, Title} from "react-native-paper";


export default function AddTestModal({visible, hideModal, index, courses, registerTest}) {
    const containerStyle = {backgroundColor: 'white', padding: 20, zIndex: 0}


    const formatTimestamp = (num) => {
        const date = new Date(num);
        return ""+date.getDate()+
            "."+(date.getMonth()+1)+
            "."+date.getFullYear()+".";
    }


    const formatTimestamp2 = (num) => {
        const date = new Date(num);
        return ""+date.getHours()+
            ":"+date.getMinutes()+
            "h";
    }


    const formatType = (num) => {
        if(num === 1)
            return 'Parcijalni'
        else if(num === 2)
            return 'Završni'
        else if(num === 3)
            return 'Popravni'
        else
            return 'Socijalni'
    }


    const registerThisExam = () => {
        registerTest(courses[index].gradedActivityId, courses[index].studentCourseImplementationId)
        hideModal()
    }


    return(
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <DataTable style={{borderColor: 'whitesmoke'}}>
                <Title style={{color: 'dodgerblue', marginBottom: '10%', textAlign: 'center'}}>{courses[index]? courses[index].courseName:''}</Title>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: 'black', fontWeight: 'bold'}}>Datum ispita:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: 'black'}}>{courses[index]? formatTimestamp(courses[index].examDate): ''}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: 'black', fontWeight: 'bold'}}>Vrijeme ispita:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: 'black'}}>{courses[index]? formatTimestamp2(courses[index].examDate): ''}</Text></DataTable.Cell>
                </DataTable.Row>
                {
                    courses[index]? (courses[index].classroom.length > 25)?
                            <>
                                <DataTable.Row>
                                    <DataTable.Cell><Text style={{color: 'black', fontWeight: 'bold'}}>Prostorija:</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <Text style={{color: 'black', textAlign: 'center'}}>{courses[index].classroom}</Text>
                                </DataTable.Row>
                            </>
                            :
                            <DataTable.Row>
                                <DataTable.Cell><Text style={{color: 'black', fontWeight: 'bold'}}>Prostorija:</Text></DataTable.Cell>
                                <DataTable.Cell><Text style={{color: 'black'}}>{courses[index].classroom}</Text></DataTable.Cell>
                            </DataTable.Row>
                        :
                        <>
                        </>
                }
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: 'black', fontWeight: 'bold'}}>Nastavnik:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: 'black'}}>{courses[index]? courses[index].teacherName:''}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: 'black', fontWeight: 'bold'}}>Tip ispita:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: 'black'}}>{courses[index]? formatType(courses[index].gradedActivityType):''}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row></DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>
                        <Button color={'white'} style={{backgroundColor: 'dodgerblue'}} onPress={registerThisExam}>PRIJAVI</Button>
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