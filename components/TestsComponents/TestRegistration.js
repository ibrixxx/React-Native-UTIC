import React, {useState} from 'react'
import {View} from "react-native";
import MyHeader from "../MyHeader";
import {Caption, Card, DataTable} from "react-native-paper";


export default function TestRegistration() {
    const [exams, setExams] = useState([]);

    const getDateFormated = (n) => {
        const d = new Date(n);
        return d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear();
    }

    return (
        <View>
            <Card>
                <Card.Title
                    title="Spisak nadolazećih ispita"
                    titleStyle={{color: 'dodgerblue'}}
                />
                <Card.Content>
                    {(exams.length > 0)?
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Predmet</DataTable.Title>
                                <DataTable.Title>Datum ispita</DataTable.Title>
                            </DataTable.Header>
                            {
                                exams.map((e, index) => {
                                    return (
                                        <DataTable.Row key={index}>
                                            <DataTable.Cell>{e.courseName}</DataTable.Cell>
                                            <DataTable.Cell>{e.examDate}</DataTable.Cell>
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