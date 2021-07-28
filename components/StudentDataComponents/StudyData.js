import React, {useEffect, useState} from 'react';
import axios from "axios";
import {TOKEN} from "../../App";
import {DataTable, Title} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import {white} from "react-native-paper/src/styles/colors";

export default function StudyData(){
    const[studyProgram, setStudyProgram] = useState({})

    useEffect(() => {
        getStudyProgram()
    }, [])

    const getStudyProgram = () => {
        axios.get('http://192.168.44.83:8080/u/0/students/student/personal-information/study-program', {
            headers: {
                Accept: 'application/json',
                Authorization: TOKEN
            }
        })
            .then(respnse => {
                console.log(respnse.data)
                setStudyProgram(respnse.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <>
            <View style={style.container}>
                <DataTable style={{ marginTop: 20 }}>
                    <DataTable.Row>
                        <DataTable.Cell>Index</DataTable.Cell>
                        <DataTable.Cell>{studyProgram.index?studyProgram.index:''}</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Fakultet</DataTable.Cell>
                        <DataTable.Cell>{studyProgram.faculties?studyProgram.faculties[0].name:''}</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Odsjek</DataTable.Cell>
                        <DataTable.Cell>{studyProgram.department?studyProgram.department[0].name:''}</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Studijski program</DataTable.Cell>
                        <DataTable.Cell>{studyProgram.studyProgramBasic?studyProgram.studyProgramBasic:''}</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Semestar</DataTable.Cell>
                        <DataTable.Cell>{studyProgram.currentSemester?studyProgram.currentSemester:''}</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Tip studija</DataTable.Cell>
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
    }
});
