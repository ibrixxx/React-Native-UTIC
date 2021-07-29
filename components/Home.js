import React, {useState} from 'react'
import {Button, Text, View} from "react-native";
import MyHeader from "./MyHeader";
import {Caption, Card, DataTable} from "react-native-paper";


const grades = [
    {
        id: 1, courseName: 'Programina', teacher: 'ASd WDasd', examDate: '2.2.2020.', ects: 7, markNumber: 10, mark: 'deset'
    },
    {
        id: 2, courseName: 'Programina', teacher: 'ASd WDasd', examDate: '2.2.2020.', ects: 7, markNumber: 10, mark: 'deset'
    },
    {
        id: 3, courseName: 'Programina', teacher: 'ASd WDasd', examDate: '2.2.2020.', ects: 7, markNumber: 10, mark: 'deset'
    },
    {
        id: 4, courseName: 'Programina', teacher: 'ASd WDasd', examDate: '2.2.2020.', ects: 7, markNumber: 10, mark: 'deset'
    },
    {
        id: 5, courseName: 'Programina', teacher: 'ASd WDasd', examDate: '2.2.2020.', ects: 7, markNumber: 10, mark: 'deset'
    },
    {
        id: 6, courseName: 'Programina', teacher: 'ASd WDasd', examDate: '2.2.2020.', ects: 7, markNumber: 10, mark: 'deset'
    },
    {
        id: 7, courseName: 'Programina', teacher: 'ASd WDasd', examDate: '2.2.2020.', ects: 7, markNumber: 10, mark: 'deset'
    },
]


export default function Home({ navigation }) {
    const [exams, setExams] = useState([]);

    const getDateFormated = (n) => {
        const d = new Date(n);
        return d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear();
    }

    return (
        <View>
            <MyHeader myTitle="Home" navigation={navigation}/>

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