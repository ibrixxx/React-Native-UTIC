import React from 'react'
import MyHeader from "./MyHeader";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TestRegistration from "./TestsComponents/TestRegistration";
import TestsOverview from "./TestsComponents/TestsOverview";
const Tab = createMaterialTopTabNavigator();


export default function Tests({ navigation }) {
    return (
        <>
            <MyHeader myTitle="Ispiti" navigation={navigation}/>
            <Tab.Navigator tabBarOptions={{
                activeTintColor: 'dodgerblue',
                labelStyle: { fontSize: 11, color: 'white'},
                style: { backgroundColor: '#434343'},
            }}>
                <Tab.Screen name="ZeroTab" component={TestRegistration} options={{ tabBarLabel: 'Prijava ispita' }}/>
                <Tab.Screen name="FirstTab" component={TestsOverview} options={{ tabBarLabel: 'Prijavljeni ispiti' }}/>
            </Tab.Navigator>
        </>
    );
}