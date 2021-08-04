import React, {useEffect, useState} from 'react'
import MyHeader from "./MyHeader";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TestRegistration from "./TestsComponents/TestRegistration";
import TestsOverview from "./TestsComponents/TestsOverview";
import axios from "axios";
import {TOKEN} from "../App";
import {View} from "react-native";
import {ActivityIndicator} from "react-native-paper";


const Tab = createMaterialTopTabNavigator();


export default function Tests({ navigation }) {
    const [current, setCurrent] = React.useState([]);
    const [past, setPast] = React.useState([]);
    const [exams, setExams] = useState([])
    const [isReady, setIsReady] = React.useState(false)


    useEffect(() => {
        getCurrentExams()
        getPastExams()
        getExams()
    }, [])


    const getExams = () => {
        axios.get('http://192.168.44.83:8080/u/0/student-exams/registration/unregistered/'
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
    }


    const getCurrentExams = () => {
        axios.get('http://192.168.44.79:8080/u/0/student-exams/registration/registered/false'
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setCurrent(response.data)
            })
            .catch(function (error) {
                console.log('error: ',error);
            })
    }


    const getPastExams = () => {
        axios.get('http://192.168.44.79:8080/u/0/student-exams/registration/registered/true'
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setPast(response.data)
            })
            .catch(function (error) {
                console.log('error: ',error);
            })
    }


    if (!isReady)
        return(
            <View style={{ flex: 1, alignItems: 'center' }}>
                <MyHeader myTitle="Ispiti" navigation={navigation}/>
                <ActivityIndicator style={{marginTop: '50%'}} color={'dodgerblue'} size={'large'}/>
            </View>
        );


    return (
        <>
            <MyHeader myTitle="Ispiti" navigation={navigation}/>
            <Tab.Navigator tabBarOptions={{
                activeTintColor: 'dodgerblue',
                labelStyle: { fontSize: 11, color: 'white'},
                style: { backgroundColor: '#434343'},
            }}>
                <Tab.Screen name="ZeroTab" children={() => <TestRegistration exams={exams} setCurrent={getCurrentExams} setExams={getExams}/>} options={{ tabBarLabel: 'Prijava ispita' }}/>
                <Tab.Screen name="FirstTab" children={() => <TestsOverview setExams={getExams} setCurrentExams={getCurrentExams} current={current} past={past}/>} options={{ tabBarLabel: 'Prijavljeni ispiti' }}/>
            </Tab.Navigator>
        </>
    );
}