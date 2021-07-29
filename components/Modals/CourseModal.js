import React from "react";
import {DataTable, IconButton, Modal, Text} from "react-native-paper";


export default function CourseModal({visible, hideModal, index, course}) {
    const containerStyle = {backgroundColor: 'black', padding: 20, zIndex: 0}

    return(
        <Modal visible={visible === index} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <DataTable style={{borderColor: 'whitesmoke'}}>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: 'white'}}>Predmet</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: 'white'}}>{course.courseName}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: 'white'}}>Šifra predmeta</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: 'white'}}>{course.code}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: 'white'}}>ECTS</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: 'white'}}>{course.ects}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: 'white'}}>P+V+S</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: 'white'}}>{course.exerciseHours}+{course.lectureHours}+{course.seminarHours}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{color: 'white'}}>Tip predmeta</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{color: 'white'}}>{course.mandatory? 'Obavezni':'Izborni'}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell></DataTable.Cell>
                    <DataTable.Cell></DataTable.Cell>
                    <DataTable.Cell numeric>
                        <IconButton icon={'close'} color={'white'} onPress={hideModal}/>
                    </DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </Modal>
    );
}