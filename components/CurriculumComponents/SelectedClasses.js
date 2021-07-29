import React, {useEffect} from "react";
import axios from "axios";
import {TOKEN} from "../../App";
import {ActivityIndicator, Button, Checkbox, DataTable, Divider, List} from "react-native-paper";
import {ScrollView} from "react-native";


export default function SelectedClasses({selected}) {
    const [isReady, setIsReady] = React.useState(false);
    const [activeList, setActiveList] = React.useState(88);
    const [activeList2, setActiveList2] = React.useState(null);
    const [notSelected, setNotSelected] = React.useState([]);
    const [checked, setChecked] = React.useState(null);

    useEffect(() => {
        axios.get('http://192.168.44.79:8080/u/0/students/courses/optional'
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setNotSelected(response.data)
                setIsReady(true)
            })
            .catch(function (error) {
                console.log('error: ',error);
            })
    }, [])


    const handlePress = (ind) => {
        if(activeList === ind)
            setActiveList(null)
        else
            setActiveList(ind)
    }

    const handlePress2 = (ind) => {
        if(activeList2 === ind)
            setActiveList2(null)
        else
            setActiveList2(ind)
    }


    if (!isReady) {
        return <ActivityIndicator color={'dodgerblue'} size={'large'}/>
    }


    return (
        <ScrollView style={{backgroundColor: '#e0e0e0'}}>
            <List.Section
                title="Izborni predmeti"
                titleStyle={{color: 'dodgerblue', fontWeight: 'bold', backgroundColor: '#e0e0e0'}}>
                    <List.Accordion
                        title={`Odabrani izborni predmeti`}
                        titleStyle={{fontWeight: 'bold'}}
                        expanded={88 === activeList}
                        onPress={() => handlePress(88)}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Predmet</DataTable.Title>
                                <DataTable.Title numeric>P+V+S</DataTable.Title>
                                <DataTable.Title numeric>ECTS</DataTable.Title>
                            </DataTable.Header>
                        {
                            selected.map((p, i) => {
                                return(
                                        <DataTable.Row key={'s'+i}>
                                            <DataTable.Cell>
                                                {p.courseName}
                                            </DataTable.Cell>
                                            <DataTable.Cell numeric>
                                                {p.exerciseHours}+{p.lectureHours}+{p.seminarHours}
                                            </DataTable.Cell>
                                            <DataTable.Cell numeric>
                                                {p.ects}
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                );
                            })
                        }
                        </DataTable>
                    </List.Accordion>
                    <Divider key={'dev'+88}/>

                    <List.Accordion
                        title={`Dostupni izborni predmeti`}
                        titleStyle={{fontWeight: 'bold'}}
                        expanded={88 === activeList2}
                        onPress={() => handlePress2(88)}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Predmet</DataTable.Title>
                                <DataTable.Title numeric>P+V+S</DataTable.Title>
                                <DataTable.Title numeric>ECTS</DataTable.Title>
                                <DataTable.Title numeric>Označi</DataTable.Title>
                            </DataTable.Header>
                        {
                            notSelected.map((p, i) => {
                                return(
                                    <DataTable.Row key={'d'+i}>
                                        <DataTable.Cell>
                                            {p.courseName}
                                        </DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            {p.exerciseHours}+{p.lectureHours}+{p.seminarHours}
                                        </DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            {p.ects}
                                        </DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            <Checkbox
                                                status={checked===i? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    setChecked(i);
                                                }}
                                            />
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                );
                            })
                        }
                            <DataTable.Row>
                                <Button onPress={() => console.log('Pressed')}>Potvrdi</Button>
                            </DataTable.Row>
                        </DataTable>
                    </List.Accordion>
            </List.Section>
        </ScrollView>
    );
}