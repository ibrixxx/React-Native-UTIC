import React, {useEffect, useState} from 'react';
import axios from "axios";
import {TOKEN} from "../../App";
import {ActivityIndicator, DataTable} from "react-native-paper";
import {Text, View} from "react-native";
import style from "../styles/DarkMode";

export default function StudyData({ theme }){
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
        return (
            <View style={{ height: '100%', backgroundColor: theme.mainBackground }}>
                <ActivityIndicator style={{marginTop: '50%'}} color={'#2C8BD3'} size={'large'}/>
            </View>
        )
    }

    return (
        <>
            <View style={{
                width: '100%',
                height: '100%',
                padding: 15,
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: theme.mainBackground
            }}>
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
                        <Text style={{
                            fontWeight: 'bold',
                            width: '50%',
                            textAlignVertical: 'center',
                            textAlign: 'right',
                            paddingTop: '2%',
                            paddingBottom: '2%',
                            paddingRight: '4%',
                            borderRightWidth: 0.3,
                            borderRightColor: "#aaa",
                            color: theme.text
                        }}>Index</Text>
                        <Text style={{
                            width: '50%',
                            textAlignVertical: 'center',
                            paddingTop: '2%',
                            paddingBottom: '2%',
                            paddingLeft: '4%',
                            color: theme.text
                        }}>{studyProgram.index?studyProgram.index:''}</Text>
                    </DataTable.Row>

                    <DataTable.Row>
                        <Text style={{
                            fontWeight: 'bold',
                            width: '50%',
                            textAlignVertical: 'center',
                            textAlign: 'right',
                            paddingTop: '2%',
                            paddingBottom: '2%',
                            paddingRight: '4%',
                            borderRightWidth: 0.3,
                            borderRightColor: "#aaa",
                            color: theme.text
                        }}>Fakultet</Text>
                        <Text style={{
                            width: '50%',
                            textAlignVertical: 'center',
                            paddingTop: '2%',
                            paddingBottom: '2%',
                            paddingLeft: '4%',
                            color: theme.text
                        }}>{studyProgram.faculties?studyProgram.faculties[0].name:''}</Text>
                    </DataTable.Row>

                    <DataTable.Row>
                        <Text style={{
                            fontWeight: 'bold',
                            width: '50%',
                            textAlignVertical: 'center',
                            textAlign: 'right',
                            paddingTop: '2%',
                            paddingBottom: '2%',
                            paddingRight: '4%',
                            borderRightWidth: 0.3,
                            borderRightColor: "#aaa",
                            color: theme.text
                        }}>Odsjek</Text>
                        <Text style={{
                            width: '50%',
                            textAlignVertical: 'center',
                            paddingTop: '2%',
                            paddingBottom: '2%',
                            paddingLeft: '4%',
                            color: theme.text
                        }}>{studyProgram.department?studyProgram.department[0].name:''}</Text>
                    </DataTable.Row>

                    <DataTable.Row>
                        <Text style={{
                            fontWeight: 'bold',
                            width: '50%',
                            textAlignVertical: 'center',
                            textAlign: 'right',
                            paddingTop: '2%',
                            paddingBottom: '2%',
                            paddingRight: '4%',
                            borderRightWidth: 0.3,
                            borderRightColor: "#aaa",
                            color: theme.text
                        }}>Studijski program</Text>
                        <Text style={{
                            width: '50%',
                            textAlignVertical: 'center',
                            paddingTop: '2%',
                            paddingBottom: '2%',
                            paddingLeft: '4%',
                            color: theme.text
                        }}>{studyProgram.studyProgramBasic?studyProgram.studyProgramBasic:''}</Text>
                    </DataTable.Row>

                    <DataTable.Row>
                        <Text style={{
                            fontWeight: 'bold',
                            width: '50%',
                            textAlignVertical: 'center',
                            textAlign: 'right',
                            paddingTop: '2%',
                            paddingBottom: '2%',
                            paddingRight: '4%',
                            borderRightWidth: 0.3,
                            borderRightColor: "#aaa",
                            color: theme.text
                        }}>Semestar</Text>
                        <Text style={{
                            width: '50%',
                            textAlignVertical: 'center',
                            paddingTop: '2%',
                            paddingBottom: '2%',
                            paddingLeft: '4%',
                            color: theme.text
                        }}>{studyProgram.currentSemester?studyProgram.currentSemester:''}</Text>
                    </DataTable.Row>

                    <DataTable.Row>
                        <Text style={{
                            fontWeight: 'bold',
                            width: '50%',
                            textAlignVertical: 'center',
                            textAlign: 'right',
                            paddingTop: '2%',
                            paddingBottom: '2%',
                            paddingRight: '4%',
                            borderRightWidth: 0.3,
                            borderRightColor: "#aaa",
                            color: theme.text
                        }}>Tip studija</Text>
                        <Text style={{
                            width: '50%',
                            textAlignVertical: 'center',
                            paddingTop: '2%',
                            paddingBottom: '2%',
                            paddingLeft: '4%',
                            color: theme.text
                        }}>{studyProgram.studyType?studyProgram.studyType:''}</Text>
                    </DataTable.Row>
                </DataTable>
            </View>
        </>
    );
}
