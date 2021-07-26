import React from 'react'
import {DataTable, Text, Banner, Subheading, Caption} from "react-native-paper";


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


export default function Grades() {
    const [visible, setVisible] = React.useState(true);

    return (
        <>
            <Banner
                visible={visible}
                actions={[
                    {
                        label: 'OK',
                        labelStyle: {color: '#c2a711'},
                        onPress: () => setVisible(false),
                    }
                ]}
                >
                <Subheading>Žutom bojom su označene ocjene koje još uvijek nisu finalizirane. {"\n"}</Subheading>
                <Caption>U slučaju greške, obratite se odgovarajućem profesuru/ici ili studentskoj službi.</Caption>
            </Banner>
            <DataTable >
                <DataTable.Header >
                    <DataTable.Title style={{maxWidth: '25%'}}>Predmet</DataTable.Title>
                    <DataTable.Title style={{maxWidth: '25%'}}>Nastavnik</DataTable.Title>
                    <DataTable.Title style={{maxWidth: '20%'}}>Datum</DataTable.Title>
                    <DataTable.Title style={{maxWidth: '15%'}}>ECTS</DataTable.Title>
                    <DataTable.Title style={{maxWidth: '20%'}}>Ocjena</DataTable.Title>
                </DataTable.Header>
                {grades.map((grade, ind) => {
                    return (
                        <DataTable.Row key={ind}>
                            <DataTable.Cell style={{maxWidth: '25%'}}><Text style={{fontSize: 11, textAlign: 'center', alignItems: 'center'}}>{grade.courseName}</Text></DataTable.Cell>
                            <DataTable.Cell style={{maxWidth: '25%'}}><Text style={{fontSize: 11, textAlign: 'center', alignItems: 'center'}}>{grade.teacher}</Text></DataTable.Cell>
                            <DataTable.Cell style={{maxWidth: '20%'}}><Text style={{fontSize: 11, textAlign: 'center', alignItems: 'center'}}>{grade.examDate}</Text></DataTable.Cell>
                            <DataTable.Cell style={{maxWidth: '15%'}}><Text style={{fontSize: 11, textAlign: 'center', alignItems: 'center'}}>{grade.ects}</Text></DataTable.Cell>
                            <DataTable.Cell style={{maxWidth: '20%'}}><Text style={{fontSize: 11, textAlign: 'center', alignItems: 'center'}}>{grade.markNumber} ({grade.mark})</Text></DataTable.Cell>
                        </DataTable.Row>
                    );
                })}
            </DataTable>
        </>
    );
}