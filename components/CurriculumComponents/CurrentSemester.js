import React, {useEffect} from "react";
import {ActivityIndicator, DataTable, Title} from "react-native-paper";
import axios from "axios";
import {TOKEN} from "../../App";

export default function CurrentSemester() {
    const [isReady, setIsReady] = React.useState(false);
    const [classes, setClasses] = React.useState([]);


    useEffect(() => {
        axios.get('http://192.168.44.83:8080/u/0/students/courses/current'
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setClasses(response.data)
                setIsReady(true)
            })
            .catch(function (error) {
                console.log('error: ',error);
            })
    }, [])


    if (!isReady) {
        return <ActivityIndicator color={'dodgerblue'} size={'large'}/>
    }

    return(
        <>
            <Title style={{color: 'dodgerblue', margin: '1%'}}>Spisak predmeta</Title>
            <DataTable>
                <DataTable.Header style={{width: '100%'}}>
                    <DataTable.Title>Predmet</DataTable.Title>
                    <DataTable.Title>Šifra predmeta</DataTable.Title>
                    <DataTable.Title>ECTS</DataTable.Title>
                    <DataTable.Title>P+V+S</DataTable.Title>
                    <DataTable.Title>Tip predmeta</DataTable.Title>
                </DataTable.Header>
                {
                    classes.map((c, index) => {
                        return (
                            <DataTable.Row style={{width: '100%'}} key={index}>
                                <DataTable.Cell>{c.courseName}</DataTable.Cell>
                                <DataTable.Cell>{c.code}</DataTable.Cell>
                                <DataTable.Cell>{c.ects}</DataTable.Cell>
                                <DataTable.Cell>{c.exerciseHours}+{c.lectureHours}+{c.seminarHours}</DataTable.Cell>
                                <DataTable.Cell>{c.mandatory ? 'Obavezni' : 'Izborni'}</DataTable.Cell>
                            </DataTable.Row>
                            );
                    })
                }
            </DataTable>
        </>
    );
}