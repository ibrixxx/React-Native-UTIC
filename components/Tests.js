import React from 'react'
import MyHeader from "./MyHeader";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TestRegistration from "./TestsComponents/TestRegistration";
const Tab = createMaterialTopTabNavigator();


export default function Tests({ navigation }) {
    return (
        <>
            <MyHeader myTitle="Ispiti" navigation={navigation}/>
            <Tab.Navigator tabBarOptions={{
                activeTintColor: 'dodgerblue',
                labelStyle: {fontSize: 11, color: 'black'},
                style: { backgroundColor: 'white'},
            }}>
                <Tab.Screen name="ZeroTab" component={TestRegistration} options={{ tabBarLabel: 'Prijava ispita' }}/>
                <Tab.Screen name="FirstTab" component={TestRegistration} options={{ tabBarLabel: 'Prijavljeni ispiti' }}/>
            </Tab.Navigator>
        </>
    );
}