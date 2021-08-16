import React, {useRef} from 'react'
import MyHeader from "./MyHeader";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import MainStudentData from './StudentDataComponents/MainStudentData';
import StudentContacts from './StudentDataComponents/StudentContacts';
import StudyData from './StudentDataComponents/StudyData';
import BottomSheet from "./BottomSheet";


const Tab = createMaterialTopTabNavigator();


export default function StudentData({ navigation }) {
    const refRBSheet = useRef();

    return (
        <>
            <MyHeader myTitle="Podaci o studentu" navigation={navigation} sheetOpen={() => {refRBSheet.current.open()}}/>
            <Tab.Navigator tabBarOptions={{
                activeTintColor: '#2C8BD3',
                labelStyle: { fontSize: 11, color: 'white'},
                style: { backgroundColor: '#263238', zIndex: 1},
            }}>
                <Tab.Screen name="ZeroTab" component={MainStudentData} options={{ tabBarLabel: 'Lični podaci' }}/>
                <Tab.Screen name="FirstTab" component={StudentContacts} options={{ tabBarLabel: 'Kontakt'}}/>
                <Tab.Screen name="SecondTab" component={StudyData} options={{ tabBarLabel: 'Studij' }}/>
            </Tab.Navigator>
            <BottomSheet myRef={refRBSheet} navigateHome={() => navigation.navigate('Home')}/>
        </>
    );
}