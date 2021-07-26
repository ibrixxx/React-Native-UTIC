import React from 'react'
import MyHeader from "./MyHeader";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Grades from "./CurriculumComponents/Grades";
import CurrentSemester from "./CurriculumComponents/CurrentSemester";


const Tab = createMaterialTopTabNavigator();


export default function Curriculum({ navigation }) {

    return (
        <>
            <MyHeader myTitle="Studij" navigation={navigation}/>
            <Tab.Navigator tabBarOptions={{
                activeTintColor: 'dodgerblue',
                labelStyle: { fontSize: 11, color: 'white'},
                style: { backgroundColor: '#434343'},
            }}>
                <Tab.Screen name="ThirdTab" component={CurrentSemester} options={{ tabBarLabel: 'Trenutni semestar' }}/>
                <Tab.Screen name="ZeroTab" component={Grades} options={{ tabBarLabel: 'Ocjene' }}/>
                <Tab.Screen name="SecondTab" component={Grades} options={{ tabBarLabel: 'Izborni predmeti' }}/>
                <Tab.Screen name="FirstTab" component={Grades} options={{ tabBarLabel: 'Nastavni plan i program' }}/>
            </Tab.Navigator>
        </>
    )
}