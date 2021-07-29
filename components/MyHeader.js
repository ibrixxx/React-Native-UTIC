import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Header} from "react-native-elements";


export default function MyHeader({ myTitle, navigation }){
    return(
        <View>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', size: 30, onPress: () => navigation.openDrawer()}}
                centerComponent={{ text: myTitle, style: style.headerText}}
                rightComponent={{ icon: 'home', color: '#fff', size: 30, onPress: () => navigation.navigate('Home') }}
                backgroundColor='#434343'
            />
        </View>
    );
}

const style = StyleSheet.create({
    headerText: {
        fontSize: 22,
        color: 'white',
    }
})
