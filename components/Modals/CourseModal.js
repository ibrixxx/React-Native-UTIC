import React from "react";
import {DataTable, IconButton, Modal, Text, Title} from "react-native-paper";
import {formatTimestamp, formatTimestamp2, formatType} from "../Formats/MyFormats";


export default function CourseModal({visible, hideModal, index, courses}) {
    const containerStyle = {backgroundColor: 'white', padding: 20, zIndex: 0}


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
                <DataTable.Row>
                    <DataTable.Cell></DataTable.Cell>
                    <DataTable.Cell></DataTable.Cell>
                    <DataTable.Cell numeric>
                        <IconButton icon={'close'} color={'black'} onPress={hideModal}/>
                    </DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </Modal>
    );
}