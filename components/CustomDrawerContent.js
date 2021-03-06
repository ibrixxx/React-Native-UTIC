import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";
import axios from "axios";
import {TOKEN} from "../App";
import {Avatar} from "react-native-elements";
import {TouchableRipple} from "react-native-paper";


export default function CustomDrawerContent(props) {

    const [student, setStudent] = useState({});
    const [studyProgram, setStudyProgram] = useState({});


    useEffect(() => {
        getUserData();
        getStudyProgram();
    }, [])


    const getUserData = () => {
        axios.get(' http://192.168.44.79:8080/u/0/students/student/personal-information', {
            headers: {
                Accept: 'application/json',
                Authorization: TOKEN
            }
        })
            .then(respnse => {
                setStudent(respnse.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const getStudyProgram = () => {
        axios.get('http://192.168.44.79:8080/u/0/students/student/personal-information/study-program', {
            headers: {
                Accept: 'application/json',
                Authorization: TOKEN
            }
        })
            .then(respnse => {
                setStudyProgram(respnse.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    function getInitials() {
        let first = student? student.firstName? student.firstName[0]:'':''
        let last = student? student.lastName? student.lastName[0]:'':''
        return first+last
    }

    return (
        <DrawerContentScrollView {...props}>
            <TouchableRipple
                onPress={() => props.navigation.navigate("StudentData")}>
                <View
                    style={{
                        marginTop: -5,
                        backgroundColor: '#263238',
                        padding: 20,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row'
                    }}
                >
                    <Avatar rounded title={getInitials()} size="large" overlayContainerStyle={{ backgroundColor: '#2C8BD3' }}/>
                    <View>
                        <Text style={{ color: 'white', fontSize: 20 }}>{student.firstName} {student.lastName}</Text>
                        <Text style={{ color: 'white' }}>Index: {studyProgram.index}</Text>
                    </View>

                </View>
            </TouchableRipple>

            <DrawerItemList {...props} labelStyle={{color: props.theme.text}}/>

        </DrawerContentScrollView>
    );
}
