import React, {useEffect, useRef} from 'react'
import MyHeader from "./MyHeader";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Grades from "./CurriculumComponents/Grades";
import CurrentSemester from "./CurriculumComponents/CurrentSemester";
import AllSemesters from "./CurriculumComponents/AllSemesters";
import SelectedClasses from "./CurriculumComponents/SelectedClasses";
import axios from "axios";
import {TOKEN} from "../App";
import {ActivityIndicator} from "react-native-paper";
import {View} from "react-native";
import BottomSheet from "./BottomSheet";


const Tab = createMaterialTopTabNavigator();


export default function Curriculum({ navigation, theme, changeTheme, role, isDark}) {
    const [classes, setClasses] = React.useState([]);
    const [isReady, setIsReady] = React.useState(false);
    const refRBSheet = useRef();


    useEffect(() => {
        getCurrentCourses()
    }, [])


    const getCurrentCourses = () => {
        axios.get('http://192.168.44.79:8080/u/0/students/courses/current'
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setClasses(response.data)
                setIsReady(true)
            })
            .catch(function (error) {
                console.log('error: ',error);
            })
    }


    if (!isReady) {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <MyHeader myTitle="Studij" navigation={navigation}/>
                <ActivityIndicator style={{marginTop: '50%'}} color={'#2C8BD3'} size={'large'}/>
            </View>
        )
    }

    if (role)
        return (
            <>
                <MyHeader myTitle="Studij" navigation={navigation} sheetOpen={() => {refRBSheet.current.open()}}/>
                <Tab.Navigator tabBarOptions={{
                    activeTintColor: theme.secondary,
                    labelStyle: { fontSize: 11, color: 'white'},
                    style: { backgroundColor: theme.primary},
                }}>
                    <Tab.Screen name="ThirdTab" children={() => <CurrentSemester theme={theme} classes={classes}/>} options={{ tabBarLabel: 'Trenutni semestar' }}/>
                    <Tab.Screen name="ZeroTab" children={() => <Grades theme={theme}/>} options={{ tabBarLabel: 'Ocjene' }}/>
                    <Tab.Screen name="SecondTab" children={() => <SelectedClasses theme={theme} selected={classes.filter((c) => c.mandatory===false)} getSelected={getCurrentCourses}/>} options={{ tabBarLabel: 'Izborni predmeti' }}/>
                    <Tab.Screen name="FirstTab" children={() => <AllSemesters theme={theme}/>} options={{ tabBarLabel: 'Nastavni plan i program' }}/>
                </Tab.Navigator>
                <BottomSheet myRef={refRBSheet} navigateHome={() => navigation.navigate('Home')} changeTheme={changeTheme}/>
            </>
        )
    else
        return(
            <>
                <MyHeader myTitle="Studij" navigation={navigation} sheetOpen={() => {refRBSheet.current.open()}}/>
                <Tab.Navigator tabBarOptions={{
                    activeTintColor: theme.secondary,
                    labelStyle: { fontSize: 11, color: 'white'},
                    style: { backgroundColor: theme.primary},
                }}>
                    <Tab.Screen name="ZeroTab" children={() => <Grades theme={theme}/>} options={{ tabBarLabel: 'Ocjene' }}/>
                    <Tab.Screen name="FirstTab" children={() => <AllSemesters theme={theme}/>} options={{ tabBarLabel: 'Nastavni plan i program' }}/>
                </Tab.Navigator>
                <BottomSheet myRef={refRBSheet} navigateHome={() => navigation.navigate('Home')} changeTheme={changeTheme} isDark={isDark} role={role}/>
            </>
        );

}