import React, {useRef} from 'react'
import MyHeader from "./MyHeader";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import DocRequest from './DocsComponents/DocRequest';
import DocHistory from './DocsComponents/DocHistory';
import {useIsFocused} from '@react-navigation/native';
import BottomSheet from "./BottomSheet";

const Tab = createMaterialTopTabNavigator();

export default function Docs({ navigation, theme, changeTheme, role}) {
    const focus = useIsFocused();
    const refRBSheet = useRef();

    if (role)
        return(
            <>
                <MyHeader myTitle="Dokumenti" navigation={navigation} sheetOpen={() => {refRBSheet.current.open()}}/>

                <Tab.Navigator tabBarOptions={{
                    activeTintColor: '#2C8BD3',
                    labelStyle: { fontSize: 11, color: 'white'},
                    style: { backgroundColor: '#263238'},
                }}>
                    <Tab.Screen name="ZeroTab" component={DocRequest} options={{ tabBarLabel: 'Aktivni zahtjevi' }}/>
                    <Tab.Screen name="FirstTab" component={DocHistory} options={{ tabBarLabel: 'Ranije podneseni zahtjevi' }}/>
                </Tab.Navigator>
                <BottomSheet myRef={refRBSheet} navigateHome={() => navigation.navigate('Home')}/>
            </>
        )
    else
        return(
            <>
                <MyHeader myTitle="Dokumenti" navigation={navigation} sheetOpen={() => {refRBSheet.current.open()}}/>

                <Tab.Navigator tabBarOptions={{
                    activeTintColor: '#2C8BD3',
                    labelStyle: { fontSize: 11, color: 'white'},
                    style: { backgroundColor: '#263238'},
                }}>
                    <Tab.Screen name="FirstTab" component={DocHistory} options={{ tabBarLabel: 'Ranije podneseni zahtjevi' }}/>
                </Tab.Navigator>
                <BottomSheet myRef={refRBSheet} navigateHome={() => navigation.navigate('Home')}/>
            </>
        );
}

