import React from "react";
import {DataTable, IconButton, Modal, Text, Title} from "react-native-paper";


export default function CourseModal2({visible, hideModal, index, courses}) {
    const containerStyle = {backgroundColor: 'white', padding: 20, zIndex: 0}

    return(
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <DataTable style={{borderColor: 'whitesmoke'}}>
                <Title style={{color: 'dodgerblue', marginBottom: '10%', textAlign: 'center'}}>{courses[index]? courses[index].courseName:''}</Title>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: 'black'}}>Šifra predmeta</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: 'black'}}>{courses[index]? courses[index].code: ''}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: 'black'}}>ECTS</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: 'black'}}>{courses[index]? courses[index].ects:''}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: 'black'}}>P+V+S</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: 'black'}}>{courses[index]? courses[index].exerciseHours+courses[index].lectureHours+courses[index].seminarHours:''}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: 'black'}}>Tip predmeta</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: 'black'}}>{courses[index]? courses[index].mandatory? 'Obavezni':'Izborni':''}</Text></DataTable.Cell>
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