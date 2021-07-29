import React, {useEffect} from 'react'
import MyHeader from "./MyHeader";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Grades from "./CurriculumComponents/Grades";
import CurrentSemester from "./CurriculumComponents/CurrentSemester";
import AllSemesters from "./CurriculumComponents/AllSemesters";
import SelectedClasses from "./CurriculumComponents/SelectedClasses";
import axios from "axios";
import {TOKEN} from "../App";
import {ActivityIndicator} from "react-native-paper";


const Tab = createMaterialTopTabNavigator();


export default function Curriculum({ navigation }) {
    const [classes, setClasses] = React.useState([]);
    const [isReady, setIsReady] = React.useState(false);


    useEffect(() => {
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
    }, [])


    if (!isReady) {
        return <ActivityIndicator color={'dodgerblue'} size={'large'}/>
    }


    return (
        <>
            <MyHeader myTitle="Studij" navigation={navigation}/>
            <Tab.Navigator tabBarOptions={{
                activeTintColor: 'dodgerblue',
                labelStyle: { fontSize: 11, color: 'white'},
                style: { backgroundColor: '#434343'},
            }}>
                <Tab.Screen name="ThirdTab" component={() => <CurrentSemester classes={classes}/>} options={{ tabBarLabel: 'Trenutni semestar' }}/>
                <Tab.Screen name="ZeroTab" component={Grades} options={{ tabBarLabel: 'Ocjene' }}/>
                <Tab.Screen name="SecondTab" component={() => <SelectedClasses selected={classes.filter((c) => c.mandatory===false)}/>} options={{ tabBarLabel: 'Izborni predmeti' }}/>
                <Tab.Screen name="FirstTab" component={AllSemesters} options={{ tabBarLabel: 'Nastavni plan i program' }}/>
            </Tab.Navigator>
        </>
    )
}