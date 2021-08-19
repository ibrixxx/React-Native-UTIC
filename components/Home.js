import React, {useEffect, useRef, useState} from 'react'
import {View} from "react-native";
import MyHeader from "./MyHeader";
import {ActivityIndicator, Caption, Card, DataTable, Portal, Provider, Text} from "react-native-paper";
import axios from "axios";
import {TOKEN} from "../App";
import CourseModal from "./Modals/CourseModal";
import {Icon} from "react-native-elements";
import {formatTimestamp, formatTimestamp2} from "./Formats/MyFormats";
import BottomSheet from "./BottomSheet";


export default function Home({ navigation, theme, changeTheme, role}) {
    const [exams, setExams] = useState([])
    const [isReady, setIsReady] = React.useState(false)
    const [visible, setVisible] = React.useState(false)
    const [curr, setCurr] = React.useState(null)
    const refRBSheet = useRef();


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


    const hideModal = () => setVisible(false)

    const showModal = (i) => {setVisible(true); setCurr(i)}



    if (!isReady) {
        return(
            <View style={{ flex: 1, alignItems: 'center' }}>
                <MyHeader myTitle="Početna" navigation={navigation} sheetOpen={() => {refRBSheet.current.open()}}/>
                <ActivityIndicator style={{marginTop: '50%'}} color={'dodgerblue'} size={'large'}/>
                <BottomSheet myRef={refRBSheet} navigateHome={() => navigation.navigate('Home')}/>
            </View>
        );
    }


    return (
        <>
            <MyHeader myTitle="Početna" navigation={navigation} sheetOpen={() => {refRBSheet.current.open()}}/>
            <Card style={{height: '100%', flex: 1, backgroundColor: theme? theme.mainBackground:'orange'}}>
                <Card.Title
                    title="Spisak nadolazećih ispita"
                    titleStyle={{color: '#2C8BD3'}}
                />
                <Card.Content>
                    {(exams.length > 0)?
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title style={{flex: 0.08}}></DataTable.Title>
                                <DataTable.Title style={{flex: 0.5}}><Text style={{fontWeight: 'bold', color: theme.text}}>Predmet</Text></DataTable.Title>
                                <DataTable.Title style={{flex: 0.3}} numeric><Text style={{fontWeight: 'bold', color: theme.text}}>Datum ispita</Text></DataTable.Title>
                                <DataTable.Title style={{flex: 0.2}} numeric><Text style={{fontWeight: 'bold', color: theme.text}}>Vrijeme</Text></DataTable.Title>
                            </DataTable.Header>
                            {
                                exams.map((e, index) => {
                                    return (
                                        <DataTable.Row key={index} onPress={() => {showModal(index)}}>
                                            <DataTable.Cell style={{flex: 0.08}}>
                                                <Icon
                                                    name='search'
                                                    type='material'
                                                    color='#517fa4'
                                                    size={14}/>
                                            </DataTable.Cell>
                                            <DataTable.Cell style={{flex: 0.5}}><Text style={{color: theme.text}}>{e.courseName}</Text></DataTable.Cell>
                                            <DataTable.Cell style={{flex: 0.3}} numeric><Text style={{color: theme.text}}>{formatTimestamp(e.examDate)}</Text></DataTable.Cell>
                                            <DataTable.Cell style={{flex: 0.2}} numeric><Text style={{color: theme.text}}>{formatTimestamp2(e.examDate)}</Text></DataTable.Cell>
                                        </DataTable.Row>
                                    );
                                })
                            }
                        </DataTable>
                        :
                        <Caption>Nemate nadolazećih ispita</Caption>
                    }
                    <BottomSheet myRef={refRBSheet} navigateHome={() => navigation.navigate('Home')} changeTheme={changeTheme}/>
                </Card.Content>
                <Provider>
                    <Portal>
                        <CourseModal index={curr} visible={visible} courses={exams} hideModal={hideModal}/>
                    </Portal>
                </Provider>
            </Card>
        </>
    );
}