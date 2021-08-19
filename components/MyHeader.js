import React from 'react';
import {StyleSheet, View} from "react-native";
import {Header} from "react-native-elements";
import style from "./styles/DarkMode";

export default function MyHeader({ myTitle, navigation, sheetOpen }){

    return(
        <View>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', size: 30, onPress: () => navigation.openDrawer()}}
                centerComponent={{ text: myTitle, style: style.headerText}}
                rightComponent={{ icon: 'settings', color: "#fff", size: 30, onPress: () => sheetOpen() }}
                backgroundColor='#263238'
            />
        </View>
    );
}
