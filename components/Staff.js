import React, {useRef} from 'react'
import {View} from "react-native";
import MyHeader from "./MyHeader";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Professors from "./StaffComponents/Professors";
import Assistants from "./StaffComponents/Assistants";
import BottomSheet from "./BottomSheet";


const Tab = createMaterialTopTabNavigator();


export default function Staff({ navigation }) {
    const refRBSheet = useRef();


    return (
            <>
                <MyHeader myTitle="Nastavno osoblje" navigation={navigation} sheetOpen={() => {refRBSheet.current.open()}}/>
                <Tab.Navigator tabBarOptions={{
                    activeTintColor: '#2C8BD3',
                    labelStyle: { fontSize: 11, color: 'white'},
                    style: { backgroundColor: '#263238'},
                }}>
                    <Tab.Screen name="ZeroTab" component={Professors} options={{ tabBarLabel: 'Profesori' }}/>
                    <Tab.Screen name="FirstTab" component={Assistants} options={{ tabBarLabel: 'Asistenti' }}/>
                </Tab.Navigator>
                <BottomSheet myRef={refRBSheet} navigateHome={() => navigation.navigate('Home')}/>
            </>
    );
}