import React from 'react'
import {Text, View} from "react-native";
import MyHeader from "./MyHeader";

export default function Survey({ navigation }) {
    return (
        <View>
            <MyHeader myTitle="Ankete" navigation={navigation}/>
            <View style={{ height: '85%', justifyContent: 'center', alignItems: 'center' }}>
                <Text>Survey</Text>
            </View>
        </View>
    );
}