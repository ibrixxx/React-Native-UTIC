import React, {useEffect, useRef, useState} from 'react'
import MyHeader from "./MyHeader";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TestRegistration from "./TestsComponents/TestRegistration";
import TestsOverview from "./TestsComponents/TestsOverview";
import axios from "axios";
import {TOKEN} from "../App";
import {View} from "react-native";
import {ActivityIndicator} from "react-native-paper";
import BottomSheet from "./BottomSheet";


const Tab = createMaterialTopTabNavigator();


export default function Tests({ navigation, theme, changeTheme, role, isDark}) {
    const [current, setCurrent] = React.useState([]);
    const [past, setPast] = React.useState([]);
    const [exams, setExams] = useState([])
    const [isReady, setIsReady] = React.useState(false)
    const refRBSheet = useRef();



    useEffect(() => {
        getCurrentExams(() => {})
        getPastExams()
        getExams(() => {})
    }, [])


    const getExams = (f) => {
        axios.get('http://192.168.44.79:8080/u/0/student-exams/registration/unregistered/'
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setExams(response.data)
                setIsReady(true)
                f()
            })
            .catch(function (error) {
                f()
                console.log('error: ',error);
            })
    }


    const getCurrentExams = (f) => {
        axios.get('http://192.168.44.79:8080/u/0/student-exams/registration/registered/false'
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setCurrent(response.data)
                f()
            })
            .catch(function (error) {
                f()
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
                <ActivityIndicator style={{marginTop: '50%'}} color={'#2C8BD3'} size={'large'}/>
            </View>
        );

    if (role)
        return (
            <>
                <MyHeader myTitle="Ispiti" navigation={navigation} sheetOpen={() => {refRBSheet.current.open()}}/>
                <Tab.Navigator tabBarOptions={{
                    activeTintColor: theme.secondary,
                    labelStyle: { fontSize: 11, color: 'white'},
                    style: { backgroundColor: theme.primary, zIndex: 0},
                }}>
                    <Tab.Screen name="ZeroTab" children={() => <TestRegistration exams={exams} setCurrent={getCurrentExams} setExams={getExams} theme={theme}/>} options={{ tabBarLabel: 'Prijava ispita' }}/>
                    <Tab.Screen name="FirstTab" children={() => <TestsOverview setExams={getExams} setCurrentExams={getCurrentExams} current={current} past={past} theme={theme}/>} options={{ tabBarLabel: 'Prijavljeni ispiti' }}/>
                </Tab.Navigator>
                <BottomSheet myRef={refRBSheet} navigateHome={() => navigation.navigate('Home')} changeTheme={changeTheme} isDark={isDark}/>
            </>
        );
    else
        return(
            <>
                <MyHeader myTitle="Ispiti" navigation={navigation} sheetOpen={() => {refRBSheet.current.open()}}/>
                <Tab.Navigator tabBarOptions={{
                    activeTintColor: theme.secondary,
                    labelStyle: { fontSize: 11, color: 'white'},
                    style: { backgroundColor: theme.primary, zIndex: 0},
                }}>
                    <Tab.Screen name="FirstTab" children={() => <TestsOverview setExams={getExams} setCurrentExams={getCurrentExams} current={current} past={past} theme={theme}/>} options={{ tabBarLabel: 'Prijavljeni ispiti' }}/>
                </Tab.Navigator>
                <BottomSheet myRef={refRBSheet} navigateHome={() => navigation.navigate('Home')} changeTheme={changeTheme} isDark={isDark} role={role}/>
            </>
        );
}