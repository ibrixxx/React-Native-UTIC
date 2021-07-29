import React, {useEffect} from 'react'
import {ScrollView, Text, View} from "react-native";
import axios from "axios";
import {TOKEN} from "../../App";
import {
    ActivityIndicator,
    Button,
    Caption,
    Checkbox,
    DataTable,
    Divider,
    List,
    Portal,
    Provider
} from "react-native-paper";
import CourseModal2 from "../Modals/CourseModal2";


export default function TestsOverview() {
    const [isReady, setIsReady] = React.useState(false);
    const [current, setCurrent] = React.useState([]);
    const [past, setPast] = React.useState([]);
    const [activeList, setActiveList] = React.useState(88);
    const [activeList2, setActiveList2] = React.useState(null);


    useEffect(() => {
        axios.get('http://192.168.44.79:8080/u/0/student-exams/registration/registered/false'
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setCurrent(response.data)
                axios.get('http://192.168.44.79:8080/u/0/student-exams/registration/registered/true'
                    , {
                        headers: {
                            Accept: 'application/json',
                            Authorization: TOKEN
                        }
                    })
                    .then(function (response) {
                        setPast(response.data)
                        setIsReady(true)
                    })
                    .catch(function (error) {
                        console.log('error: ',error);
                    })
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


    const formatTimestamp = (num) => {
        const date = new Date(num);
        return ""+date.getDate()+
            "/"+(date.getMonth()+1)+
            "/"+date.getFullYear()+
            " "+date.getHours()+
            ":"+date.getMinutes()+""
    }


    const formatType = (num) => {
        if(num === 1)
            return 'Parcijalni'
        else if(num === 2)
            return 'Završni'
        else if(num === 3)
            return 'Popravni'
        else
            return 'Socijalni'
    }


    if (!isReady) {
        return <ActivityIndicator style={{marginTop: '50%'}} color={'dodgerblue'} size={'large'}/>
    }


    return (
        <View style={{backgroundColor: '#e0e0e0', height: '100%'}}>
            <ScrollView style={{backgroundColor: '#e0e0e0'}}>
                <List.Section
                    title="Prijavljeni ispiti"
                    titleStyle={{color: 'dodgerblue', fontWeight: 'bold', backgroundColor: '#e0e0e0'}}>
                    <List.Accordion
                        title={`Trenutno prijavljeni ispiti`}
                        titleStyle={{fontWeight: 'bold'}}
                        expanded={88 === activeList}
                        onPress={() => handlePress(88)}>
                        { (current.length > 0)?
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>Predmet</DataTable.Title>
                                    <DataTable.Title numeric>Datum i vrijeme</DataTable.Title>
                                    <DataTable.Title numeric> </DataTable.Title>
                                </DataTable.Header>
                                {
                                    current.map((p, i) => {
                                        return (
                                            <DataTable.Row key={'s' + i}>
                                                <DataTable.Cell>
                                                    {p.courseName}
                                                </DataTable.Cell>
                                                <DataTable.Cell numeric>
                                                    {formatTimestamp(p.examDate)}}
                                                </DataTable.Cell>
                                                <DataTable.Cell numeric>
                                                    <Button>Odjavi</Button>
                                                </DataTable.Cell>
                                            </DataTable.Row>
                                        );
                                    })
                                }
                            </DataTable>
                            :
                            <Caption style={{textAlign: 'center', padding: '10%'}}>Nemate prijavljenih ispita</Caption>
                        }
                    </List.Accordion>
                    <Divider key={'dev'+88}/>
                    <List.Accordion
                        title={`Prethodno prijavljeni ispiti`}
                        titleStyle={{fontWeight: 'bold'}}
                        expanded={88 === activeList2}
                        onPress={() => handlePress2(88)}>
                        { (past.length > 0)?
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Predmet</DataTable.Title>
                                <DataTable.Title numeric>Datum i vrijeme</DataTable.Title>
                                <DataTable.Title numeric>Tip ispita</DataTable.Title>
                            </DataTable.Header>
                            {
                                past.map((p, i) => {
                                    return(
                                        <DataTable.Row key={'d'+i}>
                                            <DataTable.Cell>
                                                {p.courseName}
                                            </DataTable.Cell>
                                            <DataTable.Cell numeric>
                                                {formatTimestamp(p.examDate)}}
                                            </DataTable.Cell>
                                            <DataTable.Cell numeric>
                                                {formatType(p.gradedActivityType)}
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    );
                                })
                            }
                        </DataTable>:
                            <Caption style={{textAlign: 'center', padding: '10%'}}>Nemate prijavljenih prethodno ispita</Caption>
                        }
                    </List.Accordion>
                </List.Section>
            </ScrollView>
            <Provider>
                <Portal>

                </Portal>
            </Provider>
        </View>
    );
}