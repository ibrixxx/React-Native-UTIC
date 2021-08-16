import React, {useCallback, useRef} from 'react'
import {StyleSheet, View} from "react-native";
import {white} from "react-native-paper/src/styles/colors";
import MyHeader from "./MyHeader";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import DocRequest from './DocsComponents/DocRequest';
import DocHistory from './DocsComponents/DocHistory';
import {Title} from "react-native-paper";
import { useIsFocused } from '@react-navigation/native';
import BottomSheet from "./BottomSheet";

const Tab = createMaterialTopTabNavigator();

export default function Docs({ navigation }) {
    const focus = useIsFocused();
    const refRBSheet = useRef();


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
}

const styles = StyleSheet.create({
    everything: {
        height: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 20,
        paddingRight: 20
    },
    container: {
        backgroundColor: white,
        width: '90%',
        padding: 15,
        borderRadius: 15,
        elevation: 8,
        marginBottom: 20
    },
    title: {
        textAlign: 'center',
        marginBottom: 10
    }
});
