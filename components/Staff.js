import React from 'react'
import {View} from "react-native";
import MyHeader from "./MyHeader";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Professors from "./StaffComponents/Professors";
import Assistants from "./StaffComponents/Assistants";


const Tab = createMaterialTopTabNavigator();


export default function Staff({ navigation }) {

    return (
            <>
                <MyHeader myTitle="Nastavno osoblje" navigation={navigation}/>
                <Tab.Navigator tabBarOptions={{
                    activeTintColor: 'dodgerblue',
                    labelStyle: { fontSize: 11, color: 'white'},
                    style: { backgroundColor: '#434343'},
                }}>
                    <Tab.Screen name="ZeroTab" component={Professors} options={{ tabBarLabel: 'Profesori' }}/>
                    <Tab.Screen name="FirstTab" component={Assistants} options={{ tabBarLabel: 'Asistenti' }}/>
                </Tab.Navigator>
            </>
    );
}