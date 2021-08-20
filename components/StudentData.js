import React, {useRef} from 'react'
import MyHeader from "./MyHeader";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import MainStudentData from './StudentDataComponents/MainStudentData';
import StudentContacts from './StudentDataComponents/StudentContacts';
import StudyData from './StudentDataComponents/StudyData';
import BottomSheet from "./BottomSheet";


const Tab = createMaterialTopTabNavigator();


export default function StudentData({ navigation, theme, changeTheme, role, isDark}) {
    const refRBSheet = useRef();

    return (
        <>
            <MyHeader myTitle="Podaci o studentu" navigation={navigation} sheetOpen={() => {refRBSheet.current.open()}}/>
            <Tab.Navigator tabBarOptions={{
                activeTintColor: theme.secondary,
                labelStyle: { fontSize: 11, color: 'white'},
                style: { backgroundColor: theme.primary, zIndex: 1},
            }}>
                <Tab.Screen name="ZeroTab" children={() => <MainStudentData theme={theme}/>} options={{ tabBarLabel: 'Lični podaci' }}/>
                <Tab.Screen name="FirstTab" children={() => <StudentContacts theme={theme}/>} options={{ tabBarLabel: 'Kontakt'}}/>
                <Tab.Screen name="SecondTab" children={() => <StudyData theme={theme}/>} options={{ tabBarLabel: 'Studij' }}/>
            </Tab.Navigator>
            <BottomSheet myRef={refRBSheet} navigateHome={() => navigation.navigate('Home')} changeTheme={changeTheme} isDark={isDark}/>
        </>
    );
}