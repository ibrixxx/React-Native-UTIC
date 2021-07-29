import React from 'react'
import {StyleSheet, View} from "react-native";
import {Title} from "react-native-paper";
import MyHeader from "./MyHeader";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import MainStudentData from './StudentDataComponents/MainStudentData';
import StudentContacts from './StudentDataComponents/StudentContacts';
import StudyData from './StudentDataComponents/StudyData';

const Tab = createMaterialTopTabNavigator();


export default function StudentData({ navigation }) {

    return (
        <>
            <MyHeader myTitle="Lični podaci" navigation={navigation}/>

            <Tab.Navigator tabBarOptions={{
                activeTintColor: 'dodgerblue',
                labelStyle: { fontSize: 11, color: 'white'},
                style: { backgroundColor: '#434343'},
            }}>
                <Tab.Screen name="ZeroTab" component={MainStudentData} options={{ tabBarLabel: 'Podaci o studentu' }}/>
                <Tab.Screen name="FirstTab" component={StudentContacts} options={{ tabBarLabel: 'Kontakti' }}/>
                <Tab.Screen name="SecondTab" component={StudyData} options={{ tabBarLabel: 'Podaci o studiju' }}/>

            </Tab.Navigator>
        </>
    );
}

const style = StyleSheet.create({
    everything: {
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 20,
        paddingRight: 20
    },
});