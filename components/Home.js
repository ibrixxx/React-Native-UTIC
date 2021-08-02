import React, {useEffect, useState} from 'react'
import {View} from "react-native";
import MyHeader from "./MyHeader";
import {ActivityIndicator, Caption, Card, DataTable, Portal, Provider} from "react-native-paper";
import axios from "axios";
import {TOKEN} from "../App";
import CourseModal from "./Modals/CourseModal";


export default function Home({ navigation }) {
    const [exams, setExams] = useState([])
    const [isReady, setIsReady] = React.useState(false)
    const [visible, setVisible] = React.useState(false)
    const [curr, setCurr] = React.useState(null)



    useEffect(() => {
        axios.get('http://192.168.44.79:8080/u/0/student-exams/registration/registered/false'
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setExams(response.data)
                setIsReady(true)
            })
            .catch(function (error) {
                console.log('error: ',error);
            })
    }, [])


    const getDateFormated = (n) => {
        const d = new Date(n);
        return d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear();
    }

    const formatTimestamp2 = (num) => {
        const date = new Date(num);
        return ""+date.getHours()+
            ":"+date.getMinutes()+
            "h";
    }

    const hideModal = () => setVisible(false)

    const showModal = (i) => {setVisible(true); setCurr(i)}



    if (!isReady) {
        return(
            <View style={{ flex: 1, alignItems: 'center' }}>
                <MyHeader myTitle="Početna" navigation={navigation}/>
                <ActivityIndicator style={{marginTop: '50%'}} color={'dodgerblue'} size={'large'}/>
            </View>
        );
    }



    return (
        <View>
            <MyHeader myTitle="Home" navigation={navigation}/>
            <Card style={{height: '100%'}}>
                <Card.Title
                    title="Spisak nadolazećih ispita"
                    titleStyle={{color: 'dodgerblue'}}
                />
                <Card.Content>
                    {(exams.length > 0)?
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title style={{flex: 0.5}}>Predmet</DataTable.Title>
                                <DataTable.Title style={{flex: 0.3}} numeric>Datum ispita</DataTable.Title>
                                <DataTable.Title style={{flex: 0.2}} numeric>Vrijeme</DataTable.Title>
                            </DataTable.Header>
                            {
                                exams.map((e, index) => {
                                    return (
                                        <DataTable.Row key={index} onPress={() => {showModal(index)}}>
                                            <DataTable.Cell style={{flex: 0.5}}>{e.courseName}</DataTable.Cell>
                                            <DataTable.Cell style={{flex: 0.3}} numeric>{getDateFormated(e.examDate)}</DataTable.Cell>
                                            <DataTable.Cell style={{flex: 0.2}} numeric>{formatTimestamp2(e.examDate)}</DataTable.Cell>
                                        </DataTable.Row>
                                    );
                                })
                            }
                        </DataTable>
                        :
                        <Caption>Nemate nadolazećih ispita</Caption>
                    }
                </Card.Content>
                <Provider>
                    <Portal>
                        <CourseModal index={curr} visible={visible} courses={exams} hideModal={hideModal}/>
                    </Portal>
                </Provider>
            </Card>
        </View>
    );
}