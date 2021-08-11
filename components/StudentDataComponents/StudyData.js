import React, {useEffect, useState} from 'react';
import axios from "axios";
import {TOKEN} from "../../App";
import {ActivityIndicator, DataTable, Title} from "react-native-paper";
import {StyleSheet, Text, View} from "react-native";
import {white} from "react-native-paper/src/styles/colors";

export default function StudyData(){
    const[studyProgram, setStudyProgram] = useState({})
    const[isReady, setIsReady] = useState(false)

    useEffect(() => {
        getStudyProgram()
    }, [])

    const getStudyProgram = () => {
        axios.get('http://192.168.44.79:8080/u/0/students/student/personal-information/study-program', {
            headers: {
                Accept: 'application/json',
                Authorization: TOKEN
            }
        })
            .then(respnse => {
                console.log(respnse.data)
                setStudyProgram(respnse.data)
                setIsReady(true)
            })
            .catch(error => {
                console.error(error);
            });
    }

    if (!isReady) {
        return <ActivityIndicator style={{marginTop: '50%'}} color={'#2C8BD3'} size={'large'}/>
    }

    return (
        <>
            <View style={style.container}>
                <DataTable style={{ marginTop: 20 }}>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={style.TDStyleLeft}>Index</Text></DataTable.Cell>
                        <DataTable.Cell>{studyProgram.index?studyProgram.index:''}</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell><Text style={style.TDStyleLeft}>Fakultet</Text></DataTable.Cell>
                        <DataTable.Cell>{studyProgram.faculties?studyProgram.faculties[0].name:''}</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell><Text style={style.TDStyleLeft}>Odsjek</Text></DataTable.Cell>
                        <DataTable.Cell>{studyProgram.department?studyProgram.department[0].name:''}</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell><Text style={style.TDStyleLeft}>Studijski program</Text></DataTable.Cell>
                        <DataTable.Cell>{studyProgram.studyProgramBasic?studyProgram.studyProgramBasic:''}</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell><Text style={style.TDStyleLeft}>Semestar</Text></DataTable.Cell>
                        <DataTable.Cell>{studyProgram.currentSemester?studyProgram.currentSemester:''}</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell><Text style={style.TDStyleLeft}>Tip studija</Text></DataTable.Cell>
                        <DataTable.Cell>{studyProgram.studyType?studyProgram.studyType:''}</DataTable.Cell>
                    </DataTable.Row>

                </DataTable>
            </View>
        </>
    );
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    title: {
        textAlign: 'center',
        marginBottom: 10
    },
    TDStyleLeft: {
        fontWeight: 'bold'
    }
});
