import React, {useEffect, useState} from 'react';
import axios from "axios";
import {TOKEN} from "../../App";
import {ActivityIndicator, DataTable} from "react-native-paper";
import {Text, View} from "react-native";
import style from "../styles/DarkMode";

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
            <View style={style.containerSD}>
                <DataTable style={{ marginTop: 20 }}>
                    {/*<DataTable.Row>
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
                    </DataTable.Row>*/}

                    <DataTable.Row>
                        <Text style={style.TDStyleLeft}>Index</Text>
                        <Text style={style.TDStyleRight}>{studyProgram.index?studyProgram.index:''}</Text>
                    </DataTable.Row>

                    <DataTable.Row>
                        <Text style={style.TDStyleLeft}>Fakultet</Text>
                        <Text style={style.TDStyleRight}>{studyProgram.faculties?studyProgram.faculties[0].name:''}</Text>
                    </DataTable.Row>

                    <DataTable.Row>
                        <Text style={style.TDStyleLeft}>Odsjek</Text>
                        <Text style={style.TDStyleRight}>{studyProgram.department?studyProgram.department[0].name:''}</Text>
                    </DataTable.Row>

                    <DataTable.Row>
                        <Text style={style.TDStyleLeft}>Studijski program</Text>
                        <Text style={style.TDStyleRight}>{studyProgram.studyProgramBasic?studyProgram.studyProgramBasic:''}</Text>
                    </DataTable.Row>

                    <DataTable.Row>
                        <Text style={style.TDStyleLeft}>Semestar</Text>
                        <Text style={style.TDStyleRight}>{studyProgram.currentSemester?studyProgram.currentSemester:''}</Text>
                    </DataTable.Row>

                    <DataTable.Row>
                        <Text style={style.TDStyleLeft}>Tip studija</Text>
                        <Text style={style.TDStyleRight}>{studyProgram.studyType?studyProgram.studyType:''}</Text>
                    </DataTable.Row>
                </DataTable>
            </View>
        </>
    );
}
