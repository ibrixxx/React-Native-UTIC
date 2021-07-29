import React from "react";
import {Caption, DataTable, Text} from "react-native-paper";

export default function CurrentSemester({classes}) {

    return(
        <>
            <Text style={{color: 'dodgerblue', fontWeight: 'bold', paddingTop: '6%', paddingLeft: '4%', paddingBottom: '3.5%', backgroundColor: '#e0e0e0'}}>Spisak predmeta</Text>
            <DataTable style={{width: '100%'}}>
                <DataTable.Header style={{width: '100%'}}>
                    <DataTable.Title><Text>Predmet</Text></DataTable.Title>
                    <DataTable.Title numeric><Text>P+V+S</Text></DataTable.Title>
                    <DataTable.Title numeric><Text>ECTS</Text></DataTable.Title>
                </DataTable.Header>
                {
                    classes.map((c, index) => {
                        return (
                            <DataTable.Row style={{width: '100%'}} key={index}>
                                <DataTable.Cell style={{maxWidth: '100%'}}><Caption style={{color: c.mandatory? 'black':'#89acad'}}>{c.courseName}</Caption></DataTable.Cell>
                                <DataTable.Cell numeric><Caption>{c.exerciseHours}+{c.lectureHours}+{c.seminarHours}</Caption></DataTable.Cell>
                                <DataTable.Cell numeric><Caption>{c.ects}</Caption></DataTable.Cell>
                            </DataTable.Row>
                            );
                    })
                }
            </DataTable>
        </>
    );
}


