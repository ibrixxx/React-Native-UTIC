import React from "react";
import {DataTable, IconButton, Modal, Text, Title} from "react-native-paper";
import {formatTimestamp} from "../Formats/MyFormats";


export default function GradeModal({visible, hideModal, index, courses, theme}) {
    const containerStyle = {backgroundColor: theme.secondaryBackground, padding: 20, zIndex: 0}

    return(
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <DataTable style={{borderColor: 'whitesmoke', backgroundColor: theme.secondaryBackground}}>
                <Title style={{color: theme.secondary, marginBottom: '10%', textAlign: 'center'}}>{courses[index]? courses[index].courseName:''}</Title>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: theme.text, fontWeight: 'bold'}}>Ocjena:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: courses.markStatus===0? theme.gradeNotFinalized:theme.text}}>{courses[index]? courses[index].mark : ''}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: theme.text, fontWeight: 'bold'}}>Datum:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: theme.text}}>{courses[index]? formatTimestamp(courses[index].examDate) : ''}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: theme.text, fontWeight: 'bold'}}>ECTS:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: theme.text}}>{courses[index]? courses[index].ects : ''}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: theme.text, fontWeight: 'bold'}}>Nastavnik:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: theme.text}}>{courses[index]? courses[index].teacher.trim() : ''}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell></DataTable.Cell>
                    <DataTable.Cell></DataTable.Cell>
                    <DataTable.Cell numeric>
                        <IconButton icon={'close'} color={theme.text} onPress={hideModal}/>
                    </DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </Modal>
    );
}